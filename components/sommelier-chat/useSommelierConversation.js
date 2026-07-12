'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { detectUnderageMessage } from './underageDetection';
import {
  AGE_GATE_OPTIONS,
  APPRECIATION_MESSAGES,
  CONVERSATION_STEPS,
  COOLING_OPTIONS,
  COMPLIANCE_LOCK_MESSAGE,
  FINAL_AGE_OPTIONS,
  FLAVOR_CATEGORIES,
  NICOTINE_DISCLAIMER,
  SUB_OPTIONS,
  TYPED_MESSAGE_FALLBACK,
  getAddToCartSuccessMessage,
  getFinalAgeConfirmMessage,
  getFlavorCategoryMessage,
  getFollowUpMessage,
  getProductRecommendation,
  getRecommendationPrompt,
} from './conversation';
import {
  INITIAL_CONVERSATION_STATE,
  clearPersistedConversation,
  loadPersistedConversation,
  persistConversation,
} from './conversationPersistence';

const TYPING_DELAY_MS = 900;

function createMessage(role, text, extra = {}) {
  const safeText = typeof text === 'string' ? text : String(text ?? '');
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text: safeText,
    ...extra,
  };
}

function toBotMessageEntries(botMessages) {
  const entries = Array.isArray(botMessages) ? botMessages : [botMessages];
  return entries.map((entry) =>
    typeof entry === 'string' ? entry : String(entry ?? ''),
  );
}

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function matchesAgeYes(text) {
  const t = normalizeText(text);
  return (
    t === 'yes' ||
    t === 'y' ||
    t.includes('yes') ||
    t === '19' ||
    t.includes("i'm 19") ||
    t.includes('im 19') ||
    t.includes('i am 19') ||
    t.includes('over 19') ||
    t.includes('19+') ||
    t.includes('of age') ||
    t.includes('of legal age')
  );
}

function matchesAgeNo(text) {
  const t = normalizeText(text);
  return t === 'no' || t === 'n' || t.includes('not 19') || t.includes('under 19');
}

function isSessionInactive({ ended, sessionLocked, isTyping }) {
  return ended || sessionLocked || isTyping;
}

function matchOptionFromText(text, options) {
  const t = normalizeText(text);
  return options.find((option) => {
    const label = normalizeText(option.label.replace(/[^\w\s+]/g, '').trim());
    const value = normalizeText(option.value);
    return (
      t === value ||
      t.includes(value) ||
      t.includes(label) ||
      label.split(/\s+/).some((word) => word.length > 3 && t.includes(word))
    );
  });
}

const INITIAL_STATE = INITIAL_CONVERSATION_STATE;

export default function useSommelierConversation({ open }) {
  const [state, setState] = useState(
    () => loadPersistedConversation() ?? INITIAL_STATE,
  );
  const typingTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, []);

  const lockSession = useCallback(() => {
    clearTimers();
    setState((current) => ({
      ...current,
      step: CONVERSATION_STEPS.ENDED,
      ended: true,
      sessionLocked: true,
      isTyping: false,
      messages: [
        ...current.messages,
        createMessage('bot', COMPLIANCE_LOCK_MESSAGE),
      ],
    }));
  }, [clearTimers]);

  useEffect(() => {
    if (open) {
      setState((current) => ({ ...current, isExiting: false }));
      return;
    }

    setState((current) => ({ ...current, isExiting: true }));

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      setState((current) => {
        if (current.sessionLocked) {
          clearPersistedConversation();
          return INITIAL_STATE;
        }
        return { ...current, isExiting: false };
      });
    }, 280);

    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [open]);

  useEffect(() => {
    persistConversation(state);
  }, [state]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const withBotMessages = useCallback((botMessages, nextPartial = {}) => {
    const safeMessages = toBotMessageEntries(botMessages);

    setState((current) => ({
      ...current,
      isTyping: true,
      ...nextPartial,
    }));

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setState((current) => ({
        ...current,
        ...nextPartial,
        isTyping: false,
        messages: [
          ...current.messages,
          ...safeMessages.map((text) => createMessage('bot', text)),
        ],
      }));
    }, TYPING_DELAY_MS);
  }, []);

  const pushUserMessage = useCallback((text) => {
    setState((current) => ({
      ...current,
      messages: [...current.messages, createMessage('user', text)],
    }));
  }, []);

  const isInteractionBlocked = isSessionInactive(state);

  const proceedAgeYes = useCallback(
    (userLabel = "Yes, I'm 19+") => {
      if (isInteractionBlocked) return;
      pushUserMessage(userLabel);
      withBotMessages([getFlavorCategoryMessage()], {
        step: CONVERSATION_STEPS.FLAVOR_CATEGORY,
      });
    },
    [isInteractionBlocked, pushUserMessage, withBotMessages],
  );

  const proceedAgeNo = useCallback(
    (userLabel = 'No') => {
      if (isInteractionBlocked) return;
      pushUserMessage(userLabel);
      lockSession();
    },
    [isInteractionBlocked, lockSession, pushUserMessage],
  );

  const proceedFlavorSelect = useCallback(
    (option, userLabel) => {
      if (isInteractionBlocked) return;

      const category = option.value;
      pushUserMessage(userLabel ?? option.label);
      withBotMessages(
        [APPRECIATION_MESSAGES[category], 'What specific profile sounds best to you?'],
        {
          step: CONVERSATION_STEPS.SUB_OPTIONS,
          selections: { ...state.selections, category, subOption: null, cooling: null },
        },
      );
    },
    [isInteractionBlocked, pushUserMessage, state.selections, withBotMessages],
  );

  const proceedSubOptionSelect = useCallback(
    (option, userLabel) => {
      if (isInteractionBlocked) return;

      pushUserMessage(userLabel ?? option.label);
      withBotMessages([getFollowUpMessage()], {
        step: CONVERSATION_STEPS.FOLLOW_UP,
        selections: { ...state.selections, subOption: option.value },
      });
    },
    [isInteractionBlocked, pushUserMessage, state.selections, withBotMessages],
  );

  const proceedCoolingSelect = useCallback(
    (option, userLabel) => {
      if (isInteractionBlocked) return;

      const selections = { ...state.selections, cooling: option.value };
      const product = getProductRecommendation(selections);

      pushUserMessage(userLabel ?? option.label);
      setState((current) => ({
        ...current,
        isTyping: true,
        step: CONVERSATION_STEPS.RECOMMENDATION,
        selections,
        product,
      }));

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        setState((current) => ({
          ...current,
          isTyping: false,
          step: CONVERSATION_STEPS.FINAL_AGE_CONFIRM,
          messages: [
            ...current.messages,
            createMessage('bot', getRecommendationPrompt()),
            createMessage('bot', getFinalAgeConfirmMessage()),
          ],
        }));
      }, TYPING_DELAY_MS);
    },
    [isInteractionBlocked, pushUserMessage, state.selections],
  );

  const proceedFinalAgeYes = useCallback(
    (userLabel = "Yes, I'm 19+") => {
      if (isInteractionBlocked) return;
      pushUserMessage(userLabel);
      setState((current) => ({
        ...current,
        step: CONVERSATION_STEPS.ADD_TO_CART,
      }));
    },
    [isInteractionBlocked, pushUserMessage],
  );

  const proceedFinalAgeNo = useCallback(
    (userLabel = 'No') => {
      if (isInteractionBlocked) return;
      pushUserMessage(userLabel);
      lockSession();
    },
    [isInteractionBlocked, lockSession, pushUserMessage],
  );

  const proceedAddToCart = useCallback(
    (userLabel = 'Add to Cart') => {
      if (isInteractionBlocked || state.cartAdded) return;

      const successText = getAddToCartSuccessMessage(state.product);

      pushUserMessage(userLabel);
      withBotMessages([successText, NICOTINE_DISCLAIMER], { cartAdded: true });
    },
    [isInteractionBlocked, pushUserMessage, state.cartAdded, state.product, withBotMessages],
  );

  const handleTypedMessage = useCallback(
    (rawText) => {
      const text = rawText.trim();
      if (!text || isSessionInactive(state)) return false;

      if (detectUnderageMessage(text)) {
        pushUserMessage(text);
        lockSession();
        return true;
      }

      if (state.step === CONVERSATION_STEPS.WELCOME) {
        if (matchesAgeYes(text)) {
          proceedAgeYes(text);
          return true;
        }
        if (matchesAgeNo(text)) {
          proceedAgeNo(text);
          return true;
        }
      }

      if (state.step === CONVERSATION_STEPS.FLAVOR_CATEGORY) {
        const match = matchOptionFromText(text, FLAVOR_CATEGORIES);
        if (match) {
          proceedFlavorSelect(match, text);
          return true;
        }
      }

      if (state.step === CONVERSATION_STEPS.SUB_OPTIONS) {
        const options = SUB_OPTIONS[state.selections.category] ?? [];
        const match = matchOptionFromText(text, options);
        if (match) {
          proceedSubOptionSelect(match, text);
          return true;
        }
      }

      if (state.step === CONVERSATION_STEPS.FOLLOW_UP) {
        const match = matchOptionFromText(text, COOLING_OPTIONS);
        if (match) {
          proceedCoolingSelect(match, text);
          return true;
        }
      }

      if (state.step === CONVERSATION_STEPS.FINAL_AGE_CONFIRM) {
        if (matchesAgeYes(text)) {
          proceedFinalAgeYes(text);
          return true;
        }
        if (matchesAgeNo(text)) {
          proceedFinalAgeNo(text);
          return true;
        }
      }

      if (state.step === CONVERSATION_STEPS.ADD_TO_CART) {
        if (normalizeText(text).includes('add') || normalizeText(text).includes('cart')) {
          proceedAddToCart(text);
          return true;
        }
      }

      pushUserMessage(text);
      withBotMessages([TYPED_MESSAGE_FALLBACK]);
      return true;
    },
    [
      lockSession,
      proceedAddToCart,
      proceedAgeNo,
      proceedAgeYes,
      proceedCoolingSelect,
      proceedFinalAgeNo,
      proceedFinalAgeYes,
      proceedFlavorSelect,
      proceedSubOptionSelect,
      pushUserMessage,
      state,
      withBotMessages,
    ],
  );

  const getActiveOptions = useCallback(() => {
    if (isSessionInactive(state)) return [];

    switch (state.step) {
      case CONVERSATION_STEPS.WELCOME:
        return AGE_GATE_OPTIONS;
      case CONVERSATION_STEPS.FLAVOR_CATEGORY:
        return FLAVOR_CATEGORIES;
      case CONVERSATION_STEPS.SUB_OPTIONS:
        return SUB_OPTIONS[state.selections.category] ?? [];
      case CONVERSATION_STEPS.FOLLOW_UP:
        return COOLING_OPTIONS;
      case CONVERSATION_STEPS.FINAL_AGE_CONFIRM:
        return FINAL_AGE_OPTIONS;
      default:
        return [];
    }
  }, [state]);

  const handleOptionSelect = useCallback(
    (option) => {
      if (isSessionInactive(state)) return;
      switch (state.step) {
        case CONVERSATION_STEPS.WELCOME:
          if (option.value === 'yes') proceedAgeYes();
          else proceedAgeNo();
          break;
        case CONVERSATION_STEPS.FLAVOR_CATEGORY:
          proceedFlavorSelect(option);
          break;
        case CONVERSATION_STEPS.SUB_OPTIONS:
          proceedSubOptionSelect(option);
          break;
        case CONVERSATION_STEPS.FOLLOW_UP:
          proceedCoolingSelect(option);
          break;
        case CONVERSATION_STEPS.FINAL_AGE_CONFIRM:
          if (option.value === 'yes') proceedFinalAgeYes();
          else proceedFinalAgeNo();
          break;
        default:
          break;
      }
    },
    [
      proceedAgeNo,
      proceedAgeYes,
      proceedCoolingSelect,
      proceedFinalAgeNo,
      proceedFinalAgeYes,
      proceedFlavorSelect,
      proceedSubOptionSelect,
      state,
    ],
  );

  const showProductCard =
    state.product &&
    !state.sessionLocked &&
    (state.step === CONVERSATION_STEPS.RECOMMENDATION ||
      state.step === CONVERSATION_STEPS.FINAL_AGE_CONFIRM ||
      state.step === CONVERSATION_STEPS.ADD_TO_CART ||
      state.step === CONVERSATION_STEPS.ENDED);

  const showAddToCart =
    state.step === CONVERSATION_STEPS.ADD_TO_CART &&
    !state.ended &&
    !state.sessionLocked &&
    !state.cartAdded;

  const optionsLayout =
    state.step === CONVERSATION_STEPS.WELCOME ||
    state.step === CONVERSATION_STEPS.FOLLOW_UP ||
    state.step === CONVERSATION_STEPS.FINAL_AGE_CONFIRM
      ? 'row'
      : state.step === CONVERSATION_STEPS.FLAVOR_CATEGORY
        ? 'stack'
        : 'grid';

  return {
    step: state.step,
    messages: state.messages,
    isTyping: state.isTyping,
    ended: state.ended,
    sessionLocked: state.sessionLocked,
    isExiting: state.isExiting,
    product: state.product,
    showProductCard,
    showAddToCart,
    activeOptions: getActiveOptions(),
    optionsLayout,
    handleOptionSelect,
    handleTypedMessage,
    handleAddToCart: proceedAddToCart,
  };
}

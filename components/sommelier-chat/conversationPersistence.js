import { CONVERSATION_STEPS, WELCOME_MESSAGE } from './conversation';

const STORAGE_KEY = 'vapepass-sommelier-chat';

export const INITIAL_CONVERSATION_STATE = {
  step: CONVERSATION_STEPS.WELCOME,
  messages: [WELCOME_MESSAGE],
  selections: { category: null, subOption: null, cooling: null },
  product: null,
  isTyping: false,
  ended: false,
  sessionLocked: false,
  cartAdded: false,
  isExiting: false,
};

function isBrowser() {
  return typeof window !== 'undefined';
}

export function loadPersistedConversation() {
  if (!isBrowser()) return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.sessionLocked) return null;

    return {
      ...INITIAL_CONVERSATION_STATE,
      ...parsed,
      isTyping: false,
      isExiting: false,
      messages: Array.isArray(parsed.messages) ? parsed.messages : INITIAL_CONVERSATION_STATE.messages,
      selections: {
        ...INITIAL_CONVERSATION_STATE.selections,
        ...(parsed.selections ?? {}),
      },
    };
  } catch {
    return null;
  }
}

export function persistConversation(state) {
  if (!isBrowser() || state.sessionLocked) return;

  try {
    const payload = {
      step: state.step,
      messages: state.messages,
      selections: state.selections,
      product: state.product,
      ended: state.ended,
      sessionLocked: state.sessionLocked,
      cartAdded: state.cartAdded,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearPersistedConversation() {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

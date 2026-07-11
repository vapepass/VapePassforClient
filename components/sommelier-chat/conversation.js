export const NICOTINE_DISCLAIMER =
  'Please note that vaping products contain nicotine, which is addictive.';

export const COMPLIANCE_LOCK_MESSAGE =
  'Access Denied. Minors are legally prohibited from purchasing these products. This conversation has been flagged and ended.';

export const SESSION_LOCKED_LABEL = '🚫 This session has been locked.';

export const UNDERAGE_END_MESSAGE =
  'VapePass Assistant is only available to persons 19 years of age or older. This conversation has ended.';

export const CONVERSATION_STEPS = {
  WELCOME: 'welcome',
  FLAVOR_CATEGORY: 'flavor_category',
  SUB_OPTIONS: 'sub_options',
  FOLLOW_UP: 'follow_up',
  RECOMMENDATION: 'recommendation',
  FINAL_AGE_CONFIRM: 'final_age_confirm',
  ADD_TO_CART: 'add_to_cart',
  ENDED: 'ended',
};

export const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "👋 Hey! I'm the VapePass Flavor Sommelier. I can help you find your perfect vape flavor profile based on your taste preferences.\n\n**Are you 19 or older?** *(This service is for adults only)*",
};

export const AGE_GATE_OPTIONS = [
  { id: 'age-yes', label: "Yes, I'm 19+", value: 'yes', variant: 'primary' },
  { id: 'age-no', label: 'No', value: 'no', variant: 'secondary' },
];

export const FLAVOR_CATEGORIES = [
  { id: 'fruity', label: '🍓 Fruity', value: 'fruity' },
  { id: 'minty', label: '🌿 Minty', value: 'minty' },
  { id: 'menthol', label: '🧊 Menthol', value: 'menthol' },
  { id: 'dessert', label: '🍰 Dessert / Sweet', value: 'dessert' },
  { id: 'tobacco', label: '🚬 Tobacco', value: 'tobacco' },
];

export const APPRECIATION_MESSAGES = {
  fruity: 'Nice choice! 🍓\n\nFruity profiles are always a crowd favorite.',
  minty: 'Great pick! 🌿\n\nMinty flavors deliver a cool, refreshing sensation.',
  menthol: 'Great choice! 🧊\n\nMenthol lovers usually enjoy refreshing cooling sensations.',
  dessert: 'Sweet choice! 🍰\n\nDessert profiles are perfect for indulgent, creamy vibes.',
  tobacco: 'Classic choice! 🚬\n\nTobacco profiles offer a rich, familiar experience.',
};

export const SUB_OPTIONS = {
  fruity: [
    { id: 'tropical', label: '🍍 Tropical', value: 'tropical' },
    { id: 'berries', label: '🫐 Berries', value: 'berries' },
    { id: 'citrus', label: '🍊 Citrus', value: 'citrus' },
    { id: 'apple', label: '🍎 Apple', value: 'apple' },
    { id: 'grape', label: '🍇 Grape', value: 'grape' },
  ],
  minty: [
    { id: 'peppermint', label: '🌿 Peppermint', value: 'peppermint' },
    { id: 'spearmint', label: '🍃 Spearmint', value: 'spearmint' },
    { id: 'mint-menthol', label: '🧊 Mint + Menthol', value: 'mint-menthol' },
  ],
  menthol: [
    { id: 'crisp-menthol', label: '❄️ Crisp Menthol', value: 'crisp-menthol' },
    { id: 'menthol-fruit', label: '🍓 Menthol + Fruit', value: 'menthol-fruit' },
    { id: 'menthol-candy', label: '🍬 Menthol + Candy', value: 'menthol-candy' },
  ],
  dessert: [
    { id: 'creamy', label: '🍦 Creamy', value: 'creamy' },
    { id: 'bakery', label: '🧁 Bakery', value: 'bakery' },
    { id: 'candy', label: '🍬 Candy', value: 'candy' },
  ],
  tobacco: [
    { id: 'straight', label: '🚬 Straight Tobacco', value: 'straight' },
    { id: 'sweet-tobacco', label: '🍯 Sweet Tobacco', value: 'sweet-tobacco' },
    { id: 'nutty', label: '🥜 Nutty / Roasted', value: 'nutty' },
  ],
};

export const COOLING_OPTIONS = [
  { id: 'light-ice', label: '❄️ Light Ice', value: 'light-ice' },
  { id: 'heavy-ice', label: '🧊 Heavy Ice', value: 'heavy-ice' },
];

export const FINAL_AGE_OPTIONS = [
  { id: 'final-age-yes', label: "Yes, I'm 19+", value: 'yes', variant: 'primary' },
  { id: 'final-age-no', label: 'No', value: 'no', variant: 'secondary' },
];

export function isAgeGateStep(step) {
  return step === CONVERSATION_STEPS.WELCOME || step === CONVERSATION_STEPS.FINAL_AGE_CONFIRM;
}

const DEFAULT_PRODUCT = {
  name: 'Signature Blend',
  description:
    'A balanced flavor profile crafted to match your preferences.\n\nSmooth, satisfying, and easy to enjoy all day.',
  accent: 'from-brand-500 to-brand-700',
};

const PRODUCT_MAP = {
  menthol: {
    'crisp-menthol': {
      'light-ice': {
        name: 'Arctic Mint',
        description:
          'A crisp peppermint-inspired profile with a refreshing cooling finish.\n\nPerfect if you enjoy a clean menthol experience without added sweetness.',
        accent: 'from-cyan-400 to-blue-600',
      },
      'heavy-ice': {
        name: 'Polar Freeze',
        description:
          'An intense icy menthol blast with a sharp, clean finish.\n\nBuilt for those who want maximum cooling with zero sweetness.',
        accent: 'from-sky-400 to-indigo-600',
      },
    },
    'menthol-fruit': {
      'light-ice': {
        name: 'Berry Breeze',
        description:
          'Cool menthol layered with bright mixed berries for a refreshing fruit-forward finish.\n\nIdeal if you like cooling with a touch of sweetness.',
        accent: 'from-rose-400 to-purple-600',
      },
      'heavy-ice': {
        name: 'Frozen Berry Mint',
        description:
          'Bold berry notes wrapped in heavy ice and crisp menthol.\n\nA vibrant, frosty profile for fruit-and-ice lovers.',
        accent: 'from-fuchsia-400 to-violet-600',
      },
    },
    'menthol-candy': {
      'light-ice': {
        name: 'Candy Chill',
        description:
          'Sweet candy notes balanced with a light menthol cool-down.\n\nPlayful, smooth, and gently refreshing.',
        accent: 'from-pink-400 to-rose-600',
      },
      'heavy-ice': {
        name: 'Ice Pop Rush',
        description:
          'Bold candy sweetness meets heavy ice for a frosty, nostalgic treat.\n\nPerfect for candy lovers who want serious cooling.',
        accent: 'from-orange-400 to-pink-600',
      },
    },
  },
  fruity: {
    tropical: {
      'light-ice': {
        name: 'Island Mango',
        description:
          'Juicy mango and passion fruit with a soft tropical finish.\n\nBright, sunny, and lightly chilled.',
        accent: 'from-amber-400 to-orange-600',
      },
      'heavy-ice': {
        name: 'Frozen Paradise',
        description:
          'Tropical fruit medley with heavy ice for a frosty island escape.\n\nBold, exotic, and intensely refreshing.',
        accent: 'from-yellow-400 to-red-500',
      },
    },
    berries: {
      'light-ice': {
        name: 'Wild Berry Mix',
        description:
          'Strawberry, blueberry, and raspberry blended into a smooth berry profile.\n\nSweet, vibrant, and crowd-pleasing.',
        accent: 'from-red-400 to-purple-600',
      },
      'heavy-ice': {
        name: 'Frosted Berry Blast',
        description:
          'Mixed berries with a heavy icy finish for a bold, frosty berry experience.\n\nGreat for berry fans who love cooling.',
        accent: 'from-rose-500 to-indigo-600',
      },
    },
    citrus: {
      'light-ice': {
        name: 'Citrus Spark',
        description:
          'Zesty lemon and lime with a clean, uplifting finish.\n\nCrisp, tangy, and energizing.',
        accent: 'from-lime-400 to-yellow-500',
      },
      'heavy-ice': {
        name: 'Frozen Citrus Punch',
        description:
          'Bold citrus notes with heavy ice for a sharp, frosty tang.\n\nPerfect when you want punchy flavor and serious chill.',
        accent: 'from-green-400 to-amber-500',
      },
    },
    apple: {
      'light-ice': {
        name: 'Crisp Apple',
        description:
          'Fresh green apple with a clean, natural sweetness.\n\nSimple, refreshing, and easy to enjoy.',
        accent: 'from-green-400 to-emerald-600',
      },
      'heavy-ice': {
        name: 'Iced Apple Orchard',
        description:
          'Juicy apple flavor with heavy ice for a frosty orchard-inspired profile.\n\nCrisp, cool, and satisfying.',
        accent: 'from-lime-500 to-green-700',
      },
    },
    grape: {
      'light-ice': {
        name: 'Velvet Grape',
        description:
          'Rich grape notes with a smooth, juicy finish.\n\nSweet, mellow, and effortlessly drinkable.',
        accent: 'from-purple-400 to-violet-700',
      },
      'heavy-ice': {
        name: 'Frozen Grape Ice',
        description:
          'Bold grape flavor wrapped in heavy ice for a deep, frosty profile.\n\nIdeal for grape lovers who want extra cooling.',
        accent: 'from-violet-500 to-purple-800',
      },
    },
  },
  minty: {
    peppermint: {
      'light-ice': {
        name: 'Cool Peppermint',
        description:
          'Classic peppermint with a gentle cooling finish.\n\nClean, fresh, and subtly sweet.',
        accent: 'from-teal-400 to-cyan-600',
      },
      'heavy-ice': {
        name: 'Peppermint Blizzard',
        description:
          'Bold peppermint with heavy ice for an intense fresh-mint experience.\n\nSharp, icy, and invigorating.',
        accent: 'from-cyan-500 to-blue-700',
      },
    },
    spearmint: {
      'light-ice': {
        name: 'Spearmint Fresh',
        description:
          'Soft spearmint with a smooth, garden-fresh profile.\n\nLight, natural, and easy on the palate.',
        accent: 'from-emerald-400 to-teal-600',
      },
      'heavy-ice': {
        name: 'Iced Spearmint',
        description:
          'Spearmint layered with heavy ice for a frosty, herbal cool-down.\n\nRefreshing with a crisp edge.',
        accent: 'from-green-500 to-teal-700',
      },
    },
    'mint-menthol': {
      'light-ice': {
        name: 'Mint Fusion',
        description:
          'Mint and menthol combined for a balanced cooling experience.\n\nSmooth, layered, and consistently refreshing.',
        accent: 'from-sky-400 to-teal-600',
      },
      'heavy-ice': {
        name: 'Arctic Mint Fusion',
        description:
          'Mint and menthol with heavy ice for maximum cooling depth.\n\nBuilt for fans of intense freshness.',
        accent: 'from-blue-400 to-indigo-700',
      },
    },
  },
  dessert: {
    creamy: {
      'light-ice': {
        name: 'Vanilla Custard',
        description:
          'Rich vanilla custard with a creamy, dessert-shop finish.\n\nIndulgent, smooth, and comforting.',
        accent: 'from-amber-300 to-orange-500',
      },
      'heavy-ice': {
        name: 'Iced Vanilla Cream',
        description:
          'Creamy vanilla with a frosty finish for a cool dessert experience.\n\nSweet, lush, and lightly chilled.',
        accent: 'from-yellow-300 to-amber-600',
      },
    },
    bakery: {
      'light-ice': {
        name: 'Glazed Donut',
        description:
          'Warm bakery notes with a sweet glazed finish.\n\nComforting, nostalgic, and dessert-forward.',
        accent: 'from-orange-300 to-amber-600',
      },
      'heavy-ice': {
        name: 'Frosted Pastry',
        description:
          'Bakery sweetness with heavy ice for a cool pastry-inspired profile.\n\nRich, sweet, and frosty.',
        accent: 'from-rose-300 to-orange-500',
      },
    },
    candy: {
      'light-ice': {
        name: 'Cotton Candy Cloud',
        description:
          'Fluffy cotton candy sweetness with a playful finish.\n\nLight, fun, and unmistakably sweet.',
        accent: 'from-pink-300 to-fuchsia-500',
      },
      'heavy-ice': {
        name: 'Frozen Candy Shop',
        description:
          'Bold candy sweetness with heavy ice for a frosty treat-like profile.\n\nSweet, vibrant, and cooling.',
        accent: 'from-pink-400 to-purple-600',
      },
    },
  },
  tobacco: {
    straight: {
      'light-ice': {
        name: 'Classic Virginia',
        description:
          'Straight tobacco with a rich, familiar character.\n\nSmooth, grounded, and timeless.',
        accent: 'from-amber-600 to-yellow-800',
      },
      'heavy-ice': {
        name: 'Iced Classic Tobacco',
        description:
          'Traditional tobacco with a cool icy finish.\n\nClassic depth with a refreshing edge.',
        accent: 'from-yellow-600 to-amber-800',
      },
    },
    'sweet-tobacco': {
      'light-ice': {
        name: 'Honey Tobacco',
        description:
          'Sweet tobacco with warm honey undertones.\n\nRich, mellow, and gently sweet.',
        accent: 'from-amber-500 to-orange-700',
      },
      'heavy-ice': {
        name: 'Frosted Sweet Leaf',
        description:
          'Sweet tobacco balanced with heavy ice for a cool, refined profile.\n\nWarm character with frosty finish.',
        accent: 'from-orange-500 to-amber-800',
      },
    },
    nutty: {
      'light-ice': {
        name: 'Roasted Hazelnut Tobacco',
        description:
          'Nutty, roasted notes layered over a smooth tobacco base.\n\nComplex, warm, and satisfying.',
        accent: 'from-amber-700 to-stone-800',
      },
      'heavy-ice': {
        name: 'Iced Nutty Blend',
        description:
          'Roasted nut and tobacco notes with heavy ice.\n\nDeep, rich, and distinctly cooling.',
        accent: 'from-stone-600 to-amber-900',
      },
    },
  },
};

export function getProductRecommendation(selections) {
  const { category, subOption, cooling } = selections;
  const product =
    PRODUCT_MAP[category]?.[subOption]?.[cooling] ?? DEFAULT_PRODUCT;

  return {
    ...product,
    id: `${category}-${subOption}-${cooling}`,
  };
}

export function getFlavorCategoryMessage() {
  return "Great! Let's find your perfect flavor. 🍇🍦🧊\n\nWhat kinds of flavors do you generally enjoy?";
}

export function getFollowUpMessage() {
  return 'Which cooling level do you prefer?';
}

export function getRecommendationPrompt() {
  return 'Would you like to add this product to your cart?';
}

export function getFinalAgeConfirmMessage() {
  return 'Please confirm once again that you are 19 years of age or older.';
}

export function getAddToCartSuccessMessage(product) {
  const productName = product?.name ?? 'Your selected product';
  return `✅ ${productName} has been added to your cart!\n\nYou're all set. Feel free to ask for another recommendation anytime.`;
}

export const TYPED_MESSAGE_FALLBACK =
  'I can guide you best with the buttons above — tap an option to continue your flavor journey.';

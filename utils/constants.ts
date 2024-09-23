export const COMMON_PROPS_BUTTON = {
  classExtra: {
    type: String,
    default: 'btn-primary'
  },
  classCustom: {
    type: String,
    default: ''
  },
  isFullWidth: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
}
export const LANG_KEY = 'i18n_redirected'
export const WALLET = {
  METAMASK: 'METAMASK',
  WALLET_CONNECT: 'WALLET_CONNECT'
}
export const KEY_LOGGED_IN = {
  loggedIn: '1',
  notLoggedIn: '0'
}

export const TIME_SHOW_NOTIFICATION = 3000
export const STEP_SEND = {
  FILL: 0,
  CONFIRM: 1
}
export const TIMEOUT_SEND_OTP = 60
export const FILE_MAX_SIZE = 1024 * 1024 * 2 // 2mb

export const TYPE_BUY_SELL_HISTORY = {
  BUY: 1,
  SELL: 2
}
export const TYPE_ORDER_HISTORY = {
  BUY: 2,
  SELL: 1
}
export const TYPE_TRANSACTION = {
  BUY: 'buy',
  SELL: 'sell'
}
export const STATUS_ORDER = {
  ACTIVE: 1,
  DONE: 2,
  CANCEL: 3
}
export const TYPE_TRANSACTION_HISTORY = {
  ALL: -1,
  DEPOSIT: 1,
  WITHDRAW: 2,
  SEND: 3,
  RECEIVED: 4,
  SELL: 5,
  BUY: 6
}
export const TEXT_TYPE_TRANSACTION_HISTORY = {
  [TYPE_TRANSACTION_HISTORY.ALL]: 'common.all',
  [TYPE_TRANSACTION_HISTORY.DEPOSIT]: 'history.deposit',
  [TYPE_TRANSACTION_HISTORY.WITHDRAW]: 'history.withdraw',
  [TYPE_TRANSACTION_HISTORY.SEND]: 'history.send',
  [TYPE_TRANSACTION_HISTORY.RECEIVED]: 'history.received',
  [TYPE_TRANSACTION_HISTORY.BUY]: 'history.invest',
  [TYPE_TRANSACTION_HISTORY.SELL]: 'history.invest'
}
export const PREFIX_TYPE_TRANSACTION_HISTORY = {
  [TYPE_TRANSACTION_HISTORY.DEPOSIT]: '+',
  [TYPE_TRANSACTION_HISTORY.WITHDRAW]: '-',
  [TYPE_TRANSACTION_HISTORY.SEND]: '-',
  [TYPE_TRANSACTION_HISTORY.RECEIVED]: '+',
  [TYPE_TRANSACTION_HISTORY.BUY]: '+',
  [TYPE_TRANSACTION_HISTORY.SELL]: '-'
}
export const TARGET_TYPE_TRANSACTION_HISTORY = {
  [TYPE_TRANSACTION_HISTORY.DEPOSIT]: 'from',
  [TYPE_TRANSACTION_HISTORY.WITHDRAW]: 'to',
  [TYPE_TRANSACTION_HISTORY.SEND]: 'to',
  [TYPE_TRANSACTION_HISTORY.RECEIVED]: 'from',
  [TYPE_TRANSACTION_HISTORY.BUY]: '',
  [TYPE_TRANSACTION_HISTORY.SELL]: 'from'
}
export const STATUS_TRANSACTION_HISTORY = {
  ALL: '-1',
  NEW: '0',
  PENDING: '1',
  DONE: '2',
  CANCEL: '3'
}
export const TEXT_STATUS_TRANSACTION_HISTORY = {
  [STATUS_TRANSACTION_HISTORY.ALL]: 'common.all',
  [STATUS_TRANSACTION_HISTORY.NEW]: 'status_history.new',
  [STATUS_TRANSACTION_HISTORY.PENDING]: 'status_history.pending',
  [STATUS_TRANSACTION_HISTORY.DONE]: 'status_history.success',
  [STATUS_TRANSACTION_HISTORY.CANCEL]: 'status_history.failed'
}
export const PAGE_USE_TOKEN = ['index', 'overview']
export const PAGE_USE_PAIRS = ['index']
export const TYPE_FEE_TOKEN = {
  PERCENT: 1,
  VALUE: 2
}

export const PI_TOKEN = {
  id: 5,
  image: '',
  imageStatic: 'pi.svg',
  symbol: 'PI',
  isTemp: true
}

export const USDT_TOKEN = {
  id: 1,
  symbol: 'USDT'
}

export const AMOUNT_DIGIT = 4
export const AMOUNT_DIGIT_6 = 6
export const USDT_ID = 1
export const GEM_ID = 3
export const LION_ID = 4
export const ATX_ID = 2
export const LANGUAGES = [
  {
    id: 1,
    name: 'english',
    lang: 'en',
    icon: 'lang/eng.svg'
  }
  // {
  //   id: 3,
  //   name: 'arab',
  //   lang: 'ar',
  //   icon: 'lang/arab.svg',
  // },
  // {
  //   id: 4,
  //   name: 'chinese',
  //   lang: 'ch',
  //   icon: 'lang/china.svg',
  // },
  // {
  //   id: 5,
  //   name: 'french',
  //   lang: 'fr',
  //   icon: 'lang/france.svg',
  // },
  // {
  //   id: 6,
  //   name: 'germany',
  //   lang: 'ge',
  //   icon: 'lang/germany.svg',
  // },
  // {
  //   id: 7,
  //   name: 'hildi',
  //   lang: 'hi',
  //   icon: 'lang/hildi.svg',
  // },
  // {
  //   id: 8,
  //   name: 'japanese',
  //   lang: 'ja',
  //   icon: 'lang/japan.svg',
  // },
  // {
  //   id: 9,
  //   name: 'korean',
  //   lang: 'ko',
  //   icon: 'lang/korean.svg',
  // },
  // {
  //   id: 10,
  //   name: 'russia',
  //   lang: 'ru',
  //   icon: 'lang/russia.svg',
  // },
  // {
  //   id: 2,
  //   name: 'vietnamese',
  //   lang: 'vi',
  //   icon: 'lang/viet.svg',
  // },
]
export const ECOSYSTEMS = [
  {
    title: 'p2p_trading',
    url: 'https://p2p.athene.network'
  },
  {
    title: 'athena_app',
    url: 'https://athene.network/download'
  },
  {
    title: 'gaming',
    url: 'https://game.athene.network/register?affiliate_id=Athnetwork'
  },
  {
    title: 'launchpad',
    url: 'https://launch.athene.network/'
  },
  {
    title: 'prediction',
    url: 'https://predict.athene.network/'
  },
  {
    title: 'sportsbook',
    url: 'https://sportsbet.athene.network'
  },
  {
    title: 'dex',
    url: 'https://appleswap.ai/'
  }
]
export const MAX_FILE_UPLOAD = 3
export const MIN_VALUE_BUY_SELL = 5
export const SOCIALS = [
  {
    src: 'socials/face.svg',
    href: 'https://www.facebook.com/ATH.Network.Official'
  },
  {
    src: 'socials/x.svg',
    href: 'https://twitter.com/Athene_Network'
  },
  {
    src: 'socials/telegram.svg',
    href: 'https://t.me/AtheneNetwork_Ann'
  },
  {
    src: 'socials/youtube.svg',
    href: 'https://www.youtube.com/channel/UCr0vacksFPGACPcTqJ0r4ig'
  }
]

export const KEY_SHOW_NOTI_CONNECT_ATH = 'IS_SHOW_NOTI_CONNECT_ATH'
export const KEY_HIDE_NOTI_BANNER = 'KEY_HIDE_NOTI_BANNER'

export const BANNER = 'BANNER'
export const INSTRUCTION = 'INSTRUCTION'
export const SLICE_PRICE_TOKEN = {
  3: 6
}
export const TYPE_SEND_OTP = {
  SEND_TOKEN: 'SEND_TOKEN',
  ADD_LP: 'ADD_LP'
}
export const STATUS_ROUND = {
  TIME_END: 1,
  TIME_START: 2,
  TIME_COMING_SOON: 3
}

export const STEP_WITHDRAW = {
  FILL: 0,
  CONFIRM: 1
}

export const HOME_TABS = {
  SELL: 1,
  BUY: 2
}
export const TYPE_LIMIT_ORDER = {
  SELL: 1,
  BUY: 2
}
export const TYPE_TRADE = {
  MARKET: {
    id: 1,
    value: 'market',
    label: 'home.market',
    des: 'home.market_des'
  },
  LIMIT: {
    id: 2,
    value: 'limit',
    label: 'home.limit',
    des: 'home.limit_des'
  }
}

export const TYPE_PRICE_FLUCTUATION = {
  INCREASE: 1,
  DECREASE: -1,
  BALANCE: 0
}
export const NEW_CANDLE_EVENT = 'NEW_CANDLE_EVENT'
export const CHANGE_PAIR_EVENT = 'CHANGE_PAIR_EVENT'
export const DIGIT_DEFAULT = 5
export const DIGIT_PRICES = {
  [GEM_ID]: 8,
  [LION_ID]: 9
}

/***********
 * GLOBAL CONSTANTS
 ***********/
var VERSION = "2.0.0";
var PREFERENCES = {}; //set when logging in

//Addresses
var DEFAULT_NUM_ADDRESSES = 1; //default number of addresses to generate. Go with 1 for now to be more newbie friendly
var MAX_ADDRESSES = 20; //arbitrary (but will generate more on login if they have activity...this just prevents
                        //additional addresses from being generated via the GUI)

var STATS_MAX_NUM_TRANSACTIONS = 100; //max # transactions to show in the table
var VIEW_PRICES_NUM_ASSET_PAIRS = 50; //show market info for this many pairs
var VIEW_PRICES_ASSET_PAIRS_REFRESH_EVERY = 5 * 60 * 1000; //refresh asset pair market info every 5 minutes
var VIEW_PRICES_NUM_LATEST_TRADES = 50; //show this many latest trades on the view prices page
var VIEW_PRICES_LATEST_TRADES_REFRESH_EVERY = 5 * 60 * 1000; //refresh latest trades every 5 minutes

var MARKET_INFO_REFRESH_EVERY = 5 * 60 * 1000; //refresh market info every 5 minutes while enabled (on buy/sell page, and view prices page) 

var CHAT_NUM_USERS_ONLINE_REFRESH_EVERY = 5 * 60 * 1000; //refresh online user count every 5 minutes while enabled

var ALLOW_UNCONFIRMED_INPUTS = true;  // allow use unconfirmed unspents

// should be a i18n key
var ACTION_PENDING_NOTICE = "pending_notice";

var ARMORY_OFFLINE_TX_PREFIX = "=====TXSIGCOLLECT-";

var DEFAULT_PREFERENCES = {
  'num_addresses_used': DEFAULT_NUM_ADDRESSES,
  'address_aliases': {},
  'selected_theme': 'ultraLight',
  'selected_lang': 'en-us',
  'watch_only_addresses': [],
  'armory_offline_addresses': [],
  'multisig_addresses': [],
  'has_accepted_license': false
};

var COUNTERWALLET_CONF_LOCATION = "/aspirewallet.conf.json";

var NUMERIC_ASSET_ID_MIN = bigInt(26).pow(12).add(1);
var NUMERIC_ASSET_ID_MAX = bigInt(256).pow(8);

var SUBASSET_MAX_DISP_LENGTH = 20;

var IS_MOBILE_OR_TABLET = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var MAX_INT = Math.pow(2, 63) - 1;
var UNIT = 100000000;
var MIN_FEE = 1000; // in satoshis
var REGULAR_DUST_SIZE = 5430;
var MULTISIG_DUST_SIZE = 7800;
var MIN_BALANCE_FOR_ACTION = 10000; //in satoshis ... == .0005
var STANDARD_ASSET_FEE_ASP = 0;
var ASSET_CREATION_FEE_XCP = 10.0; // in normalized ASP
var SUBASSET_CREATION_FEE_XCP = 10.0; // in normalized ASP
var MAX_ASSET_DESC_LENGTH = 41; // 42, minus a null term character
var FEE_FRACTION_REQUIRED_DEFAULT_PCT = 1;   // 0.90% of total order
var FEE_FRACTION_PROVIDED_DEFAULT_PCT = 1;   // 1.00% of total order
var FEE_FRACTION_DEFAULT_FILTER = 1;
var B26_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ORIG_REFERER = document.referrer;

var ENTITY_NAMES = {
  'proofofwork': 'Proof-of-Work',
  'debits': 'Debit',
  'credits': 'Credit',
  'sends': 'Send',
  'issuances': 'Issuance',
  'broadcasts': 'Broadcast',
  'dividends': 'Distribution',
  'callbacks': 'Callback',
};

var ENTITY_ICONS = {
  'proofofwork': 'fa-fire',
  'debits': 'fa-minus',
  'credits': 'fa-plus',
  'sends': 'fa-share',
  'btcpays': 'fa-btc',
  'issuances': 'fa-magic',
  'broadcasts': 'fa-rss',
  'dividends': 'fa-ticket',
  'callbacks': 'fa-retweet',
};

var ENTITY_NOTO_COLORS = {
  'proofofwork': 'bg-color-yellow',
  'debits': 'bg-color-red',
  'credits': 'bg-color-green',
  'sends': 'bg-color-orangeDark',
  'issuances': 'bg-color-pinkDark',
  'broadcasts': 'bg-color-magenta',
  'dividends': 'bg-color-pink',
  'callbacks': 'bg-color-pink',
};
var LEVERAGE_UNIT = 5040;

/***********
 * DYNAMICALLY SET
 ***********/
var TESTNET_PASSPHRASE = qs("passphrase");

var CRYPTED_PASSPHRASE;
if (location.hash.indexOf('cp=') == 1) {
  CRYPTED_PASSPHRASE = location.hash.substr(4);
  location.hash = '';
}
location.hash = '';

//CONSTANTS THAT DEPEND ON IS_DEV / USE_TESTNET
var USER_COUNTRY = ''; //set in logon.js
var CURRENT_PAGE_URL = ''; // set in loadUrl()

//selective disablement
var DISABLED_FEATURES_SUPPORTED = ['dividend', 'leaderboard', 'portfolio', 'stats', 'history']; //what can be disabled
var DISABLED_FEATURES = []; //set in aspirewallet.js

// restricted action
var RESTRICTED_AREA = {
  'dividend': ['US'],
}

var RESTRICTED_AREA_MESSAGE = {
}

var MAX_SUPPORT_CASE_PROBLEM_LEN = 4096;
var QUOTE_ASSETS = []; // initalized with aspireblock is_ready()

function qs(key) {
  //http://stackoverflow.com/a/7732379
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

//Allow the site root to specify "dev" and "testnet" parameters...
// IS_DEV is enabled if the initial (root) URL access has ?dev=1
// USE_TESTNET is enabled if the initial (root) URL access has ?testnet=1, OR the hostname visited starts with 'testnet' (e.g. testnet.myhost.com)
var IS_DEV = (location.pathname == "/" && qs("dev") && qs("dev") != '0' ? true : false);
var USE_TESTNET = (   (((location.pathname == "/" || location.pathname == "/src/" || location.pathname == "/build/") && qs("testnet") && qs("testnet") != '0')
  || location.hostname.indexOf('testnet') != -1) ? true : false
);

var BLOCKEXPLORER_URL = USE_TESTNET ? "https://testnet.aspireexplorer.com" : "https://aspireexplorer.com";
var GOOGLE_ANALYTICS_UAID = null; //will be set in aspirewallet.js
var ROLLBAR_ACCESS_TOKEN = null; //will be set in aspirewallet.js

var TRANSACTION_DELAY = 5000; // delay between transaction to avoid error -22 (vin reused)
var TRANSACTION_MAX_RETRY = 5; // max retry when transaction failed (don't include first transaction, so 3 retry means 4 queries)

var DONATION_ADDRESS = USE_TESTNET ? 'FvzKvSF9ZNLbtFW5SS8R4xHeFArue9hBuT' : 'GZE6P3gyiyNdWdozuVJDZjAiEAGe2u8AWR';

var APPROX_SECONDS_PER_BLOCK = USE_TESTNET ? 20 * 60 : 8 * 60; //a *rough* estimate on how many seconds per each block (used for estimating open order time left until expiration, etc)

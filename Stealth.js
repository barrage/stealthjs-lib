import Request from "./Request.js";

/**
 * Stealth SDK connector and interaction class
 * @class
 */
export default class Stealth {
  /**
   * Host of the RPC daemon
   *
   * @type {string}
   */
  host = "localhost";

  /**
   * port of the RPC daemon
   *
   * @type {number}
   */
  port = 46502;

  /**
   * Lets us know if we are using test net for the network
   *
   * @type {boolean}
   */
  test = false;

  /**
   * RPC daemon username
   *
   * @type {null|string}
   */
  username = null;

  /**
   * RPC daemon password
   *
   * @type {null|string}
   */
  password = null;

  /**
   * Version to expect from JSON rpc daemon
   *
   * @type {string}
   */
  jsonRpc = "2.0";

  /**
   * Request ID number
   *
   * @type {number}
   */
  requestId = 0;

  /**
   * Tell us if we are debugging to display more logs
   *
   * @type {boolean}
   */
  debug = false;

  /**
   * @param {object} options
   */
  constructor(options = {}) {
    if (typeof options !== "object" || !options) {
      options = {
        host: "localhost",
        port: 46502,
        test: false,
      };
    }

    if (typeof options.host === "string" && options.host) {
      this.host = options.host;
    }

    if (options.port && !isNaN(parseInt(options.port))) {
      this.port = parseInt(options.port);
    }

    if (options.username && typeof options.username === "string") {
      this.username = options.username;
    }

    if (options.password && typeof options.password === "string") {
      this.password = options.password;
    }

    if (options.jsonRpc && typeof options.jsonRpc === "string") {
      this.jsonRpc = options.jsonRpc;
    }

    this.test = !!options.test;
    this.debug = !!options.debug;
  }

  /**
   * Make new request
   *
   * @param {string} method
   * @param {any[]} params
   * @return {Promise<object>}
   */
  async request(method, params = []) {
    const request = new Request(this, method, params, this.requestId);
    const response = await request.make();

    this.requestId += 1;

    return response.result || {};
  }

  /**
   * @param {number} required
   * @param {string[]} keys
   * @param {string} [account=""]
   * @return {Promise<Object>}
   */
  async addmultisigaddress(required, keys, account = "") {
    return this.request("addmultisigaddress", [
      parseInt(`${required}`),
      keys.join(","),
      account,
    ]);
  }

  /**
   * @param {string} destination
   * @return {Promise<Object>}
   */
  async backupwallet(destination) {
    return this.request("backupwallet", [destination]);
  }

  /**
   * @return {Promise<Object>}
   */
  async checkwallet() {
    return this.request("checkwallet");
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {number} amount
   * @return {Promise<Object>}
   */
  async claimqposbalance(txId, vOut, amount) {
    return this.request("claimqposbalance", [
      txId,
      parseInt(`${vOut}`),
      amount,
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async clearwallettransactions() {
    return this.request("clearwallettransactions");
  }

  /**
   * @param {object[]} transactions [{"txid":txid,"vOut":n},...]
   * @param {object} addresses {address:amount,...}
   * @return {Promise<Object>}
   */
  async createrawtransaction(transactions, addresses) {
    return this.request("createrawtransaction", [
      transactions,
      addresses,
    ]);
  }

  /**
   * @param {string} hex
   * @return {Promise<Object>}
   */
  async decoderawtransaction(hex) {
    return this.request("decoderawtransaction", [hex]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {alias} alias
   * @return {Promise<Object>}
   */
  async disablestaker(txId, vOut, alias) {
    return this.request("disablestaker", [
      txId,
      parseInt(`${vOut}`),
      alias,
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async dumpprivkey(XSTAddress) {
    return this.request("disablestaker", [
      XSTAddress,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @return {Promise<Object>}
   */
  async enablestaker(txId, vOut, alias) {
    return this.request("disablestaker", [
      txId,
      parseInt(`${vOut}`),
      alias,
    ]);
  }

  /**
   * @param {string} passphrase
   * @return {Promise<Object>}
   */
  async encryptwallet(passphrase) {
    return this.request("encryptwallet", [
      passphrase,
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async exitreplay() {
    return this.request("exitreplay");
  }

  /**
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async getaccount(XSTAddress) {
    return this.request("getaccount", [
      XSTAddress,
    ]);
  }

  /**
   * @param {string} account
   * @return {Promise<Object>}
   */
  async getaccountaddress(account) {
    return this.request("getaccountaddress", [
      account,
    ]);
  }

  /**
   * @param {string} address
   * @return {Promise<Object>}
   */
  async getaddressbalance(address) {
    return this.request("getaddressbalance", [
      address,
    ]);
  }

  /**
   * @param {string} account
   * @return {Promise<Object>}
   */
  async getaddressesbyaccount(account) {
    return this.request("getaddressesbyaccount", [
      account,
    ]);
  }

  /**
   * @param {string} address
   * @return {Promise<Object>}
   */
  async getaddressinfo(address) {
    return this.request("getaddressinfo", [
      address,
    ]);
  }

  /**
   * @param {string} address
   * @param {number} [start=0]
   * @param {number} [max=10]
   * @return {Promise<Object>}
   */
  async getaddressinputs(address, start = 0, max = 10) {
    return this.request("getaddressinputs", [
      address,
      parseInt(`${start}`),
      parseInt(`${max}`),
    ]);
  }

  /**
   * @param {string} address
   * @param {number} [start=0]
   * @param {number} [max=10]
   * @return {Promise<Object>}
   */
  async getaddressoutputs(address, start = 0, max = 10) {
    return this.request("getaddressoutputs", [
      address,
      parseInt(`${start}`),
      parseInt(`${max}`),
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async getadjustedtime() {
    return this.request("getadjustedtime");
  }

  /**
   * @param {string} account
   * @param {number} [minConf=1]
   * @return {Promise<Object>}
   */
  async getbalance(account, minConf = 1) {
    return this.request("getbalance", [
      account,
      parseInt(`${minConf}`),
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async getbestblockhash() {
    return this.request("getbestblockhash");
  }

  /**
   * @param {string} hash
   * @param {boolean} [txInfo=false]
   * @return {Promise<Object>}
   */
  async getblock(hash, txInfo = false) {
    return this.request("getblock", [
      hash,
      !!txInfo,
    ]);
  }

  /**
   * @param {string} number
   * @param {boolean} [txInfo=false]
   * @return {Promise<Object>}
   */
  async getblockbynumber(number, txInfo = false) {
    return this.request("getblockbynumber", [
      number,
      !!txInfo,
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async getblockcount() {
    return this.request("getblockcount");
  }

  /**
   * @param {number} index
   * @return {Promise<Object>}
   */
  async getblockhash(index) {
    return this.request("getblockhash", [
      parseInt(`${index}`),
    ]);
  }

  /**
   * @param {number} period
   * @param {number} windowSize
   * @param {number} windowSpacing
   * @return {Promise<Object>}
   */
  async getblockinterval(period, windowSize, windowSpacing) {
    return this.request("getblockinterval", [
      parseInt(`${period}`),
      parseInt(`${windowSize}`),
      parseInt(`${windowSpacing}`),
    ]);
  }

  /**
   * @param {string} period
   * @param {string} windowSize
   * @param {string} windowSpacing
   * @return {Promise<Object>}
   */
  async getblockintervalmean(period, windowSize, windowSpacing) {
    return this.request("getblockintervalmean", [
      parseInt(`${period}`),
      parseInt(`${windowSize}`),
      parseInt(`${windowSpacing}`),
    ]);
  }

  /**
   * @param {string} period
   * @param {string} windowSize
   * @param {string} windowSpacing
   * @return {Promise<Object>}
   */
  async getblockintervalrmsd(period, windowSize, windowSpacing) {
    return this.request("getblockintervalrmsd", [
      parseInt(`${period}`),
      parseInt(`${windowSize}`),
      parseInt(`${windowSpacing}`),
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async getcheckpoint() {
    return this.request("getcheckpoint");
  }

  /**
   * @param {string} extendedKey
   * @param {number} child
   * @param {string} [networkByte]
   * @return {Promise<Object>}
   */
  async getchildkey(extendedKey, child, networkByte) {
    const params = [
      extendedKey,
      parseInt(`${child}`),
    ];

    if (typeof networkByte === "number") {
      params.push(parseInt(`${networkByte}`));
    }

    return this.request("getchildkey", params);
  }

  /**
   * @return {Promise<Object>}
   */
  async getconnectioncount() {
    return this.request("getconnectioncount");
  }

  /**
   * @return {Promise<Object>}
   */
  async getdifficulty() {
    return this.request("getdifficulty");
  }

  /**
   * @return {Promise<Object>}
   */
  async gethashespersec() {
    return this.request("gethashespersec");
  }

  /**
   * @param {string} extendedKey
   * @return {Promise<Object>}
   */
  async gethdaccount(extendedKey) {
    return this.request("gethdaccount");
  }

  /**
   * @return {Promise<Object>}
   */
  async getinfo() {
    return this.request("getinfo");
  }

  /**
   * @return {Promise<Object>}
   */
  async getmininginfo() {
    return this.request("getmininginfo");
  }

  /**
   * @param {string} [account]
   * @return {Promise<Object>}
   */
  async getnewaddress(account = "") {
    const params = [];

    if (account && typeof account === "string") {
      params.push(account);
    }

    return this.request("getnewaddress", params);
  }

  /**
   * @param {number} time
   * @return {Promise<Object>}
   */
  async getnewestblockbeforetime(time) {
    return this.request("getnewestblockbeforetime", [
      parseInt(`${time}`),
    ]);
  }

  /**
   * @param {string} [account]
   * @return {Promise<Object>}
   */
  async getnewpubkey(account = "") {
    const params = [];

    if (account && typeof account === "string") {
      params.push(account);
    }

    return this.request("getnewpubkey", params);
  }

  /**
   * @param {string} [label]
   * @return {Promise<Object>}
   */
  async getnewstealthaddress(label = "") {
    const params = [];

    if (label && typeof label === "string") {
      params.push(label);
    }

    return this.request("getnewstealthaddress", params);
  }

  /**
   * @return {Promise<Object>}
   */
  async getpeerinfo() {
    return this.request("getpeerinfo");
  }

  /**
   * @param {string} pubKey
   * @return {Promise<Object>}
   */
  async getqposbalance(pubKey) {
    return this.request("getqposbalance", [
      pubKey,
    ]);
  }

  /**
   * @param {number} [height]
   * @return {Promise<Object>}
   */
  async getqposinfo(height) {
    const params = [];

    if ((height || height === 0) && typeof height === "number") {
      params.push(height);
    }

    return this.request("getqposinfo", params);
  }

  /**
   * @return {Promise<Object>}
   */
  async getrawmempool() {
    return this.request("getrawmempool");
  }

  /**
   * @param {string} txId
   * @param {number} [verbose=0]
   * @return {Promise<Object>}
   */
  async getrawtransaction(txId, verbose = 0) {
    return this.request("getrawtransaction", [
      txId,
      parseInt(`${verbose}`),
    ]);
  }

  /**
   * @param {string} account
   * @param {number} [minConf=1]
   * @return {Promise<Object>}
   */
  async getreceivedbyaccount(account, minConf = 1) {
    return this.request("getreceivedbyaccount", [
      account,
      parseInt(`${minConf}`),
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @param {number} [minConf=1]
   * @return {Promise<Object>}
   */
  async getreceivedbyaddress(XSTAddress, minConf = 1) {
    return this.request("getreceivedbyaddress", [
      XSTAddress,
      parseInt(`${minConf}`),
    ]);
  }

  /**
   * @param {number} [start=0]
   * @param {number} [max=10]
   * @return {Promise<Object>}
   */
  async getrichlist(start = 0, max = 10) {
    const params = [];

    if ((start || start === 0) && typeof start === "number") {
      params.push(parseInt(`${start}`));
    }

    if ((max || max === 0) && typeof max === "number") {
      if (!params.length) {
        params.push(0);
      }

      params.push(parseInt(`${max}`));
    }

    return this.request("getrichlist", params);
  } // [start] [max]

  /**
   * @param {number} [minimum=0]
   * @return {Promise<Object>}
   */
  async getrichlistsize(minimum = 0) {
    const params = [];

    if ((minimum || minimum === 0) && typeof minimum === "number") {
      params.push(parseInt(`${minimum}`));
    }

    return this.request("getrichlistsize", params);
  }

  /**
   * @param {string} alias
   * @return {Promise<Object>}
   */
  async getstakerid(alias) {
    return this.request("getstakerid", [
      alias,
    ]);
  }

  /**
   * @param {string} alias
   * @return {Promise<Object>}
   */
  async getstakerinfo(alias) {
    return this.request("getstakerinfo", [
      alias,
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async getstakerprice() {
    return this.request("getstakerprice");
  }

  /**
   * @param {string} [nTarget]
   * @return {Promise<Object>}
   */
  async getsubsidy(nTarget) {
    const params = [];

    if (nTarget && typeof nTarget === "string") {
      params.push(nTarget);
    }

    return this.request("getsubsidy", params);
  }

  /**
   * @param {string} txId
   * @return {Promise<Object>}
   */
  async gettransaction(txId) {
    return this.request("gettransaction", [
      txId,
    ]);
  }

  /**
   * @param {number} period
   * @param {number} windowSize
   * @param {number} windowSpacing
   * @return {Promise<Object>}
   */
  async gettxvolume(period, windowSize, windowSpacing) {
    return this.request("gettxvolume", [
      parseInt(`${period}`),
      parseInt(`${windowSize}`),
      parseInt(`${windowSpacing}`),
    ]);
  }

  /**
   * @param {number} period
   * @param {number} windowSize
   * @param {number} windowSpacing
   * @return {Promise<Object>}
   */
  async getxstvolume(period, windowSize, windowSpacing) {
    return this.request("getxstvolume", [
      parseInt(`${period}`),
      parseInt(`${windowSize}`),
      parseInt(`${windowSpacing}`),
    ]);
  }

  /**
   * @param {string} command
   * @return {Promise<Object>}
   */
  async help(command = "") {
    const params = [];

    if (command && typeof command === "string") {
      params.push(command);
    }

    return this.request("help", params);
  }

  /**
   * @param {string} XSTPrivateKey
   * @param {string} [label]
   * @return {Promise<Object>}
   */
  async importprivkey(XSTPrivateKey, label = "") {
    return this.request("disablestaker", [
      XSTPrivateKey,
      label,
    ]);
  }

  /**
   * @param {string} scanSecret
   * @param {string} spendSecret
   * @param {string} [label]
   * @return {Promise<Object>}
   */
  async importstealthaddress(scanSecret, spendSecret, label = "") {
    return this.request("importstealthaddress", [
      scanSecret,
      spendSecret,
      label,
    ]);
  }

  /**
   * @param {string} [newSize]
   * @return {Promise<Object>}
   */
  async keypoolrefill(newSize = "") {
    return this.request("keypoolrefill", [
      newSize,
    ]);
  }

  /**
   * @param {number} [minConf=1]
   * @return {Promise<Object>}
   */
  async listaccounts(minConf = 1) {
    return this.request("listaccounts", [
      parseInt(`${minConf}`),
    ]);
  }

  /**
   * @return {Promise<Object>}
   */
  async listaddressgroupings() {
    return this.request("listaddressgroupings");
  }

  /**
   * @param {number} [minConf=1]
   * @param {boolean} [includeEmpty=false]
   * @return {Promise<Object>}
   */
  async listreceivedbyaccount(minConf = 1, includeEmpty = false) {
    return this.request("listreceivedbyaccount", [
      parseInt(`${minConf}`),
      !!includeEmpty,
    ]);
  }

  /**
   * @param {number} [minConf=1]
   * @param {boolean} [includeEmpty=false]
   * @return {Promise<Object>}
   */
  async listreceivedbyaddress(minConf = 1, includeEmpty = false) {
    return this.request("listreceivedbyaddress", [
      parseInt(`${minConf}`),
      !!includeEmpty,
    ]);
  } // [minconf=1] [includeempty=false]

  /**
   * @param {string} [blockHash]
   * @param {number} [targetConfirmations=0]
   * @return {Promise<Object>}
   */
  async listsinceblock(blockHash = "", targetConfirmations = 0) {
    return this.request("listsinceblock", [
      blockHash,
      parseInt(`${targetConfirmations}`),
    ]);
  }

  /**
   * @param {string} showSecrets
   * @return {Promise<Object>}
   */
  async liststealthaddresses(showSecrets = "") {
    return this.request("liststealthaddresses", [
      showSecrets,
    ]);
  }

  /**
   * @param {string} account
   * @param {number} count
   * @param {number} from
   * @return {Promise<Object>}
   */
  async listtransactions(account = "", count = 10, from = 0) {
    return this.request("listtransactions", [
      account,
      parseInt(`${count}`),
      parseInt(`${from}`),
    ]);
  }

  /**
   * @param {number} [minConf=1]
   * @param {number} [maxConf=9999999]
   * @param {string[]} [addresses]
   * @return {Promise<Object>}
   */
  async listunspent(minConf = 1, maxConf = 9999999, addresses = []) {
    return this.request("listunspent", [
      parseInt(`${minConf}`),
      parseInt(`${maxConf}`),
      addresses.join(","),
    ]);
  }

  /**
   * @param {string} [prefix]
   * @return {Promise<Object>}
   */
  async makekeypair(prefix = "") {
    return this.request("makekeypair", [
      prefix,
    ]);
  }

  /**
   * @param {string} fromAccount
   * @param {string} toAccount
   * @param {number} amount
   * @param {number} [minConf=1]
   * @param {string} [comment=""]
   * @return {Promise<Object>}
   */
  async move(fromAccount, toAccount, amount, minConf = 1, comment = "") {
    return this.request("move", [
      fromAccount,
      toAccount,
      parseFloat(`${amount}`),
      parseInt(`${minConf}`),
      comment,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @param {string} owner
   * @param {number} [amount] is is the amount to pay If the amount is not specified it will be calculated automatically
   * @param {string} [delegate] and [controller] are compressed pubkeys If delegate and controller are not specified then they are taken from owner.
   * @param {string} [controller]
   * @param {number} [payout] is in percentage, and is rounded to the nearest thousandths of a percent Either just the owner key or all 3 keys plus the payout must be specified.
   * @return {Promise<Object>}
   */
  async purchasestaker(txId, vOut, alias, owner, amount, delegate, controller, payout) {
    const params = [
      txId,
      parseInt(`${vOut}`),
      alias,
      owner,
    ];

    if ((amount || amount === 0) && typeof amount === "number") {
      params.push(parseFloat(`${amount}`));
    }

    if (delegate && typeof delegate === "string") {
      params.push(delegate);
    }

    if (controller && typeof controller === "string") {
      params.push(controller);
    }

    if ((payout || payout === 0) && typeof payout === "number") {
      params.push(parseFloat(`${payout}`));
    }

    return this.request("purchasestaker", params);
  }

  /**
   * @return {Promise<Object>}
   */
  async repairwallet() {
    return this.request("repairwallet");
  }

  /**
   * @return {Promise<Object>}
   */
  async resendtx() {
    return this.request("resendtx");
  }

  /**
   * @param {boolean} [reserve]
   * @param {number} [amount=0]
   * @return {Promise<Object>}
   */
  async reservebalance(reserve, amount) {
    const params = [];

    if (typeof reserve === "boolean") {
      params.push(reserve);
    }

    if ((amount || amount === 0) && typeof amount === "number") {
      params.push(parseFloat(`${amount}`));
    }

    return this.request("reservebalance", params);
  }

  /**
   * @param {number} [fromHeight=0]
   * @return {Promise<Object>}
   */
  async scanforalltxns(fromHeight = 0) {
    return this.request("scanforalltxns", [
      parseInt(`${fromHeight}`),
    ]);
  }

  /**
   * @param {number} [fromHeight=0]
   * @return {Promise<Object>}
   */
  async scanforstealthtxns(fromHeight = 0) {
    return this.request("scanforstealthtxns", [
      parseInt(`${fromHeight}`),
    ]);
  }

  /**
   * @param {string} message
   * @param {string} privateKey
   * @param {string} minVer
   * @param {string} maxVer
   * @param {string} priority
   * @param {string} id
   * @param {string} [cancelUpTo]
   * @return {Promise<Object>}
   */
  async sendalert(message, privateKey, minVer, maxVer, priority, id, cancelUpTo = "") {
    const params = [
      message,
      privateKey,
      minVer,
      maxVer,
      priority,
      id,
    ];

    if (cancelUpTo && typeof cancelUpTo === "string") {
      params.push(cancelUpTo);
    }

    return this.request("sendalert", params);
  }

  /**
   * @param {string} fromAccount
   * @param {string} toXSTAddress
   * @param {number} amount
   * @param {number} [minConf=1]
   * @param {string} [comment=""]
   * @param {string} [commentTo=""]
   * @return {Promise<Object>}
   */
  async sendfrom(fromAccount, toXSTAddress, amount, minConf = 1, comment = "", commentTo = "") {
    return this.request("sendfrom", [
      fromAccount,
      toXSTAddress,
      parseFloat(`${amount}`),
      parseInt(`${minConf}`),
      comment,
      commentTo,
    ]);
  }

  /**
   * @param {string} fromAccount
   * @param {object} addressAmount {address: amount,...}
   * @param {number} [minConf=1]
   * @param {string} [comment=""]
   * @return {Promise<Object>}
   */
  async sendmany(fromAccount, addressAmount, minConf = 1, comment = "") {
    return this.request("sendmany", [
      fromAccount,
      JSON.stringify(addressAmount),
      parseInt(`${minConf}`),
      comment,
    ]);
  }

  /**
   * @param {string} hex
   * @return {Promise<Object>}
   */
  async sendrawtransaction(hex) {
    return this.request("sendrawtransaction", [
      hex,
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @param {number} amount
   * @param {string} [comment=""]
   * @param {string} [commentTo=""]
   * @return {Promise<Object>}
   */
  async sendtoaddress(XSTAddress, amount, comment = "", commentTo = "") {
    return this.request("sendtoaddress", [
      XSTAddress,
      parseFloat(`${amount}`),
      comment,
      commentTo,
    ]);
  }

  /**
   * @param {string} address
   * @param {number} amount
   * @param {string} [narration=""]
   * @param {string} [comment=""]
   * @param {string} [commentTo=""]
   * @return {Promise<Object>}
   */
  async sendtostealthaddress(address, amount, narration = "", comment = "", commentTo = "") {
    return this.request("sendtostealthaddress", [
      address,
      parseFloat(`${amount}`),
      narration,
      comment,
      commentTo,
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @param {string} account
   * @return {Promise<Object>}
   */
  async setaccount(XSTAddress, account) {
    return this.request("setaccount", [
      XSTAddress,
      account,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @param {string} controller
   * @return {Promise<Object>}
   */
  async setstakercontroller(txId, vOut, alias, controller) {
    return this.request("setstakercontroller", [
      txId,
      parseInt(`${vOut}`),
      alias,
      controller,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @param {string} delegate
   * @param {string} payout
   * @return {Promise<Object>}
   */
  async setstakerdelegate(txId, vOut, alias, delegate, payout) {
    return this.request("setstakerdelegate", [
      txId,
      parseInt(`${vOut}`),
      alias,
      delegate,
      payout,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @param {string} key
   * @param {number} value
   * @return {Promise<Object>}
   */
  async setstakermeta(txId, vOut, alias, key, value) {
    return this.request("setstakermeta", [
      txId,
      parseInt(`${vOut}`),
      alias,
      key,
      value,
    ]);
  }

  /**
   * @param {string} txId
   * @param {number} vOut
   * @param {string} alias
   * @param {string} owner
   * @return {Promise<Object>}
   */
  async setstakerowner(txId, vOut, alias, owner) {
    return this.request("setstakerowner", [
      txId,
      parseInt(`${vOut}`),
      alias,
      owner,
      "iunderstand",
    ]);
  }

  /**
   * @param {number} amount
   * @return {Promise<Object>}
   */
  async settxfee(amount) {
    return this.request("settxfee", [
      parseFloat(`${amount}`),
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @param {string} message
   * @return {Promise<Object>}
   */
  async signmessage(XSTAddress, message) {
    return this.request("signmessage", [
      XSTAddress,
      message,
    ]);
  }

  /**
   * @param {string} hex
   * @param {object[]} transactions
   * @param {string[]} privateKeys
   * @param {string} [signHashTypes="ALL"]
   * @return {Promise<Object>}
   */
  async signrawtransaction(hex, transactions, privateKeys = [], signHashTypes = "ALL") {
    return this.request("signrawtransaction", [
      hex,
      JSON.stringify(transactions),
      privateKeys.join(","),
      signHashTypes,
    ]);
  }

  /**
   * @param {boolean} detach
   * @return {Promise<Object>}
   */
  async stop(detach) {
    return this.request("stop", [!!detach]);
  }

  /**
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async validateaddress(XSTAddress) {
    return this.request("validateaddress", [
      XSTAddress,
    ]);
  }

  /**
   * @param {string} XSTPubKey
   * @return {Promise<Object>}
   */
  async validatepubkey(XSTPubKey) {
    return this.request("validatepubkey", [
      XSTPubKey,
    ]);
  }

  /**
   * @param {string} XSTAddress
   * @param {string} signature
   * @param {string} message
   * @return {Promise<Object>}
   */
  async verifymessage(XSTAddress, signature, message) {
    return this.request("verifymessage", [
      XSTAddress,
      signature,
      message,
    ]);
  }
}

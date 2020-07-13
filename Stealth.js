const Request = require("./Request");

/**
 * Stealth SDK connector and interaction class
 * @class
 */
module.exports = class Stealth {
  /**
   * @param {object} options
   * @constructor
   */
  constructor(options = {}) {
    /**
     * Host of the RPC daemon
     *
     * @type {string}
     */
    this.host = "localhost";

    /**
     * port of the RPC daemon
     *
     * @type {number}
     */
    this.port = 46502;

    /**
     * Lets us know if we are using test net for the network
     *
     * @type {boolean}
     */
    this.test = false;

    /**
     * RPC daemon username
     *
     * @type {null|string}
     */
    this.username = null;

    /**
     * RPC daemon password
     *
     * @type {null|string}
     */
    this.password = null;

    /**
     * Version to expect from JSON rpc daemon
     *
     * @type {string}
     */
    this.jsonRpc = "2.0";

    /**
     * Request ID number
     *
     * @type {number}
     */
    this.requestId = 0;

    /**
     * Tell us if we are debugging to display more logs
     *
     * @type {boolean}
     */
    this.debug = false;

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
   * Make request to any of the RPC functions directly
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
   * Add a n-required-to-sign multi-signature address to the wallet
   * each key is an XST address or hex-encoded public key
   * If [account] is specified, assign address to [account].
   *
   * @param {number} nRequired
   * @param {string[]} keys
   * @param {string} [account=""]
   * @return {Promise<Object>}
   */
  async addmultisigaddress(nRequired, keys, account = "") {
    return this.request("addmultisigaddress", [
      parseInt(`${nRequired}`),
      keys.join(","),
      account,
    ]);
  }

  /**
   * Safely copies wallet.dat to destination, which can be a directory or a path with filename.
   *
   * @param {string} destination
   * @return {Promise<Object>}
   */
  async backupwallet(destination) {
    return this.request("backupwallet", [destination]);
  }

  /**
   * Check wallet for integrity.
   *
   * @return {Promise<Object>}
   */
  async checkwallet() {
    return this.request("checkwallet");
  }

  /**
   * "claimqposbalance <txId> <vOut> <amount>
   *    <txId> is the transaction ID of the input
   *    <vOut> is the prevout index of the input
   *    <amount> is the amount to claim
   *      Amount is real and rounded to the nearest 0.000001.
   *      Claim plus change is returned to claimant hashed pubkey
   *
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
   * delete all transactions from wallet - reload with scanforalltxns
   * Warning: Backup your wallet first!
   *
   * @return {Promise<Object>}
   */
  async clearwallettransactions() {
    return this.request("clearwallettransactions");
  }

  /**
   * createrawtransaction [{\"txid\":txid,\"vout\":n},...] {address:amount,...}
   * Create a transaction spending given inputs
   * (array of objects containing transaction id and output number),
   * sending to given address(es).
   * Returns hex-encoded raw transaction.
   * Note that the transaction's inputs are not signed, and
   * it is not stored in the wallet or transmitted to the network.
   *
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
   * Return a JSON object representing the serialized, hex-encoded transaction.
   *
   * @param {string} hex
   * @return {Promise<Object>}
   */
  async decoderawtransaction(hex) {
    return this.request("decoderawtransaction", [hex]);
  }

  /**
   * @param {string} txId transaction ID of the input
   * @param {number} vOut prevout index of the input
   * @param {alias} alias non-case sensitive staker alias
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
   * Reveals the private key corresponding to <XSTaddress>.
   *
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async dumpprivkey(XSTAddress) {
    return this.request("disablestaker", [
      XSTAddress,
    ]);
  }

  /**
   * enablestaker <txId> <vOut> <alias>
   *    <txId> is the transaction ID of the input
   *    <vOut> is the prevout index of the input
   *    <alias> is a non-case sensitive staker alias
   *
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
   * Encrypts the wallet with <passphrase>
   *
   * @param {string} passphrase
   * @return {Promise<Object>}
   */
  async encryptwallet(passphrase) {
    return this.request("encryptwallet", [
      passphrase,
    ]);
  }

  /**
   * Manually exits registry replay (testnet only).
   *
   * @return {Promise<Object>}
   */
  async exitreplay() {
    return this.request("exitreplay");
  }

  /**
   * Returns the current XST address for receiving payments to this account.
   *
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async getaccount(XSTAddress) {
    return this.request("getaccount", [
      XSTAddress,
    ]);
  }

  /**
   * Returns the current XST address for receiving payments to this account.
   *
   * @param {string} account
   * @return {Promise<Object>}
   */
  async getaccountaddress(account) {
    return this.request("getaccountaddress", [
      account,
    ]);
  }

  /**
   * Returns the balance of <address>.
   *
   * @param {string} address
   * @return {Promise<Object>}
   */
  async getaddressbalance(address) {
    return this.request("getaddressbalance", [
      address,
    ]);
  }

  /**
   * Returns the list of addresses for the given account.
   *
   * @param {string} account
   * @return {Promise<Object>}
   */
  async getaddressesbyaccount(account) {
    return this.request("getaddressesbyaccount", [
      account,
    ]);
  }

  /**
   * Returns info about <address>.
   *
   * @param {string} address
   * @return {Promise<Object>}
   */
  async getaddressinfo(address) {
    return this.request("getaddressinfo", [
      address,
    ]);
  }

  /**
   * Returns [max] inputs of <address> beginning with [start]
   " For example, if [start]=101 and [max]=100 means to
   " return the second 100 inputs (if possible).
   *
   * @param {string} address
   * @param {number} [start=1]
   * @param {number} [max=100]
   * @return {Promise<Object>}
   */
  async getaddressinputs(address, start = 1, max = 100) {
    return this.request("getaddressinputs", [
      address,
      parseInt(`${start}`),
      parseInt(`${max}`),
    ]);
  }

  /**
   * Returns [max] outputs of <address> beginning with [start]
   " For example, if [start]=101 and [max]=100 means to
   " return the second 100 outputs (if possible).
   *
   * @param {string} address
   * @param {number} [start=0]
   * @param {number} [max=100]
   * @return {Promise<Object>}
   */
  async getaddressoutputs(address, start = 0, max = 100) {
    return this.request("getaddressoutputs", [
      address,
      parseInt(`${start}`),
      parseInt(`${max}`),
    ]);
  }

  /**
   * Returns the Stealth network adjusted time.
   *
   * @return {Promise<Object>}
   */
  async getadjustedtime() {
    return this.request("getadjustedtime");
  }

  /**
   * If [account] is not specified, returns the server's total available balance.
   * If [account] is specified, returns the balance in the account.
   *
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
   * Returns the hash of the best block in the longest block chain.
   *
   * @return {Promise<Object>}
   */
  async getbestblockhash() {
    return this.request("getbestblockhash");
  }

  /**
   * Returns data needed to construct a block to work on:\n"
   *  "version" : block version
   *  "previousblockhash" : hash of current highest block
   *  "transactions" : contents of non-coinbase transactions that should be included in the next block
   *  "coinbaseaux" : data that should be included in coinbase
   *  "coinbasevalue" : maximum allowable input to coinbase transaction, including the generation award and transaction fees
   *  "target" : hash target
   *  "mintime" : minimum timestamp appropriate for next block
   *  "curtime" : current timestamp
   *  "mutable" : list of ways the block template may be changed
   *  "noncerange" : range of valid nonces
   *  "sigoplimit" : limit of sigops in blocks
   *  "sizelimit" : limit of block size
   *  "bits" : compressed target of next block
   *  "height" : height of the next block
   * See https://en.bitcoin.it/wiki/BIP_0022 for full specification.
   *
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
   * Returns details of a block with given block-number.
   *
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
   * Returns the number of blocks in the longest block chain
   *
   * @return {Promise<Object>}
   */
  async getblockcount() {
    return this.request("getblockcount");
  }

  /**
   * Returns hash of block in best-block-chain at <index>.
   *
   * @param {number} index
   * @return {Promise<Object>}
   */
  async getblockhash(index) {
    return this.request("getblockhash", [
      parseInt(`${index}`),
    ]);
  }

  /**
   * Total block interval for the window in seconds
   *
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
   * RMSD of the block intervals for the window in seconds
   *
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
   * RMSD of the block intervals for the window in seconds
   *
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
   * Show info of synchronized checkpoint.
   *
   * @return {Promise<Object>}
   */
  async getcheckpoint() {
    return this.request("getcheckpoint");
  }

  /**
   * Returns key and address information about the child.
   *
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
   * Returns the number of connections to other nodes.
   *
   * @return {Promise<Object>}
   */
  async getconnectioncount() {
    return this.request("getconnectioncount");
  }

  /**
   * Returns the difficulty as a multiple of the minimum difficulty.
   *
   * @return {Promise<Object>}
   */
  async getdifficulty() {
    return this.request("getdifficulty");
  }

  /**
   * Returns a recent hashes per second performance measurement while generating.
   *
   * @return {Promise<Object>}
   */
  async gethashespersec() {
    return this.request("gethashespersec");
  }

  /**
   * Returns all transactions for the hdaccount.
   *
   * @param {string} extendedKey
   * @return {Promise<Object>}
   */
  async gethdaccount(extendedKey) {
    return this.request("gethdaccount");
  }

  /**
   * Returns an object containing various state info.
   *
   * @return {Promise<Object>}
   */
  async getinfo() {
    return this.request("getinfo");
  }

  /**
   * Returns an object containing mining-related information.
   *
   * @return {Promise<Object>}
   */
  async getmininginfo() {
    return this.request("getmininginfo");
  }

  /**
   * Returns a new XST address for receiving payments.
   * If [account] is specified (recommended), it is added to the address book
   * so payments received with the address will be credited to [account].
   *
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
   * Returns the hash of the newest block that has a time stamp earlier than <time>
   * <time> is a unix epoch (seconds)
   *
   * @param {number} time
   * @return {Promise<Object>}
   */
  async getnewestblockbeforetime(time) {
    return this.request("getnewestblockbeforetime", [
      parseInt(`${time}`),
    ]);
  }

  /**
   * Returns new public key for coinbase generation.
   *
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
   * Returns a new StealthAddress for receiving payments anonymously.
   *
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
   * Returns data about each connected network node.
   *
   * @return {Promise<Object>}
   */
  async getpeerinfo() {
    return this.request("getpeerinfo");
  }

  /**
   * Returns qPoS balance owned by <pubKey>
   *
   * @param {string} pubKey
   * @return {Promise<Object>}
   */
  async getqposbalance(pubKey) {
    return this.request("getqposbalance", [
      pubKey,
    ]);
  }

  /**
   * Returns exhaustive qPoS information
   * Optional [height] will get info as of that height (expensive)
   *
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
   * Returns all transaction ids in memory pool.
   *
   * @return {Promise<Object>}
   */
  async getrawmempool() {
    return this.request("getrawmempool");
  }

  /**
   * If verbose=0, returns a string that is
   * serialized, hex-encoded data for <txId>.
   * If verbose is non-zero, returns an Object
   * with information about <txId>.
   *
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
   * Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.
   *
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
   * Returns the total amount received by <XSTaddress> in transactions with at least [minconf] confirmations.
   *
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
   * Returns the number of addresses with balances greater than [minimum].
   *
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
  }

  /**
   * Returns the number of addresses with balances greater than [minimum].
   *
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
   * Returns the id of the staker registered with <alias>.
   *
   * @param {string} alias
   * @return {Promise<Object>}
   */
  async getstakerid(alias) {
    return this.request("getstakerid", [
      alias,
    ]);
  }

  /**
   * Returns exhaustive information about the qPoS registry.
   * <alias> is a non-case sensitive staker alias.
   *
   * @param {string} alias
   * @return {Promise<Object>}
   */
  async getstakerinfo(alias) {
    return this.request("getstakerinfo", [
      alias,
    ]);
  }

  /**
   * Returns the current staker price.
   *
   * @return {Promise<Object>}
   */
  async getstakerprice() {
    return this.request("getstakerprice");
  }

  /**
   * Returns proof-of-work subsidy value for the specified value of target.
   *
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
   * Get detailed information about <txId>
   *
   * @param {string} txId
   * @return {Promise<Object>}
   */
  async gettransaction(txId) {
    return this.request("gettransaction", [
      txId,
    ]);
  }

  /**
   * Number of transactions in each window
   *
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
   * Amount of xst transferred in each window
   *
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
   * List commands, or get help for a command.
   *
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
   * Adds a private key (as returned by dumpprivkey) to your wallet.
   *
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
   * Import an owned StealthAddresses.
   *
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
   * Fills the keypool.
   *
   * @param {string} [newSize]
   * @return {Promise<Object>}
   */
  async keypoolrefill(newSize = "") {
    return this.request("keypoolrefill", [
      newSize,
    ]);
  }

  /**
   * Returns Object that has account names as keys, account balances as values.
   *
   * @param {number} [minConf=1]
   * @return {Promise<Object>}
   */
  async listaccounts(minConf = 1) {
    return this.request("listaccounts", [
      parseInt(`${minConf}`),
    ]);
  }

  /**
   * Lists groups of addresses which have had their common ownership
   * made public by common use as inputs or as the resulting change
   * in past transactions
   *
   * @return {Promise<Object>}
   */
  async listaddressgroupings() {
    return this.request("listaddressgroupings");
  }

  /**
   * Returns an array of objects containing:
   *  "account" : the account of the receiving addresses
   *  "amount" : total amount received by addresses with this account
   *  "confirmations" : number of confirmations of the most recent transaction included
   *
   * @param {number} [minConf=1] minimum number of confirmations before payments are included
   * @param {boolean} [includeEmpty=false] whether to include addresses that haven't received any payments
   * @return {Promise<Object>}
   */
  async listreceivedbyaccount(minConf = 1, includeEmpty = false) {
    return this.request("listreceivedbyaccount", [
      parseInt(`${minConf}`),
      !!includeEmpty,
    ]);
  }

  /**
   * Returns an array of objects containing:
   *   "address" : receiving address
   *   "account" : the account of the receiving address
   *   "amount" : total amount received by the address
   *   "confirmations" : number of confirmations of the most recent transaction included
   *
   * @param {number} [minConf=1] minimum number of confirmations before payments are included
   * @param {boolean} [includeEmpty=false] whether to include addresses that haven't received any payments
   * @return {Promise<Object>}
   */
  async listreceivedbyaddress(minConf = 1, includeEmpty = false) {
    return this.request("listreceivedbyaddress", [
      parseInt(`${minConf}`),
      !!includeEmpty,
    ]);
  }

  /**
   * Get all transactions in blocks since block [blockHash], or all transactions if omitted
   *
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
   * List owned StealthAddresses.
   *
   * @param {string} showSecrets
   * @return {Promise<Object>}
   */
  async liststealthaddresses(showSecrets = "") {
    return this.request("liststealthaddresses", [
      showSecrets,
    ]);
  }

  /**
   * Returns up to [count] most recent transactions skipping the first [from] transactions for account [account].
   *
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
   * Returns array of unspent transaction outputs
   * with between minConf and maxConf (inclusive) confirmations.
   * Optionally filtered to only include txOuts paid to specified addresses.
   * Results are an array of Objects, each of which has:
   * {txId, vOut, scriptPubKey, amount, confirmations}
   *
   * @param {number} [minConf=1]
   * @param {number} [maxConf=9999999]
   * @param {string[]} [txOuts] ["address",...]
   * @return {Promise<Object>}
   */
  async listunspent(minConf = 1, maxConf = 9999999, txOuts = []) {
    return this.request("listunspent", [
      parseInt(`${minConf}`),
      parseInt(`${maxConf}`),
      txOuts.join(","),
    ]);
  }

  /**
   * Make a public/private key pair.
   * [prefix] is optional preferred prefix for the public key.
   *
   * @param {string} [prefix]
   * @return {Promise<Object>}
   */
  async makekeypair(prefix = "") {
    return this.request("makekeypair", [
      prefix,
    ]);
  }

  /**
   * Move from one account in your wallet to another.
   *
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
   * Repair wallet if checkwallet reports any problem.
   *
   * @return {Promise<Object>}
   */
  async repairwallet() {
    return this.request("repairwallet");
  }

  /**
   * Re-send unconfirmed transactions.
   *
   * @return {Promise<Object>}
   */
  async resendtx() {
    return this.request("resendtx");
  }

  /**
   * Set reserve amount not participating in network protection.
   * If no parameters provided current setting is printed.
   *
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
   * Scan blockchain for owned transactions.
   *
   * @param {number} [fromHeight=0]
   * @return {Promise<Object>}
   */
  async scanforalltxns(fromHeight = 0) {
    return this.request("scanforalltxns", [
      parseInt(`${fromHeight}`),
    ]);
  }

  /**
   * Scan blockchain for owned stealth transactions.
   *
   * @param {number} [fromHeight=0]
   * @return {Promise<Object>}
   */
  async scanforstealthtxns(fromHeight = 0) {
    return this.request("scanforstealthtxns", [
      parseInt(`${fromHeight}`),
    ]);
  }

  /**
   * @param {string} message alert text message
   * @param {string} privateKey hex string of alert master private key
   * @param {string} minVer minimum applicable internal client version
   * @param {string} maxVer maximum applicable internal client version
   * @param {string} priority integer priority number
   * @param {string} id alert id (id=0 canels *all* alerts except id=1 alerts)
   * @param {string} [cancelUpTo] cancels all alert id's up to this number
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
   * @param {number} amount real and is rounded to the nearest 0.000001
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
   * @param {object} addressAmount {address: amount,...} amounts are double-precision floating point numbers
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
   * Submits raw transaction (serialized, hex-encoded) to local node and network.
   *
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
   * @param {number} amount real and is rounded to the nearest 0.000001
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
   * @param {number} amount real and is rounded to the nearest 0.000001
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
   * Sets the account associated with the given address.
   *
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
   * @param {string} txId transaction ID of the input
   * @param {number} vOut prevout index of the input
   * @param {string} alias non-case sensitive staker alias
   * @param {string} controller compressed pubkey
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
   * @param {string} txId transaction ID of the input
   * @param {number} vOut prevout index of the input
   * @param {string} alias on-case sensitive staker alias
   * @param {string} delegate compressed pubkey
   * @param {string} payout fraction of block rewards to pay to the delegate in millipercent
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
   * @param {string} txId transaction ID of the input
   * @param {number} vOut prevout index of the input
   * @param {string} alias on-case sensitive staker alias
   * @param {string} key metadata key
   * @param {number} value metadata value
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
   * @param {string} txId transaction ID of the input
   * @param {number} vOut prevout index of the input
   * @param {string} alias on-case sensitive staker alias
   * @param {string} owner owners compressed pubkey
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
   * @param {number} amount is a real and is rounded to the nearest 0.01
   * @return {Promise<Object>}
   */
  async settxfee(amount) {
    return this.request("settxfee", [
      parseFloat(`${amount}`),
    ]);
  }

  /**
   * Sign a message with the private key of an address
   *
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
   * Sign inputs for raw transaction (serialized, hex-encoded).
   *
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
   * Stop StalthCoin server (and possibly override the detachdb config value).
   *
   * @param {boolean} detach
   * @return {Promise<Object>}
   */
  async stop(detach) {
    return this.request("stop", [!!detach]);
  }

  /**
   * Return information about <XSTaddress>.
   *
   * @param {string} XSTAddress
   * @return {Promise<Object>}
   */
  async validateaddress(XSTAddress) {
    return this.request("validateaddress", [
      XSTAddress,
    ]);
  }

  /**
   * Return information about <XSTpubkey>.
   *
   * @param {string} XSTPubKey
   * @return {Promise<Object>}
   */
  async validatepubkey(XSTPubKey) {
    return this.request("validatepubkey", [
      XSTPubKey,
    ]);
  }

  /**
   * Verify a signed message
   *
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

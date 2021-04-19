# Stealth (ticker symbol XST) Javascript SDK

This is a Javascript SDK library for querying Stealth RPC daemon.

Install:
```shell script
npm install --save stealthjs-lib
```

Stealth features:
 - 5 second block
 - Fee-less transactions
 - Cryptographic private transactions
 - Massive blockchain scalability
 - On-Chain governance
 - Supports smart contracts, Blockchain Oracles and side chains

Learn more about Stealth, the fastest private digital currency at the official website https://stealth.org/

# Usage

```js
const Stealth = require('stealthjs-lib');

const client = new Stealth({
  host: "localhost", // Host for the RPC daemon
  port: 46502, // Port for the RPC daemon
  username: "rpcclientusername", // Username for RPC daemon
  password: "rpcclientpassword", // Password for RPC daemon
  jsonRpc: "2.0", // JSON rpc version
  debug: false, // Turns on logging of the request and response
});

await client.help();
```

# API definition

<a name="request"></a>

### request(method, params) ⇒ <code>Promise.&lt;object&gt;</code>
Make request to any of the RPC functions directly

| Param | Type |
| --- | --- |
| method | <code>string</code> |
| params | <code>Array.&lt;any&gt;</code> |

<a name="addmultisigaddress"></a>

### addmultisigaddress(nRequired, keys, [account]) ⇒ <code>Promise.&lt;Object&gt;</code>
Add a n-required-to-sign multi-signature address to the wallet
each key is an XST address or hex-encoded public key
If [account] is specified, assign address to [account].

| Param | Type | Default |
| --- | --- | --- |
| nRequired | <code>number</code> |  |
| keys | <code>Array.&lt;string&gt;</code> |  |
| [account] | <code>string</code> | <code>""</code> |

<a name="backupwallet"></a>

### backupwallet(destination) ⇒ <code>Promise.&lt;Object&gt;</code>
Safely copies wallet.dat to destination, which can be a directory or a path with filename.

| Param | Type |
| --- | --- |
| destination | <code>string</code> |

<a name="checkwallet"></a>

### checkwallet() ⇒ <code>Promise.&lt;Object&gt;</code>
Check wallet for integrity.
<a name="claimqposbalance"></a>

### claimqposbalance(txId, vOut, amount) ⇒ <code>Promise.&lt;Object&gt;</code>
claimqposbalance <txId> <vOut> <amount>
   <txId> is the transaction ID of the input
   <vOut> is the prevout index of the input
   <amount> is the amount to claim
     Amount is real and rounded to the nearest 0.000001.
     Claim plus change is returned to claimant hashed pubkey

| Param | Type |
| --- | --- |
| txId | <code>string</code> |
| vOut | <code>number</code> |
| amount | <code>number</code> |

<a name="clearwallettransactions"></a>

### clearwallettransactions() ⇒ <code>Promise.&lt;Object&gt;</code>
delete all transactions from wallet - reload with scanforalltxns
Warning: Backup your wallet first!
<a name="createrawtransaction"></a>

### createrawtransaction(transactions, addresses) ⇒ <code>Promise.&lt;Object&gt;</code>
createrawtransaction [{\"txid\":txid,\"vout\":n},...] {address:amount,...}
Create a transaction spending given inputs
(array of objects containing transaction id and output number),
sending to given address(es).
Returns hex-encoded raw transaction.
Note that the transaction's inputs are not signed, and
it is not stored in the wallet or transmitted to the network.

| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Array.&lt;object&gt;</code> | [{"txid":txid,"vOut":n},...] |
| addresses | <code>object</code> | {address:amount,...} |

<a name="decoderawtransaction"></a>

### decoderawtransaction(hex) ⇒ <code>Promise.&lt;Object&gt;</code>
Return a JSON object representing the serialized, hex-encoded transaction.

| Param | Type |
| --- | --- |
| hex | <code>string</code> |

<a name="disablestaker"></a>

### disablestaker(txId, vOut, alias) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> | transaction ID of the input |
| vOut | <code>number</code> | prevout index of the input |
| alias | <code>alias</code> | non-case sensitive staker alias |

<a name="dumpprivkey"></a>

### dumpprivkey(XSTAddress) ⇒ <code>Promise.&lt;Object&gt;</code>
Reveals the private key corresponding to <XSTaddress>.

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |

<a name="enablestaker"></a>

### enablestaker(txId, vOut, alias) ⇒ <code>Promise.&lt;Object&gt;</code>
enablestaker <txId> <vOut> <alias>
   <txId> is the transaction ID of the input
   <vOut> is the prevout index of the input
   <alias> is a non-case sensitive staker alias

| Param | Type |
| --- | --- |
| txId | <code>string</code> |
| vOut | <code>number</code> |
| alias | <code>string</code> |

<a name="encryptwallet"></a>

### encryptwallet(passphrase) ⇒ <code>Promise.&lt;Object&gt;</code>
Encrypts the wallet with <passphrase>

| Param | Type |
| --- | --- |
| passphrase | <code>string</code> |

<a name="exitreplay"></a>

### exitreplay() ⇒ <code>Promise.&lt;Object&gt;</code>
Manually exits registry replay (testnet only).

<a name="getaccount"></a>

### getaccount(XSTAddress) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the account associated with the given address.

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |

<a name="getaccountaddress"></a>

### getaccountaddress(account) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the current XST address for receiving payments to this account.

| Param | Type |
| --- | --- |
| account | <code>string</code> |

<a name="getaddressbalance"></a>

### getaddressbalance(address) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the balance of <address>.

| Param | Type |
| --- | --- |
| address | <code>string</code> |

<a name="getaddressesbyaccount"></a>

### getaddressesbyaccount(account) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the list of addresses for the given account.

| Param | Type |
| --- | --- |
| account | <code>string</code> |

<a name="getaddressinfo"></a>

### getaddressinfo(address) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns info about <address>.

| Param | Type |
| --- | --- |
| address | <code>string</code> |

<a name="getaddressinouts"></a>

### getaddressinouts(address, [start], [max]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns [max] inputs + outputs of <address> beginning with [start]
For example, if [start]=101 and [max]=100 means to
return the second 100 in-outs (if possible).
[start] is the nth in-out (default: 1)
[max] is the max in-outs to return (default: 100)

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  |
| [start] | <code>number</code> | <code>1</code> |
| [max] | <code>number</code> | <code>100</code> |

<a name="getaddressinputs"></a>

### getaddressinputs(address, [start], [max]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns [max] inputs of <address> beginning with [start]
For example, if [start]=101 and [max]=100 means to
return the second 100 inputs (if possible).

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  |
| [start] | <code>number</code> | <code>1</code> |
| [max] | <code>number</code> | <code>100</code> |

<a name="getaddressoutputs"></a>

### getaddressoutputs(address, [start], [max]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns [max] outputs of <address> beginning with [start]
For example, if [start]=101 and [max]=100 means to
return the second 100 outputs (if possible).

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  |
| [start] | <code>number</code> | <code>1</code> |
| [max] | <code>number</code> | <code>100</code> |

<a name="getadjustedtime"></a>

### getadjustedtime() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the Stealth network adjusted time.

<a name="getbalance"></a>

### getbalance(account, [minConf]) ⇒ <code>Promise.&lt;Object&gt;</code>
If [account] is not specified, returns the server's total available balance.
If [account] is specified, returns the balance in the account.

| Param | Type | Default |
| --- | --- | --- |
| account | <code>string</code> |  |
| [minConf] | <code>number</code> | <code>1</code> |

<a name="getbestblockhash"></a>

### getbestblockhash() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the hash of the best block in the longest block chain.
<a name="getblock"></a>

### getblock(hash, [txInfo]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns data needed to construct a block to work on:
 - "version" : block version
 - "previousblockhash" : hash of current highest block
 - "transactions" : contents of non-coinbase transactions that should be included in the next block
 - "coinbaseaux" : data that should be included in coinbase
 - "coinbasevalue" : maximum allowable input to coinbase transaction, including the generation award and transaction fees
 - "target" : hash target
 - "mintime" : minimum timestamp appropriate for next block
 - "curtime" : current timestamp
 - "mutable" : list of ways the block template may be changed
 - "noncerange" : range of valid nonces
 - "sigoplimit" : limit of sigops in blocks
 - "sizelimit" : limit of block size
 - "bits" : compressed target of next block
 - "height" : height of the next block

See https://en.bitcoin.it/wiki/BIP_0022 for full specification.

| Param | Type | Default |
| --- | --- | --- |
| hash | <code>string</code> |  |
| [txInfo] | <code>boolean</code> | <code>false</code> |

<a name="getblockbynumber"></a>

### getblockbynumber(number, [txInfo]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns details of a block with given block-number.

| Param | Type | Default |
| --- | --- | --- |
| number | <code>string</code> |  |
| [txInfo] | <code>boolean</code> | <code>false</code> |

<a name="getblockcount"></a>

### getblockcount() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the number of blocks in the longest block chain

<a name="getblockhash"></a>

### getblockhash(index) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns hash of block in best-block-chain at <index>.

| Param | Type |
| --- | --- |
| index | <code>number</code> |

<a name="getblockinterval"></a>

### getblockinterval(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
Total block interval for the window in seconds

| Param | Type |
| --- | --- |
| period | <code>number</code> |
| windowSize | <code>number</code> |
| windowSpacing | <code>number</code> |

<a name="getblockintervalmean"></a>

### getblockintervalmean(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
RMSD of the block intervals for the window in seconds

| Param | Type |
| --- | --- |
| period | <code>string</code> |
| windowSize | <code>string</code> |
| windowSpacing | <code>string</code> |

<a name="getblockintervalrmsd"></a>

### getblockintervalrmsd(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
RMSD of the block intervals for the window in seconds

| Param | Type |
| --- | --- |
| period | <code>string</code> |
| windowSize | <code>string</code> |
| windowSpacing | <code>string</code> |

<a name="getblockschedule"></a>

### getblockschedule(blocks) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns details of Stealthnodes in the block schedule

| Param | Type |
| --- | --- |
| blocks | <code>string</code> |

<a name="getcheckpoint"></a>

### getcheckpoint() ⇒ <code>Promise.&lt;Object&gt;</code>
Show info of synchronized checkpoint.
<a name="getchildkey"></a>

### getchildkey(extendedKey, child, [networkByte]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns key and address information about the child.

| Param | Type |
| --- | --- |
| extendedKey | <code>string</code> |
| child | <code>number</code> |
| [networkByte] | <code>string</code> |

<a name="getconnectioncount"></a>

### getconnectioncount() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the number of connections to other nodes.

<a name="getdifficulty"></a>

### getdifficulty() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the difficulty as a multiple of the minimum difficulty.

<a name="gethashespersec"></a>

### gethashespersec() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a recent hashes per second performance measurement while generating.

<a name="gethdaccount"></a>

### gethdaccount(extendedKey) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns all transactions for the hdaccount.

| Param | Type |
| --- | --- |
| extendedKey | <code>string</code> |

<a name="gethourlymissed"></a>

### gethourlymissed(hours) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object with an array of numbers that represent number of missed blocks in the last <hours>.

| Param | Type |
| --- | --- |
| hours | <code>number</code> |

<a name="getinfo"></a>

### getinfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing various state info.

<a name="getmininginfo"></a>

### getmininginfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object containing mining-related information.

<a name="getnewaddress"></a>

### getnewaddress([account]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a new XST address for receiving payments.
If [account] is specified (recommended), it is added to the address book
so payments received with the address will be credited to [account].

| Param | Type |
| --- | --- |
| [account] | <code>string</code> |

<a name="getnewestblockbeforetime"></a>

### getnewestblockbeforetime(time) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the hash of the newest block that has a time stamp earlier than <time>
<time> is a unix epoch (seconds)

| Param | Type |
| --- | --- |
| time | <code>number</code> |

<a name="getnewpubkey"></a>

### getnewpubkey([account]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns new public key for coinbase generation.

| Param | Type |
| --- | --- |
| [account] | <code>string</code> |

<a name="getnewstealthaddress"></a>

### getnewstealthaddress([label]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a new StealthAddress for receiving payments anonymously.

| Param | Type |
| --- | --- |
| [label] | <code>string</code> |

<a name="getpeerinfo"></a>

### getpeerinfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns data about each connected network node.

<a name="getpicpowermean"></a>

### getpicopowermean(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an object with attributes: window_start: starting time of each window, number_blocks: number of blocks in each window, pico_power_mean: mean expressed in units of 1e-12 power".

| Param | Type |
| --- | --- |
| period | <code>number</code> |
| windowSize | <code>number</code> |
| windowSpacing | <code>number</code> |


<a name="getqposbalance"></a>

### getqposbalance(pubKey) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns qPoS balance owned by <pubKey>

| Param | Type |
| --- | --- |
| pubKey | <code>string</code> |

<a name="getqposinfo"></a>

### getqposinfo([height]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns exhaustive qPoS information
Optional [height] will get info as of that height (expensive)

| Param | Type |
| --- | --- |
| [height] | <code>number</code> |

<a name="getrawmempool"></a>

### getrawmempool() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns all transaction ids in memory pool.
<a name="getrawtransaction"></a>

### getrawtransaction(txId, [verbose]) ⇒ <code>Promise.&lt;Object&gt;</code>
If verbose=0, returns a string that is
serialized, hex-encoded data for <txId>.
If verbose is non-zero, returns an Object
with information about <txId>.

| Param | Type | Default |
| --- | --- | --- |
| txId | <code>string</code> |  |
| [verbose] | <code>number</code> | <code>0</code> |

<a name="getreceivedbyaccount"></a>

### getreceivedbyaccount(account, [minConf]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.

| Param | Type | Default |
| --- | --- | --- |
| account | <code>string</code> |  |
| [minConf] | <code>number</code> | <code>1</code> |

<a name="getreceivedbyaddress"></a>

### getreceivedbyaddress(XSTAddress, [minConf]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the total amount received by <XSTaddress> in transactions with at least [minconf] confirmations.

| Param | Type | Default |
| --- | --- | --- |
| XSTAddress | <code>string</code> |  |
| [minConf] | <code>number</code> | <code>1</code> |

<a name="getrecentqueue"></a>

### getrecentqueue(blocks) ⇒ <code>Promise.&lt;Object&gt;</code>
<blocks> is the number of blocks to look back. Returns a 1, 0  array, where 1 is hit and 0 is miss. The array is ordered chronologically.

| Param | Type | Default |
| --- | --- | --- |
| blocks | <code>number</code> |  |

<a name="getrichlist"></a>

### getrichlist([start], [max]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the number of addresses with balances greater than [minimum].

| Param | Type | Default |
| --- | --- | --- |
| [start] | <code>number</code> | <code>0</code> |
| [max] | <code>number</code> | <code>10</code> |

<a name="getrichlistsize"></a>

### getrichlistsize([minimum]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the number of addresses with balances greater than [minimum].

| Param | Type | Default |
| --- | --- | --- |
| [minimum] | <code>number</code> | <code>0</code> |

<a name="getstakersbyid"></a>

### getstakersbyid([disqualified]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns details of StealthNodes by ascending id. Optional [disqualified=false] includes disqualified stakers if true.

| Param | Type | Default |
| --- | --- | --- |
| [disqualified] | <code>bool</code> | <code>false</code> |

<a name="getstakerid"></a>

### getstakerid(alias) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the id of the staker registered with <alias>.

| Param | Type |
| --- | --- |
| alias | <code>string</code> |

<a name="getstakerinfo"></a>

### getstakerinfo(alias) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns exhaustive information about the qPoS registry.
<alias> is a non-case sensitive staker alias.

| Param | Type |
| --- | --- |
| alias | <code>string</code> |

<a name="getstakerprice"></a>

### getstakerprice() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the current staker price.

<a name="getstakerpriceinfo"></a>

### getstakerpriceinfo() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns staker price history and ROI information.
<stakers> is the number of stakers for which to calculate prices.

| Param | Type |
| --- | --- |
| stakers | <code>number</code> |

<a name="getstakersbyweight"></a>

### getstakersbyweight() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns details of Stealthnodes in descending weight.

<a name="getstakersummary"></a>

### getstakersummary() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a summary of the state and activity of Stealthnodes.

<a name="getsubsidy"></a>

### getsubsidy([nTarget]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns proof-of-work subsidy value for the specified value of target.

| Param | Type |
| --- | --- |
| [nTarget] | <code>string</code> |

<a name="gettransaction"></a>

### gettransaction(txId) ⇒ <code>Promise.&lt;Object&gt;</code>
Get detailed information about <txId>

| Param | Type |
| --- | --- |
| txId | <code>string</code> |

<a name="gettxvolume"></a>

### gettxvolume(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
Number of transactions in each window

| Param | Type |
| --- | --- |
| period | <code>number</code> |
| windowSize | <code>number</code> |
| windowSpacing | <code>number</code> |

<a name="getxstvolume"></a>

### getxstvolume(period, windowSize, windowSpacing) ⇒ <code>Promise.&lt;Object&gt;</code>
Amount of xst transferred in each window

| Param | Type |
| --- | --- |
| period | <code>number</code> |
| windowSize | <code>number</code> |
| windowSpacing | <code>number</code> |

<a name="help"></a>

### help(command) ⇒ <code>Promise.&lt;Object&gt;</code>
List commands, or get help for a command.

| Param | Type |
| --- | --- |
| command | <code>string</code> |

<a name="importprivkey"></a>

### importprivkey(XSTPrivateKey, [label]) ⇒ <code>Promise.&lt;Object&gt;</code>
Adds a private key (as returned by dumpprivkey) to your wallet.

| Param | Type |
| --- | --- |
| XSTPrivateKey | <code>string</code> |
| [label] | <code>string</code> |

<a name="importstealthaddress"></a>

### importstealthaddress(scanSecret, spendSecret, [label]) ⇒ <code>Promise.&lt;Object&gt;</code>
Import an owned StealthAddresses.

| Param | Type |
| --- | --- |
| scanSecret | <code>string</code> |
| spendSecret | <code>string</code> |
| [label] | <code>string</code> |

<a name="keypoolrefill"></a>

### keypoolrefill([newSize]) ⇒ <code>Promise.&lt;Object&gt;</code>
Fills the keypool.

| Param | Type |
| --- | --- |
| [newSize] | <code>string</code> |

<a name="listaccounts"></a>

### listaccounts([minConf]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns Object that has account names as keys, account balances as values.

| Param | Type | Default |
| --- | --- | --- |
| [minConf] | <code>number</code> | <code>1</code> |

<a name="listaddressgroupings"></a>

### listaddressgroupings() ⇒ <code>Promise.&lt;Object&gt;</code>
Lists groups of addresses which have had their common ownership
made public by common use as inputs or as the resulting change
in past transactions
<a name="listreceivedbyaccount"></a>

### listreceivedbyaccount([minConf], [includeEmpty]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an array of objects containing:
 - "account" : the account of the receiving addresses
 - "amount" : total amount received by addresses with this account
 - "confirmations" : number of confirmations of the most recent transaction included

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [minConf] | <code>number</code> | <code>1</code> | minimum number of confirmations before payments are included |
| [includeEmpty] | <code>boolean</code> | <code>false</code> | whether to include addresses that haven't received any payments |

<a name="listreceivedbyaddress"></a>

### listreceivedbyaddress([minConf], [includeEmpty]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns an array of objects containing:
  - "address" : receiving address
  - "account" : the account of the receiving address
  - "amount" : total amount received by the address
  - "confirmations" : number of confirmations of the most recent transaction included

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [minConf] | <code>number</code> | <code>1</code> | minimum number of confirmations before payments are included |
| [includeEmpty] | <code>boolean</code> | <code>false</code> | whether to include addresses that haven't received any payments |

<a name="listsinceblock"></a>

### listsinceblock([blockHash], [targetConfirmations]) ⇒ <code>Promise.&lt;Object&gt;</code>
Get all transactions in blocks since block [blockHash], or all transactions if omitted

| Param | Type | Default |
| --- | --- | --- |
| [blockHash] | <code>string</code> |  |
| [targetConfirmations] | <code>number</code> | <code>0</code> |

<a name="liststealthaddresses"></a>

### liststealthaddresses(showSecrets) ⇒ <code>Promise.&lt;Object&gt;</code>
List owned StealthAddresses.

| Param | Type |
| --- | --- |
| showSecrets | <code>string</code> |

<a name="listtransactions"></a>

### listtransactions(account, count, from) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns up to [count] most recent transactions skipping the first [from] transactions for account [account].

| Param | Type | Default |
| --- | --- | --- |
| account | <code>string</code> |  |
| count | <code>number</code> | <code>10</code> |
| from | <code>number</code> | <code>0</code> |

<a name="listunspent"></a>

### listunspent([minConf], [maxConf], [txOuts]) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns array of unspent transaction outputs
with between minConf and maxConf (inclusive) confirmations.
Optionally filtered to only include txOuts paid to specified addresses.
Results are an array of Objects, each of which has:
{txId, vOut, scriptPubKey, amount, confirmations}

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [minConf] | <code>number</code> | <code>1</code> |  |
| [maxConf] | <code>number</code> | <code>9999999</code> |  |
| [txOuts] | <code>Array.&lt;string&gt;</code> |  | ["address",...] |

<a name="makekeypair"></a>

### makekeypair([prefix]) ⇒ <code>Promise.&lt;Object&gt;</code>
Make a public/private key pair.
[prefix] is optional preferred prefix for the public key.

| Param | Type |
| --- | --- |
| [prefix] | <code>string</code> |

<a name="move"></a>

### move(fromAccount, toAccount, amount, [minConf], [comment]) ⇒ <code>Promise.&lt;Object&gt;</code>
Move from one account in your wallet to another.

| Param | Type | Default |
| --- | --- | --- |
| fromAccount | <code>string</code> |  |
| toAccount | <code>string</code> |  |
| amount | <code>number</code> |  |
| [minConf] | <code>number</code> | <code>1</code> |
| [comment] | <code>string</code> | <code>""</code> |

<a name="purchasestaker"></a>

### purchasestaker(txId, vOut, alias, owner, [amount], [delegate], [controller], [payout]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> |  |
| vOut | <code>number</code> |  |
| alias | <code>string</code> |  |
| owner | <code>string</code> |  |
| [amount] | <code>number</code> | is is the amount to pay If the amount is not specified it will be calculated automatically |
| [delegate] | <code>string</code> | and [controller] are compressed pubkeys If delegate and controller are not specified then they are taken from owner. |
| [controller] | <code>string</code> |  |
| [payout] | <code>number</code> | is in percentage, and is rounded to the nearest thousandths of a percent Either just the owner key or all 3 keys plus the payout must be specified. |

<a name="repairwallet"></a>

### repairwallet() ⇒ <code>Promise.&lt;Object&gt;</code>
Repair wallet if checkwallet reports any problem.
<a name="resendtx"></a>

### resendtx() ⇒ <code>Promise.&lt;Object&gt;</code>
Re-send unconfirmed transactions.
<a name="reservebalance"></a>

### reservebalance([reserve], [amount]) ⇒ <code>Promise.&lt;Object&gt;</code>
Set reserve amount not participating in network protection.
If no parameters provided current setting is printed.

| Param | Type | Default |
| --- | --- | --- |
| [reserve] | <code>boolean</code> |  |
| [amount] | <code>number</code> | <code>0</code> |

<a name="scanforalltxns"></a>

### scanforalltxns([fromHeight]) ⇒ <code>Promise.&lt;Object&gt;</code>
Scan blockchain for owned transactions.

| Param | Type | Default |
| --- | --- | --- |
| [fromHeight] | <code>number</code> | <code>0</code> |

<a name="scanforstealthtxns"></a>

### scanforstealthtxns([fromHeight]) ⇒ <code>Promise.&lt;Object&gt;</code>
Scan blockchain for owned stealth transactions.

| Param | Type | Default |
| --- | --- | --- |
| [fromHeight] | <code>number</code> | <code>0</code> |

<a name="sendalert"></a>

### sendalert(message, privateKey, minVer, maxVer, priority, id, [cancelUpTo]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | alert text message |
| privateKey | <code>string</code> | hex string of alert master private key |
| minVer | <code>string</code> | minimum applicable internal client version |
| maxVer | <code>string</code> | maximum applicable internal client version |
| priority | <code>string</code> | integer priority number |
| id | <code>string</code> | alert id (id=0 canels *all* alerts except id=1 alerts) |
| [cancelUpTo] | <code>string</code> | cancels all alert id's up to this number |

<a name="sendfrom"></a>

### sendfrom(fromAccount, toXSTAddress, amount, [minConf], [comment], [commentTo]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromAccount | <code>string</code> |  |  |
| toXSTAddress | <code>string</code> |  |  |
| amount | <code>number</code> |  | real and is rounded to the nearest 0.000001 |
| [minConf] | <code>number</code> | <code>1</code> |  |
| [comment] | <code>string</code> | <code>""</code> |  |
| [commentTo] | <code>string</code> | <code>""</code> |  |

<a name="sendmany"></a>

### sendmany(fromAccount, addressAmount, [minConf], [comment]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromAccount | <code>string</code> |  |  |
| addressAmount | <code>object</code> |  | {address: amount,...} amounts are double-precision floating point numbers |
| [minConf] | <code>number</code> | <code>1</code> |  |
| [comment] | <code>string</code> | <code>""</code> |  |

<a name="sendrawtransaction"></a>

### sendrawtransaction(hex) ⇒ <code>Promise.&lt;Object&gt;</code>
Submits raw transaction (serialized, hex-encoded) to local node and network.

| Param | Type |
| --- | --- |
| hex | <code>string</code> |

<a name="sendtoaddress"></a>

### sendtoaddress(XSTAddress, amount, [comment], [commentTo]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| XSTAddress | <code>string</code> |  |  |
| amount | <code>number</code> |  | real and is rounded to the nearest 0.000001 |
| [comment] | <code>string</code> | <code>""</code> |  |
| [commentTo] | <code>string</code> | <code>""</code> |  |

<a name="sendtostealthaddress"></a>

### sendtostealthaddress(address, amount, [narration], [comment], [commentTo]) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  |  |
| amount | <code>number</code> |  | real and is rounded to the nearest 0.000001 |
| [narration] | <code>string</code> | <code>""</code> |  |
| [comment] | <code>string</code> | <code>""</code> |  |
| [commentTo] | <code>string</code> | <code>""</code> |  |

<a name="setaccount"></a>

### setaccount(XSTAddress, account) ⇒ <code>Promise.&lt;Object&gt;</code>
Sets the account associated with the given address.

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |
| account | <code>string</code> |

<a name="setstakercontroller"></a>

### setstakercontroller(txId, vOut, alias, controller) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> | transaction ID of the input |
| vOut | <code>number</code> | prevout index of the input |
| alias | <code>string</code> | non-case sensitive staker alias |
| controller | <code>string</code> | compressed pubkey |

<a name="setstakerdelegate"></a>

### setstakerdelegate(txId, vOut, alias, delegate, payout) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> | transaction ID of the input |
| vOut | <code>number</code> | prevout index of the input |
| alias | <code>string</code> | on-case sensitive staker alias |
| delegate | <code>string</code> | compressed pubkey |
| payout | <code>string</code> | fraction of block rewards to pay to the delegate in millipercent |

<a name="setstakermeta"></a>

### setstakermeta(txId, vOut, alias, key, value) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> | transaction ID of the input |
| vOut | <code>number</code> | prevout index of the input |
| alias | <code>string</code> | on-case sensitive staker alias |
| key | <code>string</code> | metadata key |
| value | <code>number</code> | metadata value |

<a name="setstakerowner"></a>

### setstakerowner(txId, vOut, alias, owner) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| txId | <code>string</code> | transaction ID of the input |
| vOut | <code>number</code> | prevout index of the input |
| alias | <code>string</code> | on-case sensitive staker alias |
| owner | <code>string</code> | owners compressed pubkey |

<a name="settxfee"></a>

### settxfee(amount) ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | is a real and is rounded to the nearest 0.01 |

<a name="signmessage"></a>

### signmessage(XSTAddress, message) ⇒ <code>Promise.&lt;Object&gt;</code>
Sign a message with the private key of an address

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |
| message | <code>string</code> |

<a name="signrawtransaction"></a>

### signrawtransaction(hex, transactions, privateKeys, [signHashTypes]) ⇒ <code>Promise.&lt;Object&gt;</code>
Sign inputs for raw transaction (serialized, hex-encoded).

| Param | Type | Default |
| --- | --- | --- |
| hex | <code>string</code> |  |
| transactions | <code>Array.&lt;object&gt;</code> |  |
| privateKeys | <code>Array.&lt;string&gt;</code> |  |
| [signHashTypes] | <code>string</code> | <code>&quot;\&quot;ALL\&quot;&quot;</code> |

<a name="stop"></a>

### stop(detach) ⇒ <code>Promise.&lt;Object&gt;</code>
Stop StalthCoin server (and possibly override the detachdb config value).

| Param | Type |
| --- | --- |
| detach | <code>boolean</code> |

<a name="validateaddress"></a>

### validateaddress(XSTAddress) ⇒ <code>Promise.&lt;Object&gt;</code>
Return information about <XSTaddress>.

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |

<a name="validatepubkey"></a>

### validatepubkey(XSTPubKey) ⇒ <code>Promise.&lt;Object&gt;</code>
Return information about <XSTpubkey>.

| Param | Type |
| --- | --- |
| XSTPubKey | <code>string</code> |

<a name="verifymessage"></a>

### verifymessage(XSTAddress, signature, message) ⇒ <code>Promise.&lt;Object&gt;</code>
Verify a signed message

| Param | Type |
| --- | --- |
| XSTAddress | <code>string</code> |
| signature | <code>string</code> |
| message | <code>string</code> |

<a name="getcharacterspg"></a>

### getcharacterspg(page, perPage, ordering) ⇒ <code>Promise.&lt;Object&gt;</code>
Verify a signed message

| Param | Type |
| --- | --- |
| page | <code>nubmer</code> |
| perPage | <code>nubmer</code> |
| ordering | <code>boolean</code> |

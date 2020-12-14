'use strict';

let Blockchain = require('./blockchain.js');

/**
 * Mixes in shared behavior between clients and miners for handling PoU transactions.
 */
module.exports = {
  /**
   * In the PoU model, we add the usage index.
   * We also add a 'FROM' field which is an array of history of the chain of transactions.
   * All the different arrays represent from where the money has been circulated from.
   *
   * We also add a 'TO' map, which contains information about who the client send money to and how many times they have done so.
   * Also, to monitor the frequency of client transactions, we add a timestamp property.
   */
  setupPoUClient: function () {
    this.timestamp = null;

    // To be removed.
    // this.usageIndex = 0;
    // this.from = [];
    // this.to = new Map();
  },

  // index() {
  //   return this.usageIndex;
  // },
};

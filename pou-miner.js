'use strict';

let Miner = require('./miner.js');

let PoUMixin = require('./pou-mixin.js');

/**
 * A PoUMiner is
 */
module.exports = class PoUMiner extends (
  Miner
) {
  /**
   * Extends miner with PoU support, including setting up a wallet.
   *
   * @constructor
   * @param  {...any} args - Arguments needed for Miner constructor.
   */
  constructor(...args) {
    super(...args);

    // Mixing in support for PoU.
    Object.assign(this, PoUMixin);

    this.setupPoUClient();
  }
};

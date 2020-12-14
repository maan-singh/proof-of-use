'use strict';

let Client = require('./client.js');

let PoUMixin = require('./pou-mixin.js');

/**
 * A PoUClient is capable of having an index that is set looking at daily activity like usage and also if they spend the money to different people or not.
 */
module.exports = class PoUClient extends (
  Client
) {
  /**
   * Extends client with PoU support, including setting up a wallet.
   *
   * @constructor
   * @param  {...any} args - Arguments needed for Client constructor.
   */
  constructor(...args) {
    super(...args);

    // Adding methods from pou-mixin.js to clients.
    Object.assign(this, PoUMixin);

    this.setupPoUClient();
  }
};

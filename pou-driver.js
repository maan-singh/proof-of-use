'use strict';

let Blockchain = require('./blockchain.js');
let PoUBlock = require('./pou-block.js');
let PoUClient = require('./pou-client.js');
let PoUMiner = require('./pou-miner.js');
let Transaction = require('./transaction.js');

let FakeNet = require('./fakeNet.js');

console.log('Starting simulation.  This may take a moment...');

let fakeNet = new FakeNet();

// Clients
let alice = new PoUClient({ name: 'Alice', net: fakeNet });
let bob = new PoUClient({ name: 'Bob', net: fakeNet });
let charlie = new PoUClient({ name: 'Charlie', net: fakeNet });

// Miners
let minnie = new PoUMiner({ name: 'Minnie', net: fakeNet });
let mickey = new PoUMiner({ name: 'Mickey', net: fakeNet });

// Creating genesis block
let genesis = Blockchain.makeGenesis({
  blockClass: PoUBlock,
  transactionClass: Transaction,
  clientBalanceMap: new Map([
    [alice, 200],
    [bob, 200],
    [charlie, 200],
    [minnie, 200],
    [mickey, 200],
  ]),
  clientKeyMap: new Map([
    [alice.address, alice],
    [bob.address, bob],
    [charlie.address, charlie],
    [minnie.address, minnie],
    [mickey.address, mickey],
  ]),
  userProps: new Map([
    [
      alice,
      {
        from: [],
        to: new Map(),
      },
    ],
    [
      bob,
      {
        from: [],
        to: new Map(),
      },
    ],
    [
      charlie,
      {
        from: [],
        to: new Map(),
      },
    ],
    [
      minnie,
      {
        from: [],
        to: new Map(),
      },
    ],
    [
      mickey,
      {
        from: [],
        to: new Map(),
      },
    ],
  ]),
  usageIndexsMap: new Map([
    [alice.address, 0],
    [bob.address, 0],
    [charlie.address, 0],
    [minnie.address, 0],
    [mickey.address, 0],
  ]),
});

// // Late miner - Donald has more mining power, represented by the miningRounds.
// // (Mickey and Minnie have the default of 2000 rounds).
// let donald = new PoUMiner({
//   name: 'Donald',
//   net: fakeNet,
//   startingBlock: genesis,
//   miningRounds: 3000,
// });

function showBalances(client) {
  console.log(`Alice has ${client.lastBlock.balanceOf(alice.address)} gold.`);
  console.log(`Bob has ${client.lastBlock.balanceOf(bob.address)} gold.`);
  console.log(
    `Charlie has ${client.lastBlock.balanceOf(charlie.address)} gold.`
  );
  console.log(`Minnie has ${client.lastBlock.balanceOf(minnie.address)} gold.`);
  console.log(`Mickey has ${client.lastBlock.balanceOf(mickey.address)} gold.`);
  //   console.log(`Donald has ${client.lastBlock.balanceOf(donald.address)} gold.`);
}

function showIndexes(client) {
  console.log(`Alice's index: ${client.lastBlock.indexOf(alice.address)}`);
  console.log(`Bob's index: ${client.lastBlock.indexOf(bob.address)}`);
  console.log(`Charlie's index: ${client.lastBlock.indexOf(charlie.address)}`);
  console.log(`Minnie's index: ${client.lastBlock.indexOf(minnie.address)}`);
  console.log(`Mickey's index: ${client.lastBlock.indexOf(mickey.address)}`);
}

function showUserProps(client) {
  console.log(`Alice's user props: ${client.lastBlock.userPropsOf(alice)}`);
  console.log(`Bob's user props: ${client.lastBlock.userPropsOf(bob)}`);
  console.log(`Charlie's user props: ${client.lastBlock.userPropsOf(charlie)}`);
  console.log(`Minnie's user props: ${client.lastBlock.userPropsOf(minnie)}`);
  console.log(`Mickey's user props: ${client.lastBlock.userPropsOf(mickey)}`);
}

// Showing the initial balances from Alice's perspective, for no particular reason.
console.log('Initial balances:');
showBalances(alice);

fakeNet.register(alice, bob, charlie, minnie, mickey);

// Miners start mining.
minnie.initialize();
mickey.initialize();

// Alice transfers some money to Bob.
console.log(`Alice is transferring 100 gold to ${bob.address}`);
alice.postTransaction([{ amount: 100, address: bob.address }]);

console.log(`Bob is transferring 50 gold to ${charlie.address}`);
bob.postTransaction([{ amount: 50, address: charlie.address }]);

console.log(`Charlie is transferring 20 gold to ${mickey.address}`);
charlie.postTransaction([{ amount: 20, address: mickey.address }]);

// setTimeout(() => {
//   console.log();
//   console.log(`Bob is transferring 50 gold to ${charlie.address}`);
//   console.log();
//   bob.postTransaction([{ amount: 50, address: charlie.address }]);
// }, 2500);

// setTimeout(() => {
//   console.log();
//   console.log(`Charlie is transferring 20 gold to ${mickey.address}`);
//   console.log();
//   charlie.postTransaction([{ amount: 20, address: mickey.address }]);
// }, 5000);

// setTimeout(() => {
//   console.log();
//   console.log('***Starting a late-to-the-party miner***');
//   console.log();
//   fakeNet.register(donald);
//   donald.initialize();
// }, 2000);

// Print out the final balances after it has been running for some time.
setTimeout(() => {
  console.log();
  console.log(
    `Minnie has a chain of length ${minnie.currentBlock.chainLength}:`
  );

  console.log();
  console.log(
    `Mickey has a chain of length ${mickey.currentBlock.chainLength}:`
  );

  //   console.log();
  //   console.log(
  //     `Donald has a chain of length ${donald.currentBlock.chainLength}:`
  //   );

  console.log();
  console.log("Final balances (Minnie's perspective):");
  showBalances(minnie);

  console.log();
  console.log("Final balances (Alice's perspective):");
  showBalances(alice);

  console.log();
  console.log("Indexes (Minnie's perspective):");
  showIndexes(minnie);

  console.log();
  console.log("Indexes (Alice's perspective):");
  showIndexes(alice);

  console.log();
  console.log("User Props (Minnie's perspective):");
  showUserProps(minnie);

  console.log();
  console.log("User Props (Alice's perspective):");
  showUserProps(alice);

  //   console.log();
  //   console.log("Final balances (Donald's perspective):");
  //   showBalances(donald);

  process.exit(0);
}, 10000);

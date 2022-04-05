import sdk from './1-initialize-sdk.js';

// This is our governance contract.
const vote = sdk.getVote('0x023aA68F0d4A07b42C476Dd9187563ea829a4f5E');

// This is our ERC-20 contract.
const token = sdk.getToken('0x9420aFBaa97C592F25a0c5822A3F55C39a619D93');

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant('minter', vote.getAddress());

    console.log(
      'Successfully gave vote contract permissions to act on token contract'
    );
  } catch (error) {
    console.error(
      'failed to grant vote contract permissions on token contract',
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(vote.getAddress(), percent90);

    console.log(
      '✅ Successfully transferred ' + percent90 + ' tokens to vote contract'
    );
  } catch (err) {
    console.error('failed to transfer tokens to vote contract', err);
  }
})();

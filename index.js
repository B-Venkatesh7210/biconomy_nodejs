const { ethers } = require("ethers");
const { createSmartAccountClient } = require("@biconomy/account");
const customTransport = require("viem").custom;

// Replace these with your actual values
const privateKey = "YOUR_PRIVATE_KEY"; // Securely manage this key
const providerUrl = "https://rpc.ankr.com/polygon_mumbai";
const chainId = 80001; // Polygon Mumbai Chain ID
const biconomyBundlerUrl = `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`;
const biconomyPaymasterApiKey = "YOUR_BICONOMY_PAYMASTER_API_KEY";

async function connectBackend() {
  // Create a wallet instance using a private key and provider
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Assuming you have a mechanism to use a custom transport or similar to 'viem' in a backend scenario
  const customEthereumObject = customTransport(wallet);

  // Create a smart account client with the wallet as the signer
  const smartAccount = await createSmartAccountClient({
    signer: wallet,
    bundlerUrl: biconomyBundlerUrl,
    biconomyPaymasterApiKey: biconomyPaymasterApiKey,
    rpcUrl: providerUrl,
    chainId: chainId, // This might need to be adjusted based on how you integrate with viem in a backend context
    transport: customEthereumObject,
  });

  const address = await smartAccount.getAccountAddress();
  console.log("Smart Account Address", address);
}

connectBackend().catch(console.error);

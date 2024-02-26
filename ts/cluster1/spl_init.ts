import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      6
    );
    console.log(`The unique identifier of the token is: ${mint.toBase58()}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();

// HQVMWbcqVxpZfhQ6wndwQtMh64m5Y7HE483di9ysoj2v

// CPiQwRDXVT1tpxcXpvQs6r6cV4TaVcTkdGJArwAowxPC
// https://explorer.solana.com/address/CPiQwRDXVT1tpxcXpvQs6r6cV4TaVcTkdGJArwAowxPC?cluster=devnet

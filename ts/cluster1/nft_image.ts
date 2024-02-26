import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createIrysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");
const irysUploader = createIrysUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    const image = await readFile("./images/generug.png");
    const nft_image = createGenericFile(image, "generug");

    const [myUri] = await irysUploader.upload([nft_image]);

    console.log(myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

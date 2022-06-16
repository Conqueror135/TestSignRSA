const Forge = require("node-forge");
const {save,getById, getAll, getByPublicKey, update} = require('../models/pkiModel');
async function createPKI() {
  const keys = await new Promise((resolve, reject) =>
    Forge.pki.rsa.generateKeyPair(1024, (error, keys) => {
      if (error) reject(error);
      resolve(keys);
    }));
    const publicKey = Forge.pki.publicKeyToPem(keys.publicKey);
    const privateKey = Forge.pki.privateKeyToPem(keys.privateKey);
    const status = 1;
    await save({publicKey, status});
    return {
        "keys": {
            "publicKey" : publicKey,
            "privateKey" : privateKey
        }
    };
}
async function sign(message, publickKey, privateKey){

    const isExist = await getByPublicKey(publickKey);
    if(isExist){
        if(isExist.status === 1){
            const priv = Forge.pki.privateKeyFromPem(privateKey);
            let pss = Forge.pss.create({
                md: Forge.md.sha512.create(),
                mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
                saltLength: 20
              });
            let md = Forge.md.sha512.create();
            md.update(message);
            const signature = Forge.util.encode64(priv.sign(md, pss));
            return {
                "SIGN" : {
                    "message" : message,
                    "publicKey" : publickKey,
                    "signature" : signature
                }
            };
        }
    }
    return "The public key is invalid or revoked!";
}
async function verify(SIGN){
    const message = SIGN.message;
    const publicKey = Forge.pki.publicKeyFromPem(SIGN.publicKey);
    const signature = SIGN.signature;
    try {
        pss = Forge.pss.create({
            md: Forge.md.sha512.create(),
            mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
            saltLength: 20
          });
          md = Forge.md.sha512.create();
          md.update(message);

        let verified = publicKey.verify(
            md.digest().getBytes(),
            Forge.util.decode64(signature),
            pss
        );

        return verified;
    } catch (error) {
        return false;
    }
}
async function getPKIs(){
    return await getAll();
}
async function revoke(publicKey){
    let oldPKI = await getByPublicKey(publicKey);
    if(oldPKI){
        if(oldPKI.status === 1){
            oldPKI.status = 0;
            await update(oldPKI);
            return `${publicKey} is revoked!`;
        }else{
            return "The public key is revoked!";
        }
    }
    return "The public key is invalid or not exist!";
}
module.exports = {createPKI, getPKIs, sign, verify, revoke};
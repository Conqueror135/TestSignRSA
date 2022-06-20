const Forge = require("node-forge");
const {
  save,
  getById,
  getAll,
  getByPublicKey,
  update,
  getPkisByIdOwner,
  getMaxVerPkiByIdOwner,
} = require("../models/pkiModel");

let createPKI = async (req, res) => {
  if (req.jwtDecoded) {
    const idOwner = req.jwtDecoded.data._id;
    const ListPkiByIdOwner = await getPkisByIdOwner(idOwner);
    const CurrentSizeListPki = ListPkiByIdOwner.length;

    let count = 0;
    let ver = 0;
    if (CurrentSizeListPki > 0) {
      for (const pki of ListPkiByIdOwner) {
        if (pki.status == 0) {
          count++;
        }
      }
    }
    if (count == CurrentSizeListPki) {
      ver = CurrentSizeListPki;
    }
    if (CurrentSizeListPki == 0 || count == CurrentSizeListPki) {
      const keys = await new Promise((resolve, reject) =>
        Forge.pki.rsa.generateKeyPair(1024, (error, keys) => {
          if (error) reject(error);
          resolve(keys);
        })
      );

      const publicKey = Forge.pki.publicKeyToPem(keys.publicKey);
      const privateKey = Forge.pki.privateKeyToPem(keys.privateKey);
      const status = 1;

      await save({ idOwner, publicKey, status, ver });
      return res.status(200).json({
        keys: {
          publicKey: publicKey,
          privateKey: privateKey,
          ver: ver,
        },
      });
    } else {
      return res.status(403).send({
        message: "Unqualified!",
      });
    }
  } else {
    return res.status(403).send({
      message: "The token is invalid or revoked!",
    });
  }
};

let sign = async (req, res) => {
  const body = req.body;
  const message = body.message;
  const publicKey = body.publicKey;
  const privateKey = body.privateKey;
  const isExist = await getByPublicKey(publicKey);
  if (isExist) {
    if (isExist.status === 1) {
      const priv = Forge.pki.privateKeyFromPem(privateKey);
      let pss = Forge.pss.create({
        md: Forge.md.sha512.create(),
        mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
        saltLength: 20,
      });
      let md = Forge.md.sha512.create();
      md.update(message);
      const signature = Forge.util.encode64(priv.sign(md, pss));
      return res.status(200).json({
        SIGN: {
          message: message,
          publicKey: publicKey,
          signature: signature,
        },
      });
    }
  }
  return res.status(403).send({
    message: "The public key is invalid or revoked!",
  });
};

let verify = async (req, res) => {
  const body = req.body;
  const SIGN = body.SIGN;
  const message = SIGN.message;
  const publicKey = Forge.pki.publicKeyFromPem(SIGN.publicKey);
  const signature = SIGN.signature;
  try {
    pss = Forge.pss.create({
      md: Forge.md.sha512.create(),
      mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
      saltLength: 20,
    });
    md = Forge.md.sha512.create();
    md.update(message);

    let verified = publicKey.verify(
      md.digest().getBytes(),
      Forge.util.decode64(signature),
      pss
    );

    return res.status(200).json({ verified });
  } catch (error) {
    return res.status(500).send(error);
  }
};

let getPKIs = async (req, res) => {
  const pkis = await getAll();
  return res.status(200).json(pkis);
};

let revoke = async (req, res) => {
  const body = req.body;
  const publicKey = body.publicKey;
  let oldPKI = await getByPublicKey(publicKey);
  if (oldPKI) {
    if (oldPKI.status == 1) {
      oldPKI.status = 0;
      await update(oldPKI);
      return res.status(200).send({
        message: `${publicKey} is revoked!`,
      });
    } else {
      return res.status(403).send({
        message: "The public key is revoked!",
      });
    }
  }
  return res.status(403).send({
    message: "The public key is invalid or not exist!",
  });
};
module.exports = {
  createPKI: createPKI,
  getPKIs: getPKIs,
  sign: sign,
  verify: verify,
  revoke: revoke,
};

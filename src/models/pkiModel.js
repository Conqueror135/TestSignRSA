const pkis = require("./index").db("myFirstDatabase").collection("PKIs");
const ObjectId = require("mongodb").ObjectId;
const save = async ({ idOwner, publicKey, status, ver }) => {
  await pkis.insertOne({ idOwner, publicKey, status, ver });
  return;
};
const getAll = async () => {
  return await pkis.find().toArray();
};
const getById = async (id) => {
  return await pkis.findOne({ _id: ObjectId(id) });
};
const getByPublicKey = async (publicKey) => {
  return await pkis.findOne({ publicKey: publicKey });
};
const update = async ({ _id, idOwner, publicKey, status, ver }) => {
  await pkis.replaceOne(
    { _id: ObjectId(_id.toString()) },
    { idOwner, publicKey, status, ver }
  );
};
const getPkisByIdOwner = async (id) => {
  return await pkis.find({ idOwner: id }).toArray();
};
const getMaxVerPkiByIdOwner = async (id) => {
  return await pkis
    .findOne({ idOwner: id, status: 1 })
    .sort({ ver: -1 })
    .limit(1);
};

module.exports = {
  save,
  getById,
  getAll,
  getByPublicKey,
  update,
  getPkisByIdOwner,
  getMaxVerPkiByIdOwner,
};

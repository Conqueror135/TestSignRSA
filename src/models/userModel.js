const user = require("./index").db("myFirstDatabase").collection("Users");
const ObjectId = require("mongodb").ObjectId;
const save = async (username, password, role) => {
  await user.insertOne({ username, password, role });
  return;
};
const getAll = async () => {
  return await user.find().toArray();
};
const getById = async (id) => {
  return await user.findOne({ _id: ObjectId(id) });
};
const getByUsername = async (username) => {
  return await user.findOne({ username: username });
};
const updateUser = async (id, username, password, role) => {
  return await user.replaceOne(
    { _id: ObjectId(id) },
    { username, password, role }
  );
};
const deleteByID = async (id) => {
  return await user.deleteOne({ _id: ObjectId(id) });
};
module.exports = { save, getAll, getByUsername, updateUser, deleteByID };

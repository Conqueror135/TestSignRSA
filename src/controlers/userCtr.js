const {
  getAll,
  getByUsername,
  updateUser,
  deleteByID,
} = require("../models/userModel");

const modifyPermissions = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const newRole = body.newRole;
  if (username && newRole) {
    const user = await getByUsername(username);
    await updateUser(user._id, user.username, user.password, newRole);
    return res.status(200).json({ username: username, role: newRole });
  } else {
    return res.status(403).send({
      message: "Username is not Found!",
    });
  }
};
const getUsers = async (req, res) => {
  const users = await getAll();
  return res.status(200).json({ users });
};
const deleteUser = async (req, res) => {
  const { _id } = req.params;
  if (_id) {
    await deleteByID(_id);
    return res.status(201).send({
      message: "Deleted!",
    });
  } else {
    return res.status(403).send({
      message: "Id is not Found!",
    });
  }
};
module.exports = {
  modifyPermissions: modifyPermissions,
  getUsers: getUsers,
  deleteUser: deleteUser,
};

const user = require('./index').db('myFirstDatabase').collection('PKIs');
const ObjectId = require('mongodb').ObjectId;
const save = async({publicKey, status})=>{
    await  user.insertOne({publicKey, status});
    return;
}
const getAll = async () =>{
    return await user.find().toArray();
}
const getById = async id =>{
    return await user.findOne({_id: ObjectId(id)});
}
const getByPublicKey = async (publicKey) =>{
    return await user.findOne({publicKey: publicKey});
}
const update = async ({_id, publicKey, status}) =>{

    await user.replaceOne({_id:ObjectId(_id.toString())},{ publicKey, status});
}
module.exports = {save,getById, getAll, getByPublicKey, update};
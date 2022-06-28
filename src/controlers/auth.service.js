const Joi = require('joi');

const schema =  Joi.object({
    user:{
        username: Joi.string().alphanum().min(3).max(30).empty('ssss').required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    },
    data:{
        IdUser: Joi.string().required(),
        Role: Joi.string().required().valid('Endorser','Admin', 'Producer')
    }
  

});
module.exports= schema;
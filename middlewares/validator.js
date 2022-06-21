const Joi = require('joi')


//sign up form data validation 
const signUpValidate = (requestData) =>{
schema = Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})
return schema.validate(requestData)
}
//sign in form data validation 
const signInValidate = (requestData) =>{
    schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    let errorData = schema.validate(requestData)
    console.log(errorData)
    return errorData
}

module.exports = {
    signUpValidate,
    signInValidate
}
const Joi = require("joi");

module.exports.userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        contact_no: Joi.number().required(),
        file: Joi.string().allow("", null),
    }).required(),
})
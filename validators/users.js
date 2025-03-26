import Joi from "joi";

export const registerUserValidator = Joi.object({
    username: Joi.string(). required(),
    email: Joi.string(). required(),
    password: Joi.string(). required(),
    confirmPassword: Joi.ref('password'),
}) 


export const loginUserValidator = Joi.object({
    username: Joi.string(). optional(),
    email: Joi.string(). optional(),
    password: Joi.string().required()
    
});

export const updateUserValidator = Joi.object({
    role: Joi.string().valid('staff', 'manager', 'admin', 'superadmin').required(),
});
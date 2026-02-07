const Joi = require('joi');

exports.createWordSchema = Joi.object({
  english: Joi.string()
    .min(1)
    .max(100)
    .required(),

  japanese: Joi.string()
    .min(1)
    .max(100)
    .required(),

  reading: Joi.string()
    .allow('')
    .optional(),

  meaning: Joi.string()
    .min(1)
    .max(255)
    .required()
});

exports.updateWordSchema = Joi.object({
  english: Joi.string().min(1).max(100),
  japanese: Joi.string().min(1).max(100),
  reading: Joi.string().allow(''),
  meaning: Joi.string().min(1).max(255)
}).min(1); // хотя бы одно поле

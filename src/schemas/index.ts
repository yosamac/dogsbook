import { Joi } from 'celebrate';

export const userSchema = {
  userId: Joi.number().integer(),
  username: Joi.string().max(20).label('username').description('Username'),
  email: Joi.string().email({ minDomainSegments: 2 }) .max(30) .label('email') .description('User email'),
  password: Joi.string().min(8) .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/) .label('password') .description('User password'),
}

export const CreateUserSchema = Joi.object({
  ...userSchema,
  username: userSchema.username.required(),
  email: userSchema.email.required(),
  password: userSchema.password.required()
});

export const UpdateUserSchema = Joi.object({
  ...userSchema,
})

export const LocationInfoSchema = Joi.object().keys({
  latitude: Joi.number().required().label('latitude').description('Current location coordinates'),
  longitude: Joi.number().required().label('longitude').description('Current location coordinates'),
  language: Joi.string().required().max(3).example('ES').label('language').description('Browser language'),
})

export const UserIdSchema = Joi.object().keys({
  userId: userSchema.userId.required()
})






import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import Boom from '@hapi/boom';
const  geoip  = require('geoip-lite') 

import { IUser, createUserDTO } from '../interfaces/IUser';
import UserService from '../services/user';

// UTILS FUNCTIONS
const handleResponseOk = data => ({ status: 'success', data });
const catchError = logger => next =>  err => {
  logger.error('🔥 error: %o', err);
  return next(errors[err] || errors['DEFAULT']);
}

// TYPES OF RESPONSES ERRORS
const errors = {
  CONFLICT: Boom.conflict('Sorry, that user already exists').output.payload,
  NOT_FOUND: Boom.notFound('User not found').output.payload,
  BAD_REQUEST: Boom.badRequest('Invalid input data').output.payload,
  DEFAULT: Boom.badImplementation().output.payload,
};

export function createUser (req: Request, res: Response, next: NextFunction) {

  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {headers: {"accept-language": language = 'UNKNOWN'}, body, ip = '139.47.95.53'} = req
  const [latitude, longitude] = geoip.lookup('139.47.95.53')['ll']

  const userData = {
    ...body,
    language,
    latitude,
    longitude
  }

  logger.info('Creating new user endpoint with payload: \n%o', userData);

  console.log(req.headers["accept-language"])

  userService.createUser(userData as createUserDTO)
    .then((user) => res.status(201).json(handleResponseOk(user)))
    .catch(catchError(logger)(next));
}

export function getUsers (req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  logger.info('Calling get-users endpoint');

    userService
      .getUsers()
      .then((result) => res.status(200).json(handleResponseOk((result))))
      .catch(catchError(logger)(next));
}

export function getUser (req: Request, res: Response, next: NextFunction)  {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const { params: { userId }, } = req;

  logger.info(`Calling get-user endpoint with userId ${userId}`);

  userService
    .getUser(userId)
    .then((user) => res.status(200).json(handleResponseOk(user)))
    .catch(catchError(logger)(next));
}

export function updateUser (req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {
    params: { userId },
    body: payload,
  } = req;

  logger.info('Calling update-user endpoint with body: %o', payload);

  userService
    .updateUser(userId, payload as IUser)
    .then((user) => res.status(202).json(handleResponseOk(user)))
    .catch(catchError(logger)(next));
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {
    params: { userId },
  } = req;

  logger.info('Calling delete-user endpoint with the userId: %o', userId);

  userService
    .deleteUser(userId)
    .then(result => res.status(200).json(result))
    .catch(catchError(logger)(next));
}

export function addFriend (req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {
    params: { userId },
    body: {userId: friendId},
  } = req;

  logger.info('Calling add friend endpoint with userId: %s', friendId);

  userService
    .addFriend(userId, friendId)
    .then((user) => res.status(202).json(handleResponseOk(user)))
    .catch(catchError(logger)(next));
}

export function getFriendListed (req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {params: {userId}} = req 

  logger.info(`Calling get friend listed endpoint with userId: ${userId}`);
  
    userService
      .getFriendListed(userId)
      .then((result) => res.status(200).json(handleResponseOk((result))))
      .catch(catchError(logger)(next));
}

export function getFriendCount (req: Request, res: Response, next: NextFunction) {
  const userService = Container.get(UserService);
  const logger: Logger = Container.get('logger');

  const {params: {userId}} = req 

  logger.info(`Calling endpoint to get friend count of user: ${userId}`);
  
    userService
      .getFriendCount(userId)
      .then((result) => res.status(200).json(handleResponseOk((result))))
      .catch(catchError(logger)(next));
}

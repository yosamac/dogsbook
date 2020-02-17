import { Router } from 'express';
import { celebrate,  } from 'celebrate';

import {CreateUserSchema, UpdateUserSchema, UserIdSchema} from '../../schemas'
import {createUser, getUsers, getUser, updateUser, deleteUser, addFriend, getFriendListed, getFriendCount} from '../../controller/user'

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  /*
   * Create a new user
   */
  route.post('/', celebrate({ body: CreateUserSchema }), createUser);

  /*
   *  Get all users
   */
  route.get('/', getUsers);

  /*
   *  Get an user
   */
  route.get('/:userId', celebrate({ params: UserIdSchema }), getUser);

  /*
   * Update an user
   */
  route.put('/:userId', celebrate({params: UserIdSchema, body: UpdateUserSchema}), updateUser);

  /*
   * Delete an user
   */
  route.delete('/:userId', celebrate({params: UserIdSchema}), deleteUser);

  /*
   * Create new friendship 
   */
  route.post('/:userId/friends', celebrate({params: UserIdSchema, body: UserIdSchema}), addFriend);

  /*
   * Get friend listed of an user
   */
  route.get('/:userId/friends', celebrate({params: UserIdSchema}), getFriendListed);

  /*
   * Get friend listed of an user 
   */
  route.get('/:userId/friends/count', celebrate({params: UserIdSchema}), getFriendCount);
}
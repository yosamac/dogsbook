import { Service, Inject } from 'typedi';
import { randomBytes } from 'crypto';
import { Logger } from 'winston';
import argon2 from 'argon2'
import {omit, map} from 'lodash/fp'

import { IUser, createUserDTO } from '../interfaces/IUser';
import {processSouthern, isSouthOrNorth} from '../utils'

// UTILS FUNCTIONS
const removeFields = fields => map(omit(fields));
const removePassword = omit('password')

// TYPES OF DATABASE ERRORS
const enum DBError {
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
}

@Service()
export default class UserService {
  constructor(
    @Inject('dogsbookDb') private Db,
    @Inject('logger') private logger: Logger,
  ) {}

  public async createUser(userData: createUserDTO): Promise<IUser> {
    this.logger.silly('Creating user db record');
  
    const {password, latitude, longitude} = userData
  
    userData.password = await this._hashPassword(password)
    
    return isSouthOrNorth(latitude, longitude)
      .then(hemiferium => {
       
        if (hemiferium === 'N') { // TODO - REFACTORING

          this.logger.info('Arriving an new user to our DB');
          userData.hemiferium = hemiferium
           // TODO - Refactoring to improve code
          const fields = Object.keys(userData)
          const values = Object.values(userData)
          const index = fields.map((v, idx) => (`$${idx + 1}`))

          const insertQuery = {
            text:`INSERT INTO users(${fields}) 
                  VALUES(${index}) RETURNING *`,
            values
          }

          return this.Db.query(insertQuery)
            .then(({rows}) => omit('password')(rows[0]))
            .catch((err) => {
              this.logger.error(err);
              const isConflict = err.code == 23505
              if (isConflict) {
                err.message = DBError['CONFLICT'];
              }
              throw err.message;
            })
        } else {
          this.logger.info('Sending user to the third api...');
          return processSouthern({...userData, latitude, longitude})
        }
      })
  }

  public getUsers(): Promise<IUser[]> {
    this.logger.silly('Getting all users');
    const findQuery = {
      text: 'SELECT * from users'
    }
    return this.Db.query(findQuery)
      .then(({rows, rowCount}) => ({count: rowCount, users:removeFields('password')(rows)}))
      .catch(err => {
        this.logger.error(err);
        throw err.message;
      });
  }

  public getUser(userId: string): Promise<IUser> {
    this.logger.silly('Getting an user with users');

    const findQuery = {
      text: 'SELECT username, email, hemiferium from users WHERE userId=$1',
      values:[userId]
    }

    return this.Db.query(findQuery)
      .then(({rows:usersFounded}) => {
        if (!usersFounded.length) {
          this.logger.info(`User ${userId} not found`);
          throw new Error(DBError.NOT_FOUND);
        }
        console.log(usersFounded)
        return { user: removePassword(usersFounded[0]) };
      })
      .catch(err => {
        this.logger.error(err);
        throw err.message;
      });
  }

  public updateUser(userId: string, anUser: IUser): Promise<IUser> {
    this.logger.silly('Updating the data of an user');

    const keyValue = Object.entries(anUser).map(([key, value]) => (` ${key} = '${value}'`))
    
    const updateQuery = {
      text: `UPDATE users SET ${keyValue} WHERE userId=${userId} RETURNING *`,
    }
    
    return this.Db.query(updateQuery)
      .then(({rows}) => {
        const [userFounded] = rows
        if (!rows.length) {
          this.logger.info(`User with userId: ${userId} not found`);
          throw new Error(DBError.NOT_FOUND);
        }

        return userFounded;
      })
      .catch(err => {
        this.logger.error(err);
        throw err.message;
      });
  }

  public deleteUser(userId: string): Promise<{}> {
    this.logger.silly('Deleting a user');

    const deleteQuery = {
      text: `DELETE FROM users WHERE userId=${userId} RETURNING *`
    }
    return this.Db
      .query(deleteQuery)
      .then(({rowCount}) => { 
        if (!rowCount) {
          throw new Error (DBError.NOT_FOUND)
        } 
      
        this.logger.info(`Deleted user with id: ${userId}`);
        return { ok: true, message: `User with Id: ${userId} deleted` };
      })
      .catch(err => {

        this.logger.error(err);
        throw err.message;
      });
  }

  public addFriend(userId: string, friendId): Promise<IUser> {
    this.logger.silly('Adding new friend to the list');

    const insertQuery = {
      text: `INSERT INTO friendship(user_id, friend_id)
            VALUES($1,  $2) RETURNING *`,
      values: [userId, friendId]     
    }
    
    return this.Db.query(insertQuery)
      .then(({rows}) => {
        const [userFounded] = rows
        if (!rows.length) { // TODO - REFACTORING, the same condition repeat and repeat again
          this.logger.info(`User with userId: ${userId} not found`);
          throw new Error(DBError.NOT_FOUND);
        }
        return userFounded;
      })
      .catch(err => {
        console.log(err)
        this.logger.error(err);
        const isValidUser = err.code == 23503
        if (isValidUser) {
          err.message = DBError['NOT_FOUND'];
        }
        throw err.message;
      });
  }

  public getFriendListed (userId: string): Promise<IUser[]> {

    this.logger.info('Get friend listed of an user');

    const friendListQuery = {
      text: `SELECT username, email, hemiferium FROM users 
             INNER JOIN friendship ON  users.userId = friendship.friend_id
             WHERE friendship.user_id = ${userId}
    `
    }
    return  this.Db.query(friendListQuery)
    .then(({rows:usersFounded, rowCount: count}) => ({count, friends: usersFounded}))
    .catch(err => {
      this.logger.error(err);
      throw err.message;
    });
  } 

  public getFriendCount (userId: string) {
    this.logger.info('Get friend count of an user');

    const friendListQuery = {
      text: `SELECT COUNT(*) FROM users 
            INNER JOIN friendship ON  users.userId = friendship.friend_id
            WHERE friendship.user_id = ${userId}
    `
    }
    return  this.Db.query(friendListQuery)
    .then(({rows:friendCount}) => (friendCount))
    .catch(err => {
      this.logger.error(err);
      throw err.message;
    });
  }

  private async _hashPassword(aPassword: string) {
    const salt = randomBytes(32);
    this.logger.info('Hashing password');
    const hashedPassword = await argon2.hash(aPassword, { salt });

    return hashedPassword;
  }

}

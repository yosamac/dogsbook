import {Pool} from 'pg'
import config  from '../config'

const {postgresConfig} = config 

const friendsTable = `
  -- DROP TABLE IF EXISTS friendship ;
  -- DROP TABLE IF EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    userId SERIAL, 
    username VARCHAR(30) UNIQUE NOT NULL, 
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    latitude  FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    language VARCHAR(20) NOT NULL,
    hemiferium VARCHAR(1),
    -- friends int[]  Otra manera de hacerlo.
    PRIMARY KEY(userId)
    --
  );
  
  CREATE TABLE IF NOT EXISTS friendship  (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    friend_id INTEGER REFERENCES users (userId) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (userId) ON DELETE CASCADE
  );
`

export default () => {

  const connectionDb = new Pool(postgresConfig)

  connectionDb.query(friendsTable)
    .then( res => {
      console.log('Created Dogsbook DB')
    }).catch(err => {
      console.log(err)
      process.exit(-1);
    })

  return connectionDb;
}
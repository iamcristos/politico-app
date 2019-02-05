import {Pool} from 'pg' ;
import dotenv from 'dotenv';

dotenv.config()

let connection = {
  connectionString: process.env.database 
}


const db = new Pool(connection);

export default db;
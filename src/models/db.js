import {Pool} from 'pg' ;
import dotenv from 'dotenv';

dotenv.config()
let connection;
if (process.env.NODE_ENV === 'test') {
    connection = {
        connectionString: process.env.test  
      }
      
} else {
    connection = {
        connectionString: process.env.database  
      }
}




const db = new Pool(connection);

export default db;
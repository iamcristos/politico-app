const party = [
    {
      id: 1,
      name: 'pdp',
      hqAdress: 'Tafawa road',
      logoUrl: 'link',
    }, {
      id: 2,
      name: 'apc',
      hqAdress: 'Tafawa Balewa Street',
      logoUrl: 'link',
    }];

import {Pool} from 'pg' ;
import dotenv from 'dotenv';

dotenv.config()

let connection = {
  connectionString: process.env.database 
}


const db = new Pool(connection);

export default party
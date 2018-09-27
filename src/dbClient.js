import { Client } from 'pg';
import config from '../config';


const client = new Client(config.postres);
client.connect();

export default client;

import { Pool } from 'pg';
import dbConfig from './config.js';

export default new Pool({ ...dbConfig });

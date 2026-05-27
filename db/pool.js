import { Pool } from 'pg';
import db from './config.js';

export default new Pool({ ...db });

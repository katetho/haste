//Connect to DB
import { Sequelize } from 'sequelize-typescript';
export const db = new Sequelize('mysql://b815ccf5030b93:868175ea@eu-cdbr-west-03.cleardb.net/heroku_92b0692982f5285');
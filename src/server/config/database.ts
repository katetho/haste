//Connect to DB
import { Sequelize } from 'sequelize-typescript';
export const db = new Sequelize('mysql://root:2020@192.168.99.100:3306/haste');
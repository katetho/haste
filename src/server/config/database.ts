//Connect to DB
import { Sequelize } from 'sequelize-typescript';
 export const db = new Sequelize('haste', 'root', process.env.MYSQL_PASSWORD, {
  host: '192.168.99.100',
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle: 10000
  },
})

db.addModels(['../models/Session.ts','../models/User.ts', '../models/Ticket.ts'])

const db = new Sequelize('mysql://root:2020@192.168.99.100:3306/haste');
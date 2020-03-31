import { Model, DataTypes} from 'sequelize';
import { db } from '../config/database';

export class User extends Model {
	public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public department!: string;
    public password!: string;
    public role!: string;

      // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  }

  
User.init({
	id: {
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true,
        primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING(128)
	},
	lastName: {
		type: DataTypes.STRING(128)
	},
	email: {
		type: DataTypes.STRING(128)
	},
	department: {
		type: DataTypes.STRING(128),
	},
	password: {
		type: DataTypes.STRING(128),
	},
	role: {
		type: DataTypes.STRING(128),
		defaultValue: 'member'
	}
},
{
	sequelize: db,
    tableName: 'users'
});

User.sync(); //create if not created

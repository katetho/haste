import { Model, DataTypes} from 'sequelize';
import { User } from './User';
import { db } from '../config/database'

export class Session extends Model {
  public sid!: number;
  public expires!: Date;
  public data!: Text;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Session.init({
  sid: {
    type: DataTypes.INTEGER.UNSIGNED, 
    autoIncrement: true,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data: {
    type: DataTypes.STRING(1024)
  }
},
{
  sequelize: db,
  tableName: 'sessions'
})

Session.belongsTo(User);


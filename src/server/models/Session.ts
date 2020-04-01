import { Model, DataTypes} from 'sequelize';
import { User } from './User';
import { db } from '../config/database'

export class Session extends Model {
  public sid!: number;
  public expires!: Date;
  public data!: Text;
  public userId!: number;
  

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Session.init({
  sid: {
    type: DataTypes.STRING(1024)
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data: {
    type: DataTypes.STRING(1024)
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
},
{
  sequelize: db,
  tableName: 'Session'
})

Session.belongsTo(User, {
  foreignKey: 'userId'
});

//Session.sync();

import { Model, DataTypes} from 'sequelize';
import { User } from './User';
import { db } from '../config/database';
import { Op } from "sequelize";

export class Ticket extends Model {
    public id!: number;
    public title!: string;
    public department!: string;
    public priority!: string;
    public deadline!: Date;
    public description!: string;
    public date!: Date;
    public assignee!: string;
    public status!: string;
    public initiatorId!: string;
    public assigneeID!: string;

      // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  }


Ticket.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true,
        primaryKey: true,
      },
    title: {
        type: DataTypes.STRING(128)
    },
    department: {
        type: DataTypes.STRING(128)
    },
    priority: {
        type: DataTypes.STRING(128)
    },
    deadline: {
        type: DataTypes.DATE,
    },
    description: {
        type: DataTypes.STRING(1024)
    },
    date: {
        type: DataTypes.DATE,
    },
    assignee: {
        type: DataTypes.STRING(128)
    },
    status: {
        type: DataTypes.STRING(128),
        defaultValue: 'unassigned'
    },
    assigneeID: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    initiatorId: {
        type: DataTypes.INTEGER.UNSIGNED
    }
}, {
    scopes: {
        active: {
            where: {
                status: {
                    [Op.or]: ['active', 'assigned', 'unassigned']
                }
            }
      },
      assigned: {
          where: {
              status: 'assigned'
          }
      },
      unassigned: {
          where: {
              status: 'unassigned'
          }
      },
      closed: {
          where: {
              status: 'closed'
          }
      }
    },
    sequelize: db,
    tableName: 'tickets'
})

Ticket.belongsTo(User, {
    foreignKey: 'initiatorId'
});
Ticket.belongsTo(User, {
    foreignKey: 'assigneeID'
});

Ticket.sync(); //create if not created

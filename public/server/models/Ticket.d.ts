import { Model } from 'sequelize';
export declare class Ticket extends Model {
    id: number;
    title: string;
    department: string;
    priority: string;
    deadline: Date;
    description: string;
    date: Date;
    assignee: string;
    status: string;
    initiatorId: string;
    assigneeID: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

import { Model } from 'sequelize';
export declare class User extends Model {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    password: string;
    role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

import { Model } from 'sequelize';
export declare class Session extends Model {
    sid: number;
    expires: Date;
    data: Text;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

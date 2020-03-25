import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserInterface>);
    findOne(email: any): Promise<UserInterface | undefined>;
    save(req: any, createUserDto: any): Promise<UserInterface>;
    validateUser(email: string): Promise<UserInterface>;
}

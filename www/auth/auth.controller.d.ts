import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    createUserByEmailAndPassword(req: any, createUserDto: UserDto): Promise<import("../users/interfaces/user.interface").UserInterface>;
    login(req: any, user: UserDto): Promise<unknown>;
    refreshToken(req: any): Promise<{
        token: string;
    }>;
    getProfile(req: any): any;
}

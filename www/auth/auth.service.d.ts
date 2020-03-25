import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginAttempt: any): Promise<unknown>;
    refreshToken(req: any): Promise<{
        token: string;
    }>;
    createJwtPayload(user: any): {
        token: string;
    };
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(loginAttempt) {
        let userToAttempt;
        try {
            userToAttempt = await this.usersService.findOne(loginAttempt.email);
        }
        catch (e) {
            throw new common_1.ForbiddenException(e.message.message);
        }
        if (!userToAttempt) {
            throw new common_1.NotFoundException('not found');
        }
        return new Promise((resolve, reject) => {
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if (err) {
                    reject('Wrong Email or Password');
                    return;
                }
                if (isMatch && loginAttempt.password.toString()) {
                    resolve(this.createJwtPayload(userToAttempt));
                }
                else {
                    reject('Wrong Email or Password');
                }
                return;
            });
        });
    }
    async refreshToken(req) {
        return this.createJwtPayload(req.user);
    }
    createJwtPayload(user) {
        const data = {
            sub: user.email,
            roles: user.roles,
        };
        const jwt = this.jwtService.sign(data);
        return {
            token: jwt,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
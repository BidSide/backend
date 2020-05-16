import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileService } from '../../profile/profile.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileService: ProfileService,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }

    if (roles.length === 0) {
      return false;
    }

    const req = context.switchToHttp().getRequest();

    const user: any = req.user;

    if (
      !req.user &&
      !roles.find(item => {
        return item === 'ANONYMUS';
      })
    ) {
      return false;
    }

    if (
      !!roles.find(item => {
        return item === 'ANONYMUS';
      })
    ) {
      return true;
    }

    const hasRole = () => {
      return user.roles.some(role => {
        return !!roles.find(item => {
          return item === role;
        });
      });
    };

    req.profile = await this.profileService.findProfileByUserId(req.user._id);

    return user && user.roles && hasRole();
  }
}

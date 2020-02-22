import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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

    return user && user.roles && hasRole();
  }
}

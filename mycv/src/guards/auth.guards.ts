import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // 'ExecutionContext' per tutti i portocolli oltri http
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}

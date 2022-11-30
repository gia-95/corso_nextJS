import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}

/**
 * Il Decorstor non può essere usato come/con Dip. Inj.
 * Per questo faccio uso di un Interceptor (current-user.interceptor) per inserire
 * lo user trovato nella request, per poi riprenderla da qui.
 * (così ho risolto il problema di Dip. Inj.)
 * 
 * (bisogna dirgli anche di eseguire prima l'interceptor, poi il decoratore; due possibilità:
 *    1. Aggiungere l'interceptr nella lista dei provider nel module
 *        Poi nel controller metti l'annotazione 'useInterceptor(...)' così prima di ogni metodo lo usa
 *        -> Il problema qual'è: se hai più controller che utilizzano l'interceptor, dovrai fare gli import e mettere i decoratori su tutti; duplichi tanto codice
 *      (trovi tutto commentato nelle classi)
 *    
 *    (in questo modo usi l'interceptor prima di qualsiasi contorller, tra controller e request)
 *    ( utilizzando un istanza sola!!)
 *    2. Nello 'user.module', nei provider inserisci l'oggetto con APP_INTERCEPTOR - è come se l'hai messo globalmente in tutta l'app
 * )
 */


import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // 'context' --> è il wrapper/involucro delle incoming request
    // 'data' --> tutto quello che fornisci al decorator (tra le parentesi; @CurrentUser(questo!))
    // (never perchè non bisogna pssare niente non questo caso)
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);


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

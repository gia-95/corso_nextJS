// Handle the REQUEST before the controller handler and
// handle the RESPONSE before the response is sent out.

import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer'; // per "trasformare" il 'data' dell'handler nel Dto voluto.
import { UserDto } from 'src/users/dtos/user.dto';

// Questa è bella!
// Barbatrucco: quando viene passato qualcosa alla func 'Serialize(..)' (sotto), 
// quello che viene passato DEVE eseere una classe
// (fa un new dell'istanza, se passassi una stringa darebbe un errore)
interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) { // 'any' perchè ogni controller gli passa il proprio Dto
  return UseInterceptors(new SerializeInterceptor(dto));
}

//                                ...deve implementare il metodo 'intercept' (che viene chiamato automaticamente)
export class SerializeInterceptor implements NestInterceptor {
constructor(private dto: any) {} // Questo perchè da ogni Controller viene passato il dto dell'entità per quella repsposne (pensaci bene e guarda l'annotazione '@UseInterceptors(...)', nei controller!)

  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {

    // Run somethings before a REQUEST in handle
    // by the REQUEST handler
    // console.log('Im running before the (request) handler', context);

    return handler.handle().pipe(
      map((data: any) => { // Run something before the RESPONSE is sent out
        return plainToClass (this.dto, data, {
            excludeExtraneousValues: true
        });
      }),
    );
  }
}

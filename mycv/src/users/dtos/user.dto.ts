// user.dto.ts --> default showing a user to the outside world.

import { Expose, Exclude } from 'class-transformer';

// ... devi dire splicitamente cosa esporre e cosa no.
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}



/*
adesso devi importare questa istanza dell'Interceptor... 
*/
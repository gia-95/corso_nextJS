import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  // In generale sto creando il DI container con l'AuthService (la parte dopo 'const module = ecc..);
  //    siccome l'Auth ha bosngo delle determinate dipendenze, le creo FAKE
  // Create a fake copy of user service
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});


/**
 * La lista dei porvider di module:
 *    è la lista di ciò (istanze) che vuoi aggiungere al DI container
 *    Quindi un'istanza di AuthService, poi l'oggetto è un trik; "qunado viene richeisto UserService, mettici FakeUserService"
 */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // IMP: Crea sempore l'entità prima di salvare/update/ecc..
    return this.repo.save(user); //                          ...in questo modo puoi accedere ai metodi dell'entità (ed è tutto più controllato!)
  }
}

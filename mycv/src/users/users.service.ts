import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    if (!id) {
      // Perche il 'findOneBy' con 'null' torna il primo che trova
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } }); // oppure: findBy({ email })
  }

  async update(id: number, attrs: Partial<User>) {
    // 'Partial' è un tipo di ts che sottointende qualsiasi oggetto che abbia (anche non tutte) le proprità del generico
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    Object.assign(user, attrs); // diciamo "mergia"
    return this.repo.save(user);
  }

  async remove(id: number) {
    // Ci sono sia 'remove(Entity)' sia 'delete({id})', però delete non fa gli Hooks
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.repo.remove(user);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // For hashing password
import { promisify } from 'util';
import e from 'express';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // Check that the email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password:
    // Generate the 'salt'
    const salt = randomBytes(8).toString('hex'); // randbytes torna un buffer (001110101...), toString 'hex' lo converte in stringa in esadecimale; 8 sta per 8 byte di 'parola', ogni byte sono due caratteri, quindi il salt ha 16 caratteri
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join th hashed result and the salt
    const result = salt + '.' + hash.toString('hex');

    // Create a new users and save it
    const user = await this.userService.create(email, result);
    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email); // [user] perche la find tornerebbe anche più user (teoricamente ce ne dovrebbe stare una)
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // (DESTRUCTURING, molto potente!)
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    
    return user;
  }
}

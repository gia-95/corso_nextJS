import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateuserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {
  SerializeInterceptor,
  Serialize,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto) // ... puoi anche metterlo sui singoli emtodi che ti serovno (customizza la response)
export class UsersController {
  constructor(
    // per Dip Inj
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = this.authService.signup(body.email, body.password);
    session.userId = (await user).id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = this.authService.signin(body.email, body.password);
    session.userId = (await user).id;
    return user;
  }

  @Post('/signout')
  SignOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  WhoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))  ... 'vecchia maniera' (sotto)
  // @Serialize(UserDto) --> fa la stessa cosa, ma usando il metodo Serilize definito nella classe 'interceptor'
  // (Definito all'inzio della classe, per tutti i metodi!)
  @Get('/:id') // i parametri sono sempre stringhe!
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Get() // Non ho capito perchè non è findUsersByEmail...
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateuserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

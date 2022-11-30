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
  UseGuards,
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
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('auth')
@Serialize(UserDto) // ... puoi anche metterlo sui singoli emtodi che ti serovno (customizza la response)
// @UseInterceptors(CurrentUserInterceptor)
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

  // @Get('/whoami')
  // WhoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  WhoAmIn(@CurrentUser() user: User) {
    // Nota: Se non avessi il decorator costurito da te, ma solo l'interceptor,
    //        potevi usare in decorator '@Request() req: Request', e da req.currentUser (inserito dall'interceptor), avevi stesso risultato
    //      (così ovviamente è più pulito, si capisce meglio)
    return user;
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

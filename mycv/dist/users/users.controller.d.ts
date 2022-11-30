import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateuserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signin(body: CreateUserDto, session: any): Promise<User>;
    SignOut(session: any): void;
    WhoAmIn(user: User): User;
    findUser(id: string): Promise<User>;
    findAllUsers(email: string): Promise<User[]>;
    deleteUser(id: string): Promise<User>;
    updateUser(id: string, body: UpdateuserDto): Promise<User>;
}

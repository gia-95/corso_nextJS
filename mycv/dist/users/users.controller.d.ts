import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateuserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<import("./user.entity").User>;
    signin(body: CreateUserDto): Promise<import("./user.entity").User>;
    findUser(id: string): Promise<import("./user.entity").User>;
    findAllUsers(email: string): Promise<import("./user.entity").User[]>;
    deleteUser(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateuserDto): Promise<import("./user.entity").User>;
}

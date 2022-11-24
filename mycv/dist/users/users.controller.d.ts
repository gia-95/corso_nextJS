import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateuserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): void;
    findUser(id: string): Promise<import("./user.entity").User>;
    findAllUsers(email: string): Promise<import("./user.entity").User[]>;
    deleteUser(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateuserDto): Promise<import("./user.entity").User>;
}

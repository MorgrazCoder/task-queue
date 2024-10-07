import { IUserUseCase, TCreateUser, TCreateUserRes, TGetUserRes } from "src/use-cases/user";

import { IUserRepository } from "@infrastructure/databases/postgres/prisma/repositories";
import { UserAlreadyExistsException, UserNotFoundException } from "@infrastructure/exceptions";

export class UserUseCase implements IUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    public async getUserById(id: string): Promise<TGetUserRes> {
        return this.userRepository.getOne({ id }).then((data) => {
            if (!data) throw new UserNotFoundException();

            return data;
        });
    }
    public async getUserByNick(nick: string): Promise<TGetUserRes> {
        return this.userRepository.getOne({ nick_name: nick }).then((data) => {
            if (!data) throw new UserNotFoundException();

            return data;
        });
    }

    public async getUsers(): Promise<TGetUserRes[]> {
        return this.userRepository.getMany();
    }

    public async create(args: TCreateUser): Promise<TCreateUserRes> {
        const { nick_name } = args;

        return this.userRepository.getOne({ nick_name }).then((user) => {
            if (user) throw new UserAlreadyExistsException();

            return this.userRepository.create(args);
        });
    }
}

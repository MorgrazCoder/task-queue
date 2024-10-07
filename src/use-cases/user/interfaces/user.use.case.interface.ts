import { TCreateUser, TCreateUserRes, TGetUserRes } from "src/use-cases/user";

export interface IUserUseCase {
    getUserById(id: string): Promise<TGetUserRes>;

    getUserByNick(nick: string): Promise<TGetUserRes>;

    getUsers(): Promise<TGetUserRes[]>;

    create(args: TCreateUser): Promise<TCreateUserRes>;
}

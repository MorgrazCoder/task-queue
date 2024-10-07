import { IUserDomain } from "@domain";

import {
    TCreateUserArgs,
    TGetOneUserArgs,
} from "@infrastructure/databases/postgres/prisma/repositories";

export interface IUserRepository {
    getOne(findArgs: TGetOneUserArgs): Promise<IUserDomain | null>;

    getMany(): Promise<IUserDomain[]>;

    create(args: TCreateUserArgs): Promise<IUserDomain>;
}

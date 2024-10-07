import { PrismaService } from "nestjs-prisma";

import { IUserDomain, UserDomain } from "@domain";

import {
    IUserRepository,
    TCreateUserArgs,
    TGetOneUserArgs,
} from "@infrastructure/databases/postgres/prisma/repositories";

export class UserRepository implements IUserRepository {
    private readonly userClient: PrismaService["user"];

    constructor(prismaService: PrismaService) {
        this.userClient = prismaService.user;
    }

    public async getOne(findArgs: TGetOneUserArgs): Promise<IUserDomain | null> {
        return this.userClient
            .findUnique({ where: findArgs })
            .then(
                (data) => data && new UserDomain({ user_id: data.id, nick_name: data.nick_name })
            );
    }
    public async getMany(): Promise<IUserDomain[]> {
        return this.userClient
            .findMany()
            .then((arr) =>
                arr.map(({ id, nick_name }) => new UserDomain({ user_id: id, nick_name }))
            );
    }

    public async create(args: TCreateUserArgs): Promise<IUserDomain> {
        return this.userClient
            .create({ data: args })
            .then(({ id, nick_name }) => new UserDomain({ user_id: id, nick_name: nick_name }));
    }
}

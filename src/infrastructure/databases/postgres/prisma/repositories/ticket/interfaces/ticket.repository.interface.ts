import { ITicketDomain } from "@domain";

import { TCreateTicketArgs } from "@infrastructure/databases/postgres/prisma/repositories";

export interface ITicketRepository {
    getAllByUserId(userId: string): Promise<ITicketDomain[]>;

    getById(id: string): Promise<ITicketDomain | null>;

    create(args: TCreateTicketArgs): Promise<ITicketDomain>;

    markAsCompleted(id: string): Promise<void>;

    isCompleted(id: string): Promise<boolean>;
}

import { ITicketDomain } from "@domain";

export class TicketDomain {
    public ticket_id: string;
    public user_id: string;
    public service_id: string;
    public is_completed: boolean;
    constructor(args: ITicketDomain) {
        this.ticket_id = args.ticket_id;
        this.user_id = args.user_id;
        this.service_id = args.service_id;
        this.is_completed = args.is_completed;
    }
}

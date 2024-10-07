import { IServiceDomain } from "@domain";

export class ServiceDomain implements IServiceDomain {
    public service_id: string;
    public service_name: string;
    public service_description: string;
    constructor(args: IServiceDomain) {
        this.service_id = args.service_id;
        this.service_name = args.service_name;
        this.service_description = args.service_description;
    }
}

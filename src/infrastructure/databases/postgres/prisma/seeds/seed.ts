import { PrismaClient } from "@prisma/client";
import { serviceSeed } from "./service.seed";

const client = new PrismaClient();

(async () => {
    await serviceSeed(client);
})()
    .then(async () => {
        await client.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);

        await client.$disconnect();

        process.exit(1);
    });

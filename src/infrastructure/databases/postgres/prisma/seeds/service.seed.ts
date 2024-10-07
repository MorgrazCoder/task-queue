import { PrismaClient } from "@prisma/client";

const seedData = [
    {
        name: "Получение паспорта",
        description: "Первичное получение паспорта гражданина",
    },
    {
        name: "Замена паспорта",
        description: "Замена паспорта при наступлении возраста",
    },
    {
        name: "Восстановление паспорта",
        description: "Восстановление паспорта после потери",
    },
    {
        name: "Получение ВУ",
        description: "Первичное получение водительского удостоверения",
    },
    {
        name: "Замена ВУ",
        description: "Замена водительского удостоверения по истечении 10 лет",
    },
    {
        name: "Восстановление ВУ",
        description: "Восстановление водительского удостоверения после потери",
    },
];

export const serviceSeed = async (client: PrismaClient) => {
    await client.service.createMany({ data: seedData });
};

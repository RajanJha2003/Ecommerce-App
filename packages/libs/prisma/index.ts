import {PrismaClient} from '@prisma/client'

declare global{
    namespace globalThis{
        var prismaab:PrismaClient
    }
}

const prisma=new PrismaClient()

if(process.env.NODE_ENV==='production'){
    globalThis.prismaab=prisma
}

export default prisma
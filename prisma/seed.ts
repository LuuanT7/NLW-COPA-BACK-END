import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name:'John Doe',
      email: 'john@example.com',
      avatar_url: 'http://github.com/LuuanT7.png',

    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: 'Example Pool',
      code:'BOL123',
      ownerId: user.id,

      participants:{
        create: {
          userId: user.id,
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode:'DE',
      secondTeamCountryCode:'BR',

    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-20T14:00:00.201Z',
      firstTeamCountryCode:'AR',
      secondTeamCountryCode:'BR',

      guesses:{
        create:{
          firtTeamPoints: 2,
          secondTeamPoints:1,
          
          participant:{
            connect:{ 
              userId_poolId:{
                userId: user.id,
                poolId: pool.id
            }
          }
          }
        }
      }

    }
  })

}

main()
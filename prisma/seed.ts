import { PrismaClient, TipoFilial, Filial } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  const filiais = [
    {
      cnpj: '56252873000146',
      nome: 'a Barateira',
      nomeFantasia: 'a Barateira',
      razaoSocial: 'A BARATEIRA SAUDE E VIDA LTDA',
      tipo: TipoFilial.MATRIZ,
    },
  ]

  const createdFiliais: Filial[] = []
  for (const filial of filiais) {
    const createdFilial = await prisma.filial.create({
      data: {
        ...filial,
        tipo: 'MATRIZ',
      },
    })
    createdFiliais.push(createdFilial)
  }

  const role = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrador do sistema',
    },
  })

  const funcionario = await prisma.funcionario.create({
    data: {
      nome: 'Administrador',
      salario: 10000,
      porcentagemComissao: 0,
      filiais: {
        create: {
          filialId: createdFiliais[0].id,
        },
      },
    },
  })

  const passwordHash = await argon2.hash('12345678')
  await prisma.user.create({
    data: {
      email: 'admin@phamarcy.com',
      name: 'Admin',
      password: passwordHash,
      filialId: createdFiliais[0].id,
      roleId: role.id,
      funcionarioId: funcionario.id,
    },
  })
}

main()
  .then(() => {
    console.log('Seed finalizado')
    prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })

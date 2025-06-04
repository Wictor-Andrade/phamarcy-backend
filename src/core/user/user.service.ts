import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SafeUser } from './user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      password: await argon2.hash(createUserDto.password),
      filial: { connect: { id: createUserDto.filialId } },
      funcionario: { connect: { id: createUserDto.funcionarioId } },
      role: { connect: { id: createUserDto.roleId } },
    };

    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({ where: { email } });
    } catch (e) {
      this.logger.error(`Error finding user by email: ${e}`);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from 'src/database/services/prisma.service';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<Users> {
    try {
      const data: Prisma.UsersCreateInput = {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      };
      const createUser = await this.prisma.users.create({ data });

      return createUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException({
          message: 'User with this email already exists',
        });
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  async findAll(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }

  findById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async update(id: number, updateDto: UpdateUserDto) {
    const data: Prisma.UsersUpdateInput = {
      ...updateDto,
    };

    return await this.prisma.users.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}

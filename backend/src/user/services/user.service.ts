import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from 'src/database/services/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const data: Prisma.UserCreateInput = {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      };
      const createUser = await this.prisma.user.create({ data });

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

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      ...updateDto,
    };

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { PrismaService } from 'src/database/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateScheduleDto) {
    const data: Prisma.ScheduleCreateInput = {
      ...dto,
    };
    return await this.prisma.schedule.create({ data });
  }

  async findAll() {
    return await this.prisma.schedule.findMany();
  }

  findOne(id: number) {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: UpdateScheduleDto) {
    const data: Prisma.ScheduleUpdateInput = {
      ...updateDto,
    };
    return await this.prisma.schedule.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}

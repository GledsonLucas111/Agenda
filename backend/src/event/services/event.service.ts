import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { PrismaService } from 'src/database/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    if (
      new Date(dto.startDate) > new Date(dto.endDate) ||
      new Date(dto.startDate).getTime() === new Date(dto.endDate).getTime()
    ) {
      throw new BadRequestException(
        'Data de incio nao pode ser menor ou exatamente igual a data de termino',
      );
    }
    try {
      const data: Prisma.EventCreateInput = {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      };
      const createSchedule = await this.prisma.event.create({ data });

      return createSchedule;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  findOne(id: number) {
    return this.prisma.event.findMany({ where: { author: { id } } });
  }

  async update(id: number, updateDto: UpdateEventDto) {
    const data: Prisma.EventUpdateInput = {
      ...updateDto,
    };
    return await this.prisma.event.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}

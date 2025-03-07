import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const result = await this.prisma.event.findMany();
    if (result.length > 0) {
      return result;
    } else {
      throw new NotFoundException('Nenhum evento encontrado');
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.event.findMany({ where: { author: { id } } });
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }
  findEventById(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }
  async update(id: number, updateDto: UpdateEventDto) {
    const eventId = await this.findEventById(id);

    if (!eventId) {
      throw new BadRequestException(
        'O evento com esse id informado nao existe',
      );
    }
    const data: Prisma.EventUpdateInput = {
      ...updateDto,
    };
    return await this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const eventId = await this.findEventById(id);

    if (!eventId) {
      throw new BadRequestException(
        'O evento com esse id informado nao existe',
      );
    }
    return this.prisma.event.delete({ where: { id } });
  }
}

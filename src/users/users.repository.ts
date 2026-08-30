import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<UpdateUserDto>) {
    return this.prisma.users.update({ where: { id }, data });
  }
}

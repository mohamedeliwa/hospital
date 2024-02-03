import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async healthz() {
    try {
      await this.prisma.$queryRaw`SELECT 1 + 1`;
      return 'Connection has been established successfully.';
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw new BadRequestException('Unable to connect to the database');
    }
  }
}

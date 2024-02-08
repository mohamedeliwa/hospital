import { Module } from '@nestjs/common';
import { DecisionsController } from './controllers/decisions.controller';
import { DecisionsService } from './services/decisions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DecisionsController],
  providers: [DecisionsService],
})
export class DecisionsModule {}

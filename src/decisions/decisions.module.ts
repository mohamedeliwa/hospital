import { Module } from '@nestjs/common';
import { DecisionsController } from './controllers/decisions.controller';
import { DecisionsService } from './services/decisions.service';

@Module({
  controllers: [DecisionsController],
  providers: [DecisionsService],
})
export class DecisionsModule {}

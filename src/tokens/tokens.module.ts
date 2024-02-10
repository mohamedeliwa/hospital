import { Module } from '@nestjs/common';
import { TokensController } from './controllers/tokens.controller';
import { TokensService } from './services/tokens.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}

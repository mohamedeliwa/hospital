import { Module } from '@nestjs/common';
import { TokensController } from './controllers/tokens.controller';
import { TokensService } from './services/tokens.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}

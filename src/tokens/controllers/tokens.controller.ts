import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { TokensService } from '../services/tokens.service';
import { CreateTokenDto } from '../dtos/create.token.dto';
import { Token } from '@prisma/client';
import { TokenParamsDto } from '../dtos/token.params.dto';
import { FindTokenDto } from '../dtos/find.token.dto';
import { UpdateTokenDto } from '../dtos/update.token.dto';

@ApiTags('Tokens')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Get('describe')
  async describe() {
    return await this.tokensService.describe();
  }

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto): Promise<Token> {
    return await this.tokensService.create(createTokenDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the token to be returned',
  })
  @Get(':id')
  async findOne(@Param() { id }: TokenParamsDto): Promise<Token> {
    return await this.tokensService.findOne(id);
  }

  @Get()
  async find(@Query() findTokenDto: FindTokenDto): Promise<Token[]> {
    return await this.tokensService.find(findTokenDto);
  }

  @ApiParam({
    name: ':id',
    required: true,
    description: 'id of the token to be updated',
  })
  @Patch(':id')
  async update(
    @Param() { id }: TokenParamsDto,
    @Body() updateTokenDto: UpdateTokenDto,
  ): Promise<Token> {
    return await this.tokensService.update(id, updateTokenDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the token to be deleted',
  })
  @Delete(':id')
  async delete(@Param() { id }: TokenParamsDto): Promise<Token> {
    return await this.tokensService.delete(id);
  }
}

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
import { DecisionsService } from '../services/decisions.service';
import { CreateDecisionDto } from '../dtos/create.decision.dto';
import { Decision } from '@prisma/client';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DecisionParamsDto } from '../dtos/decision.params.dto';
import { FindDecisionDto } from '../dtos/find.decision.dto';
import { UpdateDecisionDto } from '../dtos/update.decision.dto';

@ApiTags('Decisions')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('decisions')
export class DecisionsController {
  constructor(private decisionsService: DecisionsService) {}

  @Get('describe')
  async describe() {
    return await this.decisionsService.describe();
  }

  @Post()
  async create(@Body() decision: CreateDecisionDto): Promise<Decision> {
    return await this.decisionsService.create(decision);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the decision to be returned',
  })
  @Get(':id')
  async findOne(@Param() { id }: DecisionParamsDto): Promise<Decision> {
    return await this.decisionsService.findOne(id);
  }
}

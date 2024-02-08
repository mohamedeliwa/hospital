import { Injectable } from '@nestjs/common';
import { Decision } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDecisionDto } from '../dtos/create.decision.dto';
import {
  AllowedDecisionSortingFields,
  AllowedDecisionSortingValues,
  FindDecisionDto,
} from '../dtos/find.decision.dto';
import { UpdateDecisionDto } from '../dtos/update.decision.dto';

@Injectable()
export class DecisionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * @returns the description of the decision model
   */
  async describe() {
    return this.prisma.decision.fields;
  }

  /**
   * creates a new decision
   * @param createDecisionDto decision's data to be created
   * @returns the newly created decision object
   */
  async create(createDecisionDto: CreateDecisionDto): Promise<Decision> {
    const { patientId, ...rest } = createDecisionDto;

    // creating a decision and connecting it to a patient by id
    const decision = this.prisma.decision.create({
      data: {
        ...rest,
        patient: {
          connect: { id: patientId },
        },
      },
    });
    return decision;
  }
}

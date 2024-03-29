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

  /**
   * finds a decision by id
   * @param id - decision's id to find
   * @returns the found decision's object
   */
  async findOne(id: string): Promise<Decision> {
    const decision = await this.prisma.decision.findUniqueOrThrow({
      where: { id },
    });
    return decision;
  }

  /**
   * finds multiple decisions
   * @param findDecisionDto - decisions' data to find
   * @returns an array of the found decisions
   */
  async find(findDecisionDto: FindDecisionDto): Promise<Decision[]> {
    // TODO: add fuzzy finding feature, or searching with non exact matching
    const { skip, limit, sortField, sortValue, ...matches } = findDecisionDto;

    const decisions = await this.prisma.decision.findMany({
      where: matches,
      skip,
      orderBy: {
        [sortField || AllowedDecisionSortingFields.serialNumber]:
          sortValue || AllowedDecisionSortingValues.asc,
      },
      take: limit,
    });
    return decisions;
  }

  /**
   * updates decision data by id
   * @param id - decision's id to be updated
   * @param updateDecisionDto - decision's data to be updated
   * @returns the updated decision object
   */
  async update(
    id: string,
    updateDecisionDto: UpdateDecisionDto,
  ): Promise<Decision> {
    // return updateDecisionDto as unknown as Decision;

    const decision = this.prisma.decision.update({
      where: { id },
      data: updateDecisionDto,
    });

    return decision;
  }

  /**
   * deletes a decision by id
   * @param id - id of the decision to delete
   * @returns the deleted decision's object
   */
  async delete(id: string): Promise<Decision> {
    const decision = await this.prisma.decision.delete({
      where: { id },
    });

    return decision;
  }
}

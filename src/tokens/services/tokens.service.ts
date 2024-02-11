import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from '../dtos/create.token.dto';
import { Token } from '@prisma/client';
import {
  AllowedTokenSortingFields,
  AllowedTokenSortingValues,
  FindTokenDto,
} from '../dtos/find.token.dto';
import { UpdateTokenDto } from '../dtos/update.token.dto';

@Injectable()
export class TokensService {
  constructor(private prisma: PrismaService) {}

  /**
   * @returns the description of the token model
   */
  async describe() {
    return this.prisma.token.fields;
  }

  /**
   * creates a new token
   * @param createtokenDto token's data to be created
   * @returns the newly created token object
   */
  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const { decisionId, ...rest } = createTokenDto;

    // creating a token and connecting it to a decision by id
    const token = this.prisma.token.create({
      data: {
        ...rest,
        decision: {
          connect: { id: decisionId },
        },
      },
    });
    return token;
  }

  /**
   * finds a token by id
   * @param id - token's id to find
   * @returns the found token's object
   */
  async findOne(id: string): Promise<Token> {
    const token = await this.prisma.token.findUniqueOrThrow({
      where: { id },
    });
    return token;
  }

  /**
   * finds multiple token
   * @param findTokenDto - token' data to find
   * @returns an array of the found token
   */
  async find(findTokenDto: FindTokenDto): Promise<Token[]> {
    // TODO: add fuzzy finding feature, or searching with non exact matching
    const { skip, limit, sortField, sortValue, ...matches } = findTokenDto;

    const tokens = await this.prisma.token.findMany({
      where: matches,
      skip,
      orderBy: {
        [sortField || AllowedTokenSortingFields.value]:
          sortValue || AllowedTokenSortingValues.asc,
      },
      take: limit,
    });
    return tokens;
  }

  /**
   * updates token data by id
   * @param id - token's id to be updated
   * @param updateTokenDto - token's data to be updated
   * @returns the updated token object
   */
  async update(id: string, updateTokenDto: UpdateTokenDto): Promise<Token> {
    const token = this.prisma.token.update({
      where: { id },
      data: updateTokenDto,
    });

    return token;
  }
}

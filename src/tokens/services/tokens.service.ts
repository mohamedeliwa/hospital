import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from '../dtos/create.token.dto';
import { Token } from '@prisma/client';

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
}

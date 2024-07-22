import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { APIResponse } from 'src/interfaces/apiResponse.interface';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(userDetails: RegisterDTO): Promise<APIResponse> {
    return;
  }
}

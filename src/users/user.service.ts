import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { APIResponse } from 'src/interfaces/apiResponse.interface';
import { RegisterDTO } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(userDetails: RegisterDTO): Promise<APIResponse> {
    try {
      const { confirm_password, contact_number, email, name, password } =
        userDetails;

      if (
        !confirm_password ||
        !contact_number ||
        !email ||
        !name ||
        !password
      ) {
        return { status: 400, message: 'Enter all fields' };
      }

      const findEmailOrContact = await this.prisma.user.findMany({
        where: {
          email,
          contact_number,
        },
      });

      if (password !== confirm_password) {
        return {
          status: 400,
          message: 'Password and Confirm Password fields do not match',
        };
      }

      if (findEmailOrContact.length) {
        return {
          status: 400,
          message: 'User with this email or contact already exists',
        };
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await this.prisma.user.create({
        data: {
          contact_number,
          email,
          name,
          password: hash,
          role: 'USER',
        },
      });

      return {
        status: 200,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: error.message };
    }
  }
}

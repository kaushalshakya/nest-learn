import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dtos/register.dto';
import { Response } from 'express';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() userDetails: RegisterDTO, @Res() res: Response) {
    try {
      const response = await this.userService.registerUser(userDetails);

      if (response.status >= 400) {
        return res.status(response.status).json(response);
      }

      return res.status(response.status).json(response);
    } catch (error: any) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 500, message: error.message });
    }
  }
}

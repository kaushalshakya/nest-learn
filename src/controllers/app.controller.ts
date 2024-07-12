import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';
import { APIResponse } from 'src/interfaces/apiResponse.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response): Response<APIResponse> {
    const response = this.appService.getHello();
    return res.status(HttpStatus.OK).json({ status: 200, message: response });
  }
}

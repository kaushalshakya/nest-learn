import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: Response) {
    const response = await this.appService.getHello();
    console.log('response', response);
    return res.status(HttpStatus.OK).json({ status: 200, message: response });
  }
}

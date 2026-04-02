import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { Car } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cars')
  getAllCars(): readonly Car[] {
    const cars = this.appService.getAllCars();
    return cars;
  }

  @Get('cars/:id')
  getCarById(@Param('id') id: string): Car {
    const parsedId = parseInt(id, 10);
    const car = this.appService.getCarById(parsedId);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  @Put('cars/:id')
  updateCar(@Param('id') id: string, @Body() updates: Partial<Car>): Car {
    const parsedId = parseInt(id, 10);
    const updated = this.appService.updateCar(parsedId, updates);
    if (!updated) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return updated;
  }

  @Delete('cars/:id')
  deleteCar(@Param('id') id: string): { success: boolean } {
    const parsedId = parseInt(id, 10);
    const success = this.appService.deleteCar(parsedId);
    if (!success) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return { success };
  }
}

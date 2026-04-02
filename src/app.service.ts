import { Injectable } from '@nestjs/common';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

@Injectable()
export class AppService {
  private cars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      year: 2023,
      color: 'Blue',
      price: 28000,
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      year: 2023,
      color: 'Red',
      price: 26000,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Mustang',
      year: 2024,
      color: 'Black',
      price: 45000,
    },
    {
      id: 4,
      brand: 'BMW',
      model: '3 Series',
      year: 2023,
      color: 'Silver',
      price: 52000,
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getAllCars(): readonly Car[] {
    return [...this.cars] as const;
  }

  getCarById(id: number): Car | null {
    const car = this.cars.find((car: Car) => car.id === id);
    return car ?? null;
  }

  updateCar(id: number, updates: Partial<Car>): Car | null {
    const index = this.cars.findIndex((c: Car) => c.id === id);
    if (index === -1) {
      return null;
    }
    const car = this.cars[index];
    const updated: Car = { ...car, ...updates };
    this.cars[index] = updated;
    return updated;
  }

  deleteCar(id: number): boolean {
    const index = this.cars.findIndex((car: Car) => car.id === id);
    if (index > -1) {
      this.cars.splice(index, 1);
      return true;
    }
    return false;
  }
}

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  //para termos acesso ao repo do typeorm
  private respository: Repository<Car>;

  constructor() {
    this.respository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.respository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.respository.save(car);

    return car;
  }

  async findyByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.respository.findOne({license_plate})
    return car
  }
}

export {CarsRepository}

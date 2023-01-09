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

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.respository
    .createQueryBuilder("c")
    .where("available = :available", {available: true })

    if(brand) {
      carsQuery.andWhere("c.brand = :brand", {brand})
    }

    if(name) {
      carsQuery.andWhere("c.name = :name", {name})
    }

    if(category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {category_id})
    }

    const cars = await carsQuery.getMany();

    return cars;

  }
}

export {CarsRepository}

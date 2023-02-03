import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

  async execute({car_id, expected_return_date, user_id}: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findByOpenRentalByCar(car_id)

    if(carUnavailable) {
        throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(rentalOpenToUser) {
        throw new AppError("There's a rental in progress for user!")
    }
  }
}

export { CreateRentalUseCase };

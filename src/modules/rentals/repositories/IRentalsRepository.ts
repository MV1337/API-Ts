import { Rental } from "../infra/typeorm/entities/Rental"

interface IRentalsRepository {
    findByOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
}

export {IRentalsRepository}
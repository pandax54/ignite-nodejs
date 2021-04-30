import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest): Promise<void> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(user_id);
    const minimunDaily = 1;

    if (!rental) {
      throw new AppError("Rentals does not exists!");
    }

    // verificar o tempo de aluguel - horário atual
    const dateNow = this.dateProvider.dateNow();

    // quantas diárias - mínimo de 1 (se entregar antes de 24 horas será comprada uma diária)
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimunDaily;
    }

    // calcular atraso - para cobrança de multa
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    // resultado das multas/atraso
    if (delay > 0) {
      const additionalCharge = delay * car.fine_amount;
      total = additionalCharge;
    }

    // adicionar as multas ao total de diárias
    total += daily * car.daily_rate;
    // atualizar o end_date (devolução)
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    // update
    await this.rentalsRepository.create(rental);
    // update carro agora available novamente com a devilução
    await this.carsRepository.updateAvailable(car.id, true);
  }
}

export { DevolutionRentalUseCase };

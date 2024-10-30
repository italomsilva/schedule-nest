
import { InsuranceRepository } from '../../../domain/repositories/InsuranceRepository';
import { InsuranceOutput, formatInsurance } from '../../utils/formatting/formatInsurace';

export class GetInsurancesUseCase {
  constructor(private insuranceRepository: InsuranceRepository) {}

  async execute(): Promise<Output> {
    const insurances = await this.insuranceRepository.findAll();

    return insurances.map((insurance) => formatInsurance(insurance));
  }
}

type Output = InsuranceOutput[];

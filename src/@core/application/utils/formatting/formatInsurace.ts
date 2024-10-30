import { Insurance } from '../../../domain/entities/Insurance';

export function formatInsurance(i: Insurance): InsuranceOutput {
  return {
    id: i.id,
    name: i.name,
  };
}

export type InsuranceOutput = {
  id: string;
  name: string;
};

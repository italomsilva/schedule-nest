import { Insurance } from "../entities/Insurance";

export interface InsuranceRepository {
  findByIds(ids: string[]): Promise<Insurance[]>
  findById(id: string): Promise<Insurance | null> 
  findAll(): Promise<Insurance[]>;
  save(insurance: Insurance): Promise<void>;
  update(insurance: Insurance): void;
  delete(id: string): void;
  findByName(name: string): Promise<Insurance | null> 
}

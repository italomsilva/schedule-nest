import { Specialty } from "../entities/Specialty";

export interface SpecialtyRepository {
  findByIds(ids: string[]): Promise<Specialty[]> 
  findById(id: string): Promise<Specialty | null>;
  findAll(): Promise<Specialty[]>;
  save(specialty: Specialty): Promise<void>;
  update(specialty: Specialty): Promise<void>;
  delete(id: string):Promise<void>;
  findByName(name: string):  Promise<Specialty | null>;
}
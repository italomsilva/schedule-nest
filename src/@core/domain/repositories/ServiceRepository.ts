import { Service } from "../entities/Service";
import { Specialty } from "../entities/Specialty";

export interface ServiceRepository {
    findById(id: string): Promise<Service | null>;
    findByIds(ids: string[]): Promise<Service[]>;
    findAll(): Promise<Service[]>;
    save(service: Service): Promise<void>;
    update(service: Service): Promise<void>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Service | null>;
  }
import { Service } from 'src/@core/domain/entities/Service';

function formatService(service: Service): ServiceOutput {
  return {
    id: service.id,
    name: service.name,
    price: service.price,
    duration: service.duration,
    available: !!service.available,
  };
}

type ServiceOutput = {
  id: string;
  name: string;
  price: number;
  duration: number;
  available: boolean;
};

export { formatService, ServiceOutput };

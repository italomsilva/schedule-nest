import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Schedule } from 'src/@core/domain/entities/Schedule';
import { ProfessionalRepository } from 'src/@core/domain/repositories/ProfessionalRepository';
import { ScheduleRepository } from 'src/@core/domain/repositories/ScheduleRepository';
import { ScheduleRuleRepository } from 'src/@core/domain/repositories/ScheduleRuleRepository';

export class GetAvailableSlots {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly professionalRepository: ProfessionalRepository,
    private readonly scheduleRuleRepository: ScheduleRuleRepository,
  ) {}
  async execute(input: Input) {
    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const scheduling: Schedule[] =
      await this.scheduleRepository.findActiveByDateRange(
        professional.id,
        new Date(input.startDate.getTime() - millisecondsInDay),
        new Date(input.endDate.getTime() + millisecondsInDay),
      );

    let days = 0;
    const availableSlots = [];

    while (days < 60) {
      let currentDate = new Date(
        input.startDate.getTime() + days * millisecondsInDay,
      );
      currentDate.setHours(0, 0, 0, 0);

      days += 1;

      if (currentDate >= input.endDate) break;

      let weekday = currentDate.getDay();
      if (weekday == 0) weekday = 7;

      const allSlots =
        await this.scheduleRuleRepository.findAllByIdProfessional(
          professional.id,
        );

      const workSlots = allSlots.filter((s) => s.weekday == weekday);

      const availableSlotsInDay = [];

      for (const workSlot of workSlots) {
        const diffStart =
          new Date(workSlot.startTime).getTime() -
          new Date('2000-01-01T00:00:00.000Z').getTime();
        const diffEnd =
          new Date(workSlot.endTime).getTime() -
          new Date('2000-01-01T00:00:00.000Z').getTime();

        let workSlotStart = new Date(currentDate.getTime() + diffStart);
        let workSlotEnd = new Date(currentDate.getTime() + diffEnd);

        if (workSlotStart < input.startDate && workSlotEnd > input.startDate) {
          workSlotStart = input.startDate;
        } else if (
          workSlotStart < input.startDate &&
          workSlotEnd < input.startDate
        ) {
          continue;
        }
        if (workSlotStart < input.endDate && workSlotEnd > input.endDate) {
          workSlotEnd = input.endDate;
        } else if (
          workSlotStart > input.endDate &&
          workSlotEnd > input.endDate
        ) {
          continue;
        }
        let minutes = 0;

        while (minutes < 24 * 60) {
          const testSlotStart = new Date(
            workSlotStart.getTime() + minutes * 60 * 1000,
          );
          const testSlotEnd = new Date(
            testSlotStart.getTime() + input.duration * 60 * 1000,
          );

          minutes += professional.slotInterval;

          if (testSlotEnd > workSlotEnd) {
            console.error('Não coube 2');
            break;
          }

          if (scheduling.length == 0) {
            availableSlotsInDay.push({
              startDate: testSlotStart.toISOString(),
              endDate: testSlotEnd.toISOString(),
            });
            continue;
          }

          for (const schedule of scheduling) {
            if (testSlotEnd <= schedule.startDate) {
              availableSlotsInDay.push({
                startDate: testSlotStart.toISOString(),
                endDate: testSlotEnd.toISOString(),
              });
              break;
            } else if (
              testSlotEnd <= schedule.endDate ||
              testSlotStart < schedule.endDate
            ) {
              break;
            } else if (schedule === scheduling[scheduling.length - 1]) {
              availableSlotsInDay.push({
                startDate: testSlotStart.toISOString(),
                endDate: testSlotEnd.toISOString(),
              });
              break;
            }
          }
        }
      }

      availableSlots.push({
        date: currentDate.toISOString(),
        slots: availableSlotsInDay,
      });
    }

    return availableSlots;
  }
}

type Input = {
  professionalId: string;
  startDate: Date;
  endDate: Date;
  duration: number;
};

export function formatSlots(slots) {
  if (!slots || slots.length === 0) {
    return [];
  }
  return slots.map((slot) => {
    return {
      id: slot.id,
      professionalId: slot.professionalId,
      weekday: slot.weekday,
      startTime: new Date(slot.startTime),
      endTime: new Date(slot.endTime),
      createdAt: slot.createdAt,
      updatedAt: slot.updatedAt,
    };
  });
}

export function formatCoordinates(
  coordinates: { latitude: number; longitude: number } | null,
): string | any {
  if (!coordinates.latitude || !coordinates.longitude) {
    return {
      latitude: null,
      longitude: null,
    };
  }

  return `POINT(${coordinates.latitude} ${coordinates.longitude})`;
}

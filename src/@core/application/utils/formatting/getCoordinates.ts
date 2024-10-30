export function getCoordinates(location: string): {
  latitude: number;
  longitude: number;
} {
  const [latitude, longitude] = location
    .replace('POINT(', '')
    .replace(')', '')
    .split(' ');
  return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
}

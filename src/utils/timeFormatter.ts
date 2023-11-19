export const formatTime = (time: string): string => {
  const totalSeconds = Number(time);

  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;

  const minutes = Math.floor(remainingSeconds / 60);

  return hours !== 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

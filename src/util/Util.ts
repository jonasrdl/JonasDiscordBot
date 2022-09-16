export const convertTime = (seconds: number): string => {
  let convert = (x: any) => {
    return x < 10 ? '0' + x : x;
  };

  return (
    convert(Math.floor(Number(seconds) / (60 * 60))) +
    'h ' +
    convert(Math.floor(Number(seconds) / 60) % 60) +
    'm ' +
    convert(Math.floor(Number(seconds) % 60)) +
    's'
  );
};

export const memory = (bytes = 0, r = true): string => {
  const gigaBytes = bytes / 1024 ** 3;

  if (gigaBytes > 1) {
    return `${gigaBytes.toFixed(1)} ${r ? 'GB' : ''}`;
  }

  const megaBytes = bytes / 1024 ** 2;
  if (megaBytes > 1) {
    return `${megaBytes.toFixed(2)} ${r ? 'MB' : ''}`;
  }

  const kiloBytes = bytes / 1024;
  if (kiloBytes > 1) {
    return `${kiloBytes.toFixed(2)} ${r ? 'KB' : ''}`;
  }

  return `${bytes.toFixed(2)} ${r ? 'B' : ''}`;
};

export const getTimestampFormat = (date: Date | null): string => {
  if (!date) {
    return '?';
  }

  return `<t:${Math.floor(date.getTime() / 1000)}:R>`;
};

export const humanizeElapsedTime = (elapsedTimeInSeconds: number): string => {
  const SECONDS_IN_YEAR = 31536000;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  if (elapsedTimeInSeconds < 0) {
    return '?';
  }

  if (elapsedTimeInSeconds < 60) {
    return `${elapsedTimeInSeconds.toFixed(1)}s`;
  }

  return [
    {
      time: elapsedTimeInSeconds / SECONDS_IN_YEAR,
      label: 'y',
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_YEAR) / SECONDS_IN_DAY,
      label: 'd',
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR,
      label: 'h',
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
      label: 'm',
    },
    {
      time: elapsedTimeInSeconds % SECONDS_IN_MINUTE,
      label: 's',
    },
  ]
    .map(({ time, label }) => ({ time: Math.floor(time), label }))
    .filter(({ time }) => time)
    .map(({ time, label }) => `${time}${label}`)
    .join(' ');
};

export const getElapsedTimeInSeconds = (date: Date | null): number => {
  const MILLISECONDS_IN_SECOND = 1000;

  if (!date) {
    return -1;
  }

  const elapsedTimeInSeconds =
    (Date.now() - date.getTime()) / MILLISECONDS_IN_SECOND;

  return elapsedTimeInSeconds <= 0 ? 0 : elapsedTimeInSeconds;
};

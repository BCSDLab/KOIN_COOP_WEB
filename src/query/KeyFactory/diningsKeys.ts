export const diningsKeys = {
  all: ['dinings'] as const,
  date: (date: string) => [...diningsKeys.all, 'date', date] as const,
};

export const diningsKeys = {
  all: ['dinings'] as const,
  diningsInfo: (diningId: number) => [...diningsKeys.all, 'diningsInfo', diningId] as const,
};

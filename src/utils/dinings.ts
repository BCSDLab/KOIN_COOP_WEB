import {
  Dining, DiningType, MANAGING_PLACE,
} from 'models/dinings';

const FORBIDDEN_NAMES = ['미제공', '미운영', '-'];

export const filterDinings = (dinings: Dining[], type: DiningType): Dining[] => {
  const filteredDinings = dinings.filter((dining) => (
    dining.type === type && MANAGING_PLACE.includes(dining.place)
  ));

  const sortedDinings = filteredDinings.sort((a, b) => {
    const indexA = MANAGING_PLACE.indexOf(a.place);
    const indexB = MANAGING_PLACE.indexOf(b.place);
    return indexA - indexB;
  });

  const keywordFilteredDinings = sortedDinings.map((dining) => {
    const forbiddenName = FORBIDDEN_NAMES.includes(dining.menus[0].name);
    return { ...dining, menus: forbiddenName ? [] : dining.menus };
  });

  return keywordFilteredDinings;
};

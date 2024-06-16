import {
  Dining, DiningType, MANAGING_PLACE,
} from 'models/dinings';

export const filterDinings = (dinings: Dining[], type: DiningType): Dining[] => {
  const filteredDinings = dinings.filter((dining) => (
    dining.type === type && MANAGING_PLACE.includes(dining.place)
  ));

  const sortedDinings = filteredDinings.sort((a, b) => {
    const indexA = MANAGING_PLACE.indexOf(a.place);
    const indexB = MANAGING_PLACE.indexOf(b.place);
    return indexA - indexB;
  });

  return sortedDinings;
};

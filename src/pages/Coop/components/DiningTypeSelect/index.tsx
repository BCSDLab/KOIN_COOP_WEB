import { DiningType, DINING_TYPES, DINING_TYPE_MAP } from 'models/dinings';
import cn from 'utils/className';

import styles from './DiningTypeSelect.module.scss';

interface DiningTypeSelectProps {
  selectedDiningType: DiningType;
  setSelectedDiningType: (diningType: DiningType) => void;
}

export default function DiningTypeSelect({
  selectedDiningType, setSelectedDiningType,
}: DiningTypeSelectProps) {
  return (
    <div className={styles.container}>
      {DINING_TYPES.map((type: DiningType) => (
        <button
          key={type}
          type="button"
          className={cn({
            [styles['dining-type-button']]: true,
            [styles['dining-type-button--selected']]: selectedDiningType === type,
          })}
          onClick={() => setSelectedDiningType(type)}
        >
          {DINING_TYPE_MAP[type]}
        </button>
      ))}
    </div>
  );
}

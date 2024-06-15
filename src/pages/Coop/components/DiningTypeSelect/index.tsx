import { DiningType } from 'models/dinings';
import cn from 'utils/className';

import styles from './DiningTypeSelect.module.scss';

interface MenuTypeProps {
  diningType: DiningType;
  setDiningType: (diningType: DiningType) => void;
}

export default function DiningTypeSelect({ diningType, setDiningType }: MenuTypeProps) {
  return (
    <div className={styles.place__container}>
      <button
        className={cn({
          [styles['place__button--selected']]: diningType === 'BREAKFAST',
          [styles.place__button]: diningType !== 'BREAKFAST',
        })}
        onClick={() => setDiningType('BREAKFAST')}
        onKeyDown={(e) => e.key === 'Enter' && setDiningType('BREAKFAST')}
        type="button"
        tabIndex={0}
      >
        아침
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: diningType === 'LUNCH',
          [styles.place__button]: diningType !== 'LUNCH',
        })}
        onClick={() => setDiningType('LUNCH')}
        onKeyDown={(e) => e.key === 'Enter' && setDiningType('LUNCH')}
        type="button"
        tabIndex={0}
      >
        점심
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: diningType === 'DINNER',
          [styles.place__button]: diningType !== 'DINNER',
        })}
        onClick={() => setDiningType('DINNER')}
        onKeyDown={(e) => e.key === 'Enter' && setDiningType('DINNER')}
        type="button"
        tabIndex={0}
      >
        저녁
      </button>
    </div>
  );
}

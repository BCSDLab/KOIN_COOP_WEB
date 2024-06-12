import { DiningType } from 'models/dinings';
import cn from 'utils/className';

import styles from './MenuType.module.scss';

interface MenuTypeProps {
  selectedMenuType: DiningType;
  setSelectedMenuType: (menuType: DiningType) => void;
}

export default function MenuType({ selectedMenuType, setSelectedMenuType }: MenuTypeProps) {
  return (
    <div className={styles.place__container}>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === 'BREAKFAST',
          [styles.place__button]: selectedMenuType !== 'BREAKFAST',
        })}
        onClick={() => setSelectedMenuType('BREAKFAST')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('BREAKFAST')}
        type="button"
        tabIndex={0}
      >
        아침
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === 'LUNCH',
          [styles.place__button]: selectedMenuType !== 'LUNCH',
        })}
        onClick={() => setSelectedMenuType('LUNCH')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('LUNCH')}
        type="button"
        tabIndex={0}
      >
        점심
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === 'DINNER',
          [styles.place__button]: selectedMenuType !== 'DINNER',
        })}
        onClick={() => setSelectedMenuType('DINNER')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('DINNER')}
        type="button"
        tabIndex={0}
      >
        저녁
      </button>
    </div>
  );
}

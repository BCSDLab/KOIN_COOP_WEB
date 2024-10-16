import { useRef, useState } from 'react';

import ArrowDown from 'assets/svg/common/arrow-down.svg?react';
import useOnClickOutside from 'hooks/useOnclickOutside';
import { DiningType, DINING_TYPES, DINING_TYPE_MAP } from 'models/dinings';
import cn from 'utils/className';

import styles from './MobileDiningTypeSelect.module.scss';

interface MobileDiningTypeSelectProps {
  selectedDiningType: DiningType;
  setSelectedDiningType: (diningType: DiningType) => void;
}

export default function MobileDiningTypeSelect({
  selectedDiningType, setSelectedDiningType,
}: MobileDiningTypeSelectProps) {
  const [typeOpen, setTypeOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setTypeOpen(false));

  return (
    <div className={styles.container}>
      <div className={styles['type-title']}>{`${DINING_TYPE_MAP[selectedDiningType]} 식단`}</div>
      <div className={styles.dropdown} ref={ref}>
        <button type="button" className={styles.dropdown__trigger} onClick={() => setTypeOpen((v) => !v)}>
          <div>{DINING_TYPE_MAP[selectedDiningType]}</div>
          <ArrowDown
            className={cn({
              [styles['arrow-icon']]: true,
              [styles['arrow-icon__transform']]: typeOpen,
            })}
          />
        </button>
        {typeOpen && (
        <div className={styles['dropdown-list']}>
          {DINING_TYPES.map((type: DiningType) => (
            <button
              key={type}
              type="button"
              className={cn({
                [styles['dropdown-item']]: true,
                [styles['dropdown-item--selected']]: selectedDiningType === type,
              })}
              onClick={() => {
                setSelectedDiningType(type);
                setTypeOpen(false);
              }}
            >
              {DINING_TYPE_MAP[type]}
            </button>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}

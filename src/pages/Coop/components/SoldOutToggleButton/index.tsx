import { Dining } from 'models/dinings';
import cn from 'utils/className';

import styles from './SoldOutToggleButton.module.scss';

interface Props {
  dining: Dining;
  onClick: () => void;
}

function SoldOutToggleButton({ dining, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label="품절 버튼"
      className={cn({
        [styles.container]: true,
        [styles['container--sold-out']]: !!dining.soldout_at,
      })}
      onClick={onClick}
    >
      <span
        className={cn({
          [styles.circle]: true,
          [styles['circle--sold-out']]: !!dining.soldout_at,
        })}
      />
    </button>
  );
}

export default SoldOutToggleButton;

import { Dining } from 'models/dinings';
import cn from 'utils/className';

import styles from './SoldOutToggleButton.module.scss';

interface Props {
  menu: Dining;
  onClick: () => void;
}

function SoldOutToggleButton({ menu, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label="품절 버튼"
      className={cn({
        [styles.container]: true,
        [styles['container--sold-out']]: !!menu.soldout_at,
      })}
      onClick={onClick}
    >
      <span
        className={cn({
          [styles.circle]: true,
          [styles['circle--sold-out']]: !!menu.soldout_at,
        })}
      />
    </button>
  );
}

export default SoldOutToggleButton;

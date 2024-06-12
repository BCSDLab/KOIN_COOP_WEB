import { Dining } from 'models/dinings';
import useToggleStore from 'store/useToggleStore';

import styles from './SoldOutToggleButton.module.scss';

interface Props {
  onClick: () => void;
  menu: Dining;
}

function SoldOutToggleButton({ onClick, menu }: Props) {
  const { toggleSoldOut } = useToggleStore();
  const handleToggle = () => {
    onClick();
    toggleSoldOut(menu.id);
  };

  return (
    <div>
      <button
        type="button"
        className={styles['toggle-button']}
        onClick={handleToggle}
      >
        버튼
      </button>
    </div>
  );
}

export default SoldOutToggleButton;

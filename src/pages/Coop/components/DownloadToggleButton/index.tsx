import cn from 'utils/className';

import styles from './DownloadToggleButton.module.scss';

interface DownloadToggleButtonProps {
  isStudentCafeteriaOnly: boolean; // 학생식당(A, B, C)만 다운로드할지 여부
  onToggle: (isStudentCafeteriaOnly: boolean) => void; // 토글 클릭 시 상태 변경
}

function DownloadToggleButton({ isStudentCafeteriaOnly, onToggle }: DownloadToggleButtonProps) {
  return (
    <button
      type="button"
      aria-label="학생식당만 다운로드 토글 버튼"
      className={cn({
        [styles.container]: true,
        [styles['container--student-only']]: isStudentCafeteriaOnly, // 학생식당만 다운로드일 때의 스타일
      })}
      onClick={() => onToggle(!isStudentCafeteriaOnly)} // 토글 상태 반전
    >
      <span
        className={cn({
          [styles.circle]: true,
          [styles['circle--student-only']]: isStudentCafeteriaOnly, // 학생식당 상태일 때 스타일 적용
        })}
      />
    </button>
  );
}

export default DownloadToggleButton;

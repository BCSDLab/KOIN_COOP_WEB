/* eslint-disable no-nested-ternary */
import { Dining } from 'models/dinings';
import cn from 'utils/className';

import styles from './SoldOutMessage.module.scss';

const SOLD_OUT_MESSAGE = {
  title: '를 품절 상태로 설정할까요?',
  subtitle: '알림이 발송되니 신중하게 설정해주세요.',
  cancelTitle: '를 품절 취소로 설정할까요?',
  cancelSubtitle: '이미 발송된 알림은 취소되지 않습니다.',
  notOperating: '현재 운영 중인 식단이 아닙니다.',
} as const;

interface Props {
  isOperating: boolean;
  dining: Dining;
}

function SoldOutMessage({ isOperating, dining }: Props) {
  const { place, soldout_at: isSoldOut } = dining;

  const message = isOperating ? {
    title: isSoldOut ? place + SOLD_OUT_MESSAGE.cancelTitle
      : place + SOLD_OUT_MESSAGE.title,
    subtitle: isSoldOut ? SOLD_OUT_MESSAGE.cancelSubtitle : SOLD_OUT_MESSAGE.subtitle,
  } : {
    title: SOLD_OUT_MESSAGE.notOperating,
    subtitle: isSoldOut ? place + SOLD_OUT_MESSAGE.cancelTitle
      : place + SOLD_OUT_MESSAGE.title,
  };

  const highlight = isOperating ? (isSoldOut ? '품절 취소' : '품절 상태') : '운영 중';

  return (
    <div className={styles.message}>
      <div className={styles['message__title-box']}>
        <span className={styles.message__title}>{message.title.split(highlight)[0]}</span>
        <span className={cn({
          [styles.message__title]: true,
          [styles['message__title--blue']]: highlight.includes('품절'),
          [styles['message__title--orange']]: highlight === '운영 중',
        })}
        >
          {highlight}
        </span>
        <span className={styles.message__title}>{message.title.split(highlight)[1]}</span>
      </div>
      <span className={styles.message__subtitle}>{message.subtitle}</span>
    </div>
  );
}

export default SoldOutMessage;

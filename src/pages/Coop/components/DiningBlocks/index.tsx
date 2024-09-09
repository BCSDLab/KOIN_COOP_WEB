import { useRef, useState } from 'react';

import ArrowDown from 'assets/svg/common/arrow-down.svg?react';
import NoPhotoIcon from 'assets/svg/coop/no-photo.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import { Dining, DiningType } from 'models/dinings';
import { UPLOAD_HEADER } from 'models/file';
import ConfirmModal from 'pages/Coop/components/ConfirmModal';
import SoldOutToggleButton from 'pages/Coop/components/SoldOutToggleButton';
import { useSoldOut } from 'query/coop';
import { useGetDinings } from 'query/dinings';
import { useUploadDiningImage, useUploadUrl } from 'query/upload';
import cn from 'utils/className';
import { filterDinings } from 'utils/dinings';
import { getIsOperating } from 'utils/operate';

import axios from 'axios';
import dayjs from 'dayjs';
import { createPortal } from 'react-dom';

import styles from './DiningBlocks.module.scss';

interface DiningBlocksProps {
  diningType: DiningType;
  date: Date;
}

export default function DiningBlocks({ diningType, date }: DiningBlocksProps) {
  const { dinings } = useGetDinings(dayjs(date).format('YYMMDD'));
  const filteredDinings = filterDinings(dinings, diningType);
  const [selectedDining, setSelectedDining] = useState({} as Dining);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const isOperating = getIsOperating(diningType, dayjs(date).format('YYMMDD'));
  const [isModalOpen, , openModal, closeModal] = useBooleanState(false);
  const toggleSoldOut = useSoldOut();
  const getUploadUrl = useUploadUrl();
  const uploadDiningImage = useUploadDiningImage();
  const [hiddenDiningIdList, setHiddenDiningIdList] = useState<number[]>([]);

  const hadleSoldOutClick = (dining: Dining) => {
    setSelectedDining(dining);
    openModal();
  };

  const handleConfirm = () => {
    toggleSoldOut(selectedDining);
    closeModal();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, diningId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadUrl = await getUploadUrl(file);
      if (uploadUrl) {
        await axios.put(uploadUrl.pre_signed_url, file, UPLOAD_HEADER);
        uploadDiningImage({
          menu_id: diningId,
          image_url: uploadUrl.file_url,
        });
      }
    }
  };

  const toggleDiningExpandButton = (diningId: number) => {
    if (hiddenDiningIdList.includes(diningId)) {
      return setHiddenDiningIdList((prev) => prev.filter((id) => id !== diningId));
    }

    return setHiddenDiningIdList((prev) => [...prev, diningId]);
  };

  return (
    <div>
      <div className={styles.container}>
        {filteredDinings.map((dining) => (
          <div
            key={dining.id}
            className={styles.card}
          >
            {dining.menus.length === 0 ? (
              <div className={styles['card--not-served']}>
                {`${dining.place}에서 제공하는 식단 정보가 없습니다.`}
              </div>
            ) : (
              <div>
                <div className={styles.header}>
                  <div>
                    <span className={styles.header__title}>{dining.place}</span>
                    {!dining.image_url && <span className={styles.tag__danger}>사진없음</span>}
                    {dining.soldout_at && <span className={styles.tag__warning}>품절</span>}
                  </div>
                  <div className={styles['toggle-container']}>
                    <div className={styles['toggle-title']}>품절</div>
                    <SoldOutToggleButton
                      dining={dining}
                      onClick={() => hadleSoldOutClick(dining)}
                    />
                  </div>
                </div>
                <div className={styles['content-wrapper']}>
                  <div className={cn({
                    [styles.content]: true,
                    [styles['content--hidden']]: hiddenDiningIdList.includes(dining.id),
                  })}
                  >
                    <button
                      type="button"
                      className={styles['image-trigger']}
                      onClick={() => fileInputRefs.current[dining.id]?.click()}
                    >
                      {dining.image_url && <img src={dining.image_url} alt="식단" />}
                      {!dining.image_url && (
                      <div className={styles['no-image']}>
                        <NoPhotoIcon />
                        <div className={styles['no-image--description']}>
                          식단 사진이 없습니다.
                          <br />
                          사진을 업로드 해 주세요.
                        </div>
                      </div>
                      )}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(e, dining.id)}
                      ref={(e) => { fileInputRefs.current[dining.id] = e; }}
                    />
                    <div className={styles.menus}>
                      {dining.menus.map((menu) => (
                        <div key={menu.id} className={styles['menu-name']}>
                          {menu.name}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                <div className={styles.divider} />
                <button
                  type="button"
                  className={styles['toggle-button']}
                  onClick={() => toggleDiningExpandButton(dining.id)}
                >
                  <span>
                    식단
                    {hiddenDiningIdList.includes(dining.id) ? ' 펼치기' : ' 닫기'}
                  </span>
                  <svg
                    className={cn({
                      [styles['arrow-icon']]: true,
                      [styles['arrow-icon__transform']]: !hiddenDiningIdList.includes(dining.id),
                    })}
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.0001 8.25514L16.2773 14.5324C16.4429 14.698 16.6379 14.7786 16.8622 14.7744C17.0866 14.7701 17.2816 14.6852 17.4472 14.5196C17.6128 14.354 17.6956 14.159 17.6956 13.9346C17.6956 13.7103 17.6128 13.5153 17.4472 13.3497L11.0673 6.9571C10.9167 6.80645 10.7479 6.6948 10.5609 6.62216C10.374 6.54951 10.187 6.51318 10.0001 6.51318C9.81309 6.51318 9.62613 6.54951 9.43916 6.62216C9.2522 6.6948 9.0834 6.80645 8.93276 6.9571L2.54013 13.3497C2.37454 13.5153 2.29387 13.7124 2.29813 13.9411C2.30241 14.1697 2.38735 14.3668 2.55295 14.5324C2.71854 14.698 2.91352 14.7808 3.13786 14.7808C3.36222 14.7808 3.5572 14.698 3.7228 14.5324L10.0001 8.25514Z" fill="#CACACA" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && createPortal(
        <ConfirmModal
          isOperating={isOperating}
          dining={selectedDining}
          closeModal={closeModal}
          confirm={() => handleConfirm()}
        />,
        document.body,
      )}
    </div>
  );
}

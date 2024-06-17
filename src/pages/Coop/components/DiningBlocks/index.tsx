import {
  Suspense, useRef, useState,
} from 'react';

import { getCoopUrl } from 'api/uploadFile';
import NoPhotoIcon from 'assets/svg/coop/no-photo.svg?react';
import SoldOutIcon from 'assets/svg/coop/sold-out.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import { Dining, DiningType } from 'models/dinings';
import { FileInfo } from 'models/file';
import ConfirmModal from 'pages/Coop/components/ConfirmModal';
import SoldOutToggleButton from 'pages/Coop/components/SoldOutToggleButton';
import { useSoldOut, useUploadDiningImage } from 'query/coop';
import { useGetDinings } from 'query/dinings';
import { filterDinings } from 'utils/dinings';
import { getIsOperating } from 'utils/operate';

import axios from 'axios';
import { createPortal } from 'react-dom';

import styles from './DiningBlocks.module.scss';

interface Props {
  diningType: DiningType;
  date: string;
}

export default function DiningBlocks({ diningType, date }: Props) {
  const { dinings } = useGetDinings(date);
  const filteredDinings = filterDinings(dinings, diningType);
  const [selectedDining, setSelectedDining] = useState({} as Dining);
  const { uploadDiningImageMutation } = useUploadDiningImage();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const isOperating = getIsOperating(diningType, date);
  const [isModalOpen, , openModal, closeModal] = useBooleanState(false);
  const toggleSoldOut = useSoldOut();

  const hadleSoldOutClick = (dining: Dining) => {
    setSelectedDining(dining);
    openModal();
  };

  const handleConfirm = () => {
    toggleSoldOut(selectedDining);
    closeModal();
  };

  const uploadImage = async ({ presignedUrl, file }: FileInfo) => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
      },
    });
  };

  const handleImageChange = (menuId: number) => async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const presigned = await getCoopUrl({
        content_length: file.size,
        content_type: file.type,
        file_name: file.name,
      });
      if (presigned.data.pre_signed_url) {
        await uploadImage({ presignedUrl: presigned.data.pre_signed_url, file });
        uploadDiningImageMutation({
          menu_id: menuId,
          image_url: presigned.data.file_url,
        });
      }
    }
  };

  return (
    <>
      <Suspense fallback={<div />}>
        <div className={styles.container}>
          {filteredDinings.map((dining) => (
            <div
              key={dining.id}
              className={styles.card}
            >
              {dining.menus[0].name === '미제공' ? (
                <div className={styles['card--not-served']}>
                  {`${dining.place}에서 제공하는 식단 정보가 없습니다.`}
                </div>
              ) : (
                <div>
                  <div className={styles.header}>
                    <span className={styles.header__title}>{dining.place}</span>
                    <span className={styles.header__kcal}>{`${dining.kcal}kcal`}</span>
                    <SoldOutToggleButton
                      dining={dining}
                      onClick={() => hadleSoldOutClick(dining)}
                    />
                  </div>
                  <div className={styles.content}>
                    <button
                      type="button"
                      className={styles.content__image}
                      onClick={() => fileInputRefs.current[dining.id]?.click()}
                    >
                      {dining.image_url ? (
                        <img src={dining.image_url} alt="" className={styles.content__image} />
                      ) : (
                        !dining.soldout_at && (
                          <NoPhotoIcon />
                        )
                      )}
                      {dining.soldout_at && (
                        <div className={styles['content__image--sold-out']}>
                          <SoldOutIcon />
                        </div>
                      )}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange(dining.id)}
                      ref={(e) => { fileInputRefs.current[dining.id] = e; }}
                    />
                    <div className={styles.content__menus}>
                      {dining.menus.map((menu) => (
                        <div key={menu.id} className={styles['content__menu-name']}>
                          {menu.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Suspense>
      {isModalOpen && createPortal(
        <ConfirmModal
          isOperating={isOperating}
          dining={selectedDining}
          closeModal={closeModal}
          confirm={() => handleConfirm()}
        />,
        document.body,
      )}
    </>
  );
}

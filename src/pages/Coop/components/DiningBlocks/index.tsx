/* eslint-disable no-nested-ternary */
import {
  Suspense, useEffect, useRef, useState,
} from 'react';

import { getCoopUrl } from 'api/uploadFile';
import NoPhotoIcon from 'assets/svg/coop/no-photo.svg?react';
import SoldOutIcon from 'assets/svg/coop/sold-out.svg?react';
import { Dining, DiningType } from 'models/dinings';
import { FileInfo } from 'models/file';
import SoldOutCheckModal from 'pages/Coop/components/SoldOutCheckModal';
import SoldOutToggleButton from 'pages/Coop/components/SoldOutToggleButton';
import { getOpenMenuType, OperatingStatus, OPEN } from 'pages/Coop/hook/useGetCurrentMenuType';
import { useUploadDiningImage, useSoldOut } from 'query/coop';
import { useGetDinings } from 'query/dinings';
import { filterDinings } from 'utils/dinings';

import axios from 'axios';

import styles from './DiningBlocks.module.scss';

interface Props {
  diningType: DiningType;
  date: string;
}

export default function DiningBlocks({ diningType, date }: Props) {
  const { uploadDiningImageMutation } = useUploadDiningImage();
  const { toggleSoldOut } = useSoldOut();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Dining | null>(null);
  const formattedDate = date.replace('-', '').replace('-', '').substring(2);
  const { dinings } = useGetDinings(formattedDate);
  const filteredDinings = filterDinings(dinings, diningType);
  const [openMenu, setOpenMenu] = useState<OperatingStatus>(
    getOpenMenuType(diningType, formattedDate),
  );

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

  const handleToggleSoldOutModal = (menu: Dining) => {
    setSelectedMenu(menu);
    setIsSoldOutModalOpen(true);
  };

  const handleSoldOutModalClose = () => {
    setIsSoldOutModalOpen(false);
  };

  const handleSoldOutModalConfirm = () => {
    if (selectedMenu) {
      toggleSoldOut(selectedMenu);
      setIsSoldOutModalOpen(false);
    }
  };

  useEffect(() => {
    setOpenMenu(getOpenMenuType(diningType, formattedDate));
  }, [diningType, formattedDate]);

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
                      menu={dining}
                      onClick={() => handleToggleSoldOutModal(dining)}
                    />
                  </div>
                  <div className={styles.content}>
                    <button
                      type="button"
                      className={styles.content__image}
                      onClick={() => fileInputRefs.current[dining.id]?.click()}
                    >
                      {dining.image_url ? (
                        <img src={dining.image_url} alt="" className={styles.card__image} />
                      ) : (
                        !dining.soldout_at && (
                          <div className={styles['card__image--no-image']}>
                            <NoPhotoIcon />
                          </div>
                        )
                      )}
                      {dining.soldout_at && (
                        <div className={styles['card__image--sold-out']}>
                          <SoldOutIcon />
                          <span>품절된 메뉴입니다.</span>
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
      <SoldOutCheckModal
        isOpen={isSoldOutModalOpen}
      >
        {openMenu === OPEN ? (
          selectedMenu?.soldout_at === null ? (
            <div className={styles.modal}>
              <span className={styles.modal__header}>
                {`${selectedMenu?.place}를 `}
                <span className={styles['modal__header--primary']}>품절 상태</span>
                로 설정할까요?
              </span>
              <span className={styles.modal__description}>알림이 발송되니 신중하게 설정해주세요.</span>
              <div className={styles.modal__wrapper}>
                <button
                  type="button"
                  onClick={handleSoldOutModalClose}
                  className={styles.modal__button}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSoldOutModalConfirm}
                  className={styles['modal__button--primary']}
                >
                  품절설정
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.modal}>
              <span className={styles.modal__header}>
                {selectedMenu?.place}
                를
                <span className={styles['modal__header--primary']}>품절 취소</span>
                로 설정할까요?
              </span>
              <span className={styles.modal__description}>이미 발송된 알림은 취소되지 않습니다.</span>
              <div className={styles.modal__wrapper}>
                <button
                  type="button"
                  onClick={handleSoldOutModalClose}
                  className={styles.modal__button}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSoldOutModalConfirm}
                  className={styles['modal__button--primary']}
                >
                  품절취소
                </button>
              </div>
            </div>
          )
        ) : selectedMenu?.soldout_at === null ? (
          <div className={styles.modal}>
            <span className={styles.modal__header}>
              현재
              <span className={styles['modal__header--secondary']}>운영 중</span>
              인 식단이 아닙니다.
            </span>
            <span className={styles.modal__description}>
              {selectedMenu?.place}
              를 품절 상태로 설정할까요?
            </span>
            <div className={styles.modal__wrapper}>
              <button
                type="button"
                onClick={handleSoldOutModalClose}
                className={styles.modal__button}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSoldOutModalConfirm}
                className={styles['modal__button--secondary']}
              >
                품절설정
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.modal}>
            <span className={styles.modal__header}>
              현재
              <span className={styles['modal__header--secondary']}>운영 중</span>
              인 식단이 아닙니다.
            </span>
            <span className={styles.modal__description}>
              {selectedMenu?.place}
              를 품절 취소로 설정할까요?
            </span>
            <div className={styles.modal__wrapper}>
              <button
                type="button"
                onClick={handleSoldOutModalClose}
                className={styles.modal__button}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSoldOutModalConfirm}
                className={styles['modal__button--secondary']}
              >
                품절취소
              </button>
            </div>
          </div>
        )}
      </SoldOutCheckModal>
    </>
  );
}

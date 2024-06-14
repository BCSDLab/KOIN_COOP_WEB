/* eslint-disable no-nested-ternary */
import {
  Suspense, useEffect, useRef, useState,
} from 'react';

import { getCoopUrl } from 'api/uploadFile';
import Photo from 'assets/svg/coop/photo.svg?react';
import SoldOut from 'assets/svg/coop/sold-out.svg?react';
import {
  DiningPlace, Dining, DiningType,
} from 'models/dinings';
import SoldOutCheckModal from 'pages/Coop/components/SoldOutCheckModal';
import SoldOutToggleButton from 'pages/Coop/components/SoldOutToggleButton';
import { getOpenMenuType, OperatingStatus, OPEN } from 'pages/Coop/hook/useGetCurrentMenuType';
import { useUploadDiningImage, useSoldOut } from 'query/coop';
import { useGetDinings } from 'query/dinings';

import axios from 'axios';

import styles from './MenuCard.module.scss';

interface Props {
  selectedMenuType: DiningType;
  selectedDate: string;
}

interface FileInfo {
  file: File;
  presignedUrl: string;
}

export default function MenuCard({ selectedMenuType, selectedDate }: Props) {
  const { uploadDiningImageMutation } = useUploadDiningImage();
  const { toggleSoldOut } = useSoldOut();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Dining | null>(null);
  const formattedDate = selectedDate.replace('-', '').replace('-', '').substring(2);
  const { data: dinings } = useGetDinings(formattedDate);
  const [openMenu, setOpenMenu] = useState<OperatingStatus>(
    getOpenMenuType(selectedMenuType, formattedDate),
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

  const handleImageClick = (menuId: number) => () => {
    fileInputRefs.current[menuId]?.click();
  };

  const filteredData: Dining[] = dinings.filter((menu) => ['A코너', 'B코너', 'C코너'].includes(menu.place));

  const getDiningDataForCorner = (
    place: DiningPlace,
    diningData: Dining[],
  ): Dining | null => diningData.find((menu) => menu.place === place) || null;

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
    setOpenMenu(getOpenMenuType(selectedMenuType, formattedDate));
  }, [selectedMenuType, formattedDate]);

  return (
    <Suspense fallback={<div />}>
      <div className={styles.container}>
        {(['A코너', 'B코너', 'C코너'] as const).map((place) => {
          const menu = getDiningDataForCorner(place, filteredData);
          return (
            <div key={place} className={styles.card}>
              <div className={styles.card__header}>
                {menu && menu.changed_at !== null ? (
                  <div className={styles['card__common-wrapper']}>
                    <span className={styles.card__title}>{place}</span>
                    <div className={styles.card__kcal}>
                      {`${menu.kcal}kcal`}
                    </div>
                    <div className={styles.card__changed}>변경됨</div>
                  </div>
                ) : (
                  menu && (
                    <div className={styles['card__common-wrapper']}>
                      <span className={styles.card__title}>{place}</span>
                      <div className={styles.card__kcal}>
                        {`${menu.kcal}kcal`}
                      </div>
                    </div>
                  )
                )}
                <div className={styles['card__common-wrapper']}>
                  {menu && <span className={styles['card__sold-out']}>품절</span>}
                  {menu && (
                    <SoldOutToggleButton
                      menu={menu}
                      onClick={() => handleToggleSoldOutModal(menu)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.card__wrapper}>
                {menu ? (
                  <>
                    <div className={styles.image__wrapper}>
                      <div
                        className={styles.card__image}
                        onClick={handleImageClick(menu.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') handleImageClick(menu.id)();
                        }}
                      >
                        {menu.image_url ? (
                          <img src={menu.image_url} alt="" className={styles.card__image} />
                        ) : (
                          !menu.soldout_at && (
                            <div className={styles['card__image--add']}>
                              <Photo />
                              <span>사진 추가하기</span>
                            </div>
                          )
                        )}
                        {menu.soldout_at && (
                          <div className={styles['card__image--sold-out']}>
                            <SoldOut />
                            <span>품절된 메뉴입니다.</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.card__content}>
                      {menu.menu.map((item) => (
                        <div key={item}>{item}</div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles['card__content--none']}>
                    {place}
                    에서 제공하는 식단 정보가 없습니다.
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={menu ? handleImageChange(menu.id) : undefined}
                ref={(el) => {
                  if (menu) {
                    fileInputRefs.current[menu.id] = el;
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      <SoldOutCheckModal
        modalSize="mobile"
        hasFooter={false}
        isOpen={isSoldOutModalOpen}
        isOverflowVisible
        onCancel={handleSoldOutModalClose}
        buttonText="품절설정"
      >
        {openMenu === OPEN ? (
          selectedMenu?.soldout_at === null ? (
            <div className={styles.modal}>
              <span className={styles.modal__header}>
                {selectedMenu?.place}
                를
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
    </Suspense>
  );
}

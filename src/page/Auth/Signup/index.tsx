import { useRef } from 'react';

import Logo from 'assets/svg/auth/koin-logo.svg?react';
import Back from 'assets/svg/common/back-arrow.svg?react';
import PreviousStep from 'component/Auth/PreviousStep';
import ProgressBar from 'component/ProgressBar';
import useMediaQuery from 'hooks/useMediaQuery';

import { Link } from 'react-router-dom';

import useRegisterStep from './hooks/useRegisterStep';
import styles from './SignUp.module.scss';
import Complete from './view/CompletePage';
import TermsOfService from './view/TermsOfServicePage';

export default function Signup() {
  const { isMobile } = useMediaQuery();
  const {
    goNext, registerStep, goPrev, step,
  } = useRegisterStep();
  const termsRef = useRef<HTMLDivElement>(null);
  const STEPS = [
    <TermsOfService clickEvent={goNext} termsRef={termsRef} />,
  ];
  return (
    <div className={styles.page}>
      {!isMobile
        ? (
          <>
            {registerStep < 3 && (
              <section className={styles.section}>
                <Logo className={styles.section__logo} />
                <div className={styles.section__steps}>
                  {STEPS[registerStep]}
                </div>
              </section>
            )}
            {registerStep === 3 && <Complete />}
          </>
        )
        : (
          <>
            {registerStep < 3 && (
            <>
              {registerStep === 0 ? (
                <Link to="/login" className={styles['back-button']}>
                  <Back />
                </Link>
              ) : <PreviousStep step={step} clickEvent={goPrev} />}
              <section className={styles.section} ref={termsRef}>
                <span className={styles.section__name}>
                  사장님용
                  <br />
                  회원가입
                </span>
                <div className={styles.section__steps}>
                  {registerStep < 3 && (
                    <>
                      {registerStep > 0 && <ProgressBar step={step} />}
                      {STEPS[registerStep]}
                    </>
                  )}
                </div>
              </section>
            </>
            )}
            {registerStep === 3 && <Complete />}
          </>
        )}
    </div>
  );
}

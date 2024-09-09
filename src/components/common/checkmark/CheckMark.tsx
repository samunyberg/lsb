import { ReactNode, useEffect, useState } from 'react';
import styles from './checkmark.module.css';

interface Props {
  text?: ReactNode | string;
}

const CheckMark = ({ text }: Props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${animate && styles.animate}`}>
        <svg
          width='100'
          height='100'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`${styles.checkmark} ${animate && styles.animate}`}
        >
          <path d='M5 13l4 4L19 7' />
        </svg>
      </div>
      {text && (
        <span className={`${styles.text} ${animate && styles.animate}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default CheckMark;

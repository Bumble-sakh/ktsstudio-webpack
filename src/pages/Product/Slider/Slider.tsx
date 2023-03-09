import React, { useState } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';

import styles from './Slider.module.scss';

type SliderProps = {
  images: string[];
};

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = images.length - 1;
    } else {
      slideNumber = (slide + direction) % images.length;
    }

    setSlide(slideNumber);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.images}>
        {images.length ? (
          <img
            src={images[slide]}
            alt={`Slide ${slide}`}
            className={styles.image}
          ></img>
        ) : null}
      </div>

      <div className={styles.prev} onClick={() => changeSlide(-1)}>
        <img src={prev} alt="prev" />
      </div>
      <div className={styles.next} onClick={() => changeSlide(1)}>
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default React.memo(Slider);

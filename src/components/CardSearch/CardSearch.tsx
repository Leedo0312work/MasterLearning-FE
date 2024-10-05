import styles from './styles.module.css';

import images from '~/assets/images/default_classes.jpg';
import { memo } from 'react';
import { Link } from 'react-router-dom';

function CardSearch({findedClass, closeCard}: any) {
    return (
        <div className={styles.main}>
            <div className={styles.cover}>
            <div className={styles.course}>
                <div className={styles.img_wrap}>
                    <img className={styles.img} src={images} alt="" />
                </div>
                <div className={styles.contant}>
                    <div className={styles.text_wrap}>
                            <p className={styles.name}>{findedClass.name}</p>
                        <p className={styles.code}>{findedClass.code}</p>
                    </div>
                    <div className={styles.btn}>Tham gia</div>
                </div>
                <div className={styles.close} onClick={closeCard}>
                    &times;
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default memo(CardSearch);
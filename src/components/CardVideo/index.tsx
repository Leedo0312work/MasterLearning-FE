import clsx from 'clsx';

import styles from './styles.module.css';
import PropTypes from 'prop-types';
import dayjs from '~/packages/dayjs';

function CardVideo({
    video,
    name,
    viewer,
    time,
    created_at,
    thumbnail,
    active,
    id,
    onClick,
    censored,
}: any) {
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div onClick={handleClick} className={styles.wrap}>
            <div className={clsx(styles.card, { [styles.selected]: active })}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className={styles.top}>
                        <img
                            src={
                                'https://thaitrien.com/wp-content/uploads/2021/09/Phong-nen-hoc-online-by-Thaitrien.com-1-scaled.jpg.webp'
                            }
                            alt="Document thumbnail"
                            className={styles.thumbnail}
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.header}>{name} </div>
                        {censored === null && (
                            <div className={styles.reject}>- từ chối kiểm duyệt</div>
                        )}
                        {/* {censored === true && (
                            <div className={styles.censored}>- đã kiểm duyệt</div>
                        )} */}
                        {censored === false && (
                            <div className={styles.pending}>- đợi kiểm duyệt</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardVideo;

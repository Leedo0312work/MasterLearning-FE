import clsx from 'clsx';
import PropTypes from 'prop-types';
import dayjs from '~/packages/dayjs';

import styles from './styles.module.css';

function CardDocument({ name, viewer, createdAt, thumbnail, active, id, onClick }: any) {
    const handleClick = () => {
        onClick(id);
    };

    return (
        <div onClick={handleClick} className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.top}>
                    <img
                        src={thumbnail || 'default-thumbnail-url'}
                        alt="Document thumbnail"
                        className="tw-w-full tw-h-48 tw-object-cover"
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={clsx(styles.header, { [styles.active]: active })}>{name}</div>
                    <div className={styles.title}>
                        {viewer ? `${viewer} lượt xem` : 'Chưa có lượt xem'}
                        <br />
                        {dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDocument;

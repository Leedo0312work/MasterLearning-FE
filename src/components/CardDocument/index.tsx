// CardDocument.js
import clsx from 'clsx';
import PropTypes from 'prop-types';
import dayjs from '~/packages/dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import styles from './styles.module.css';
import { getDeleteLesson } from '~/repositories/lesson';

function CardDocument({
    name,
    viewer,
    createdAt,
    thumbnail,
    active,
    id,
    onClick,
    media,
    onDeleteSuccess,
}: any) {
    console.log('delete id: ', id);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        if (media && media.length > 0) {
            const selectedMedia = media.find((item: any) => item.type === 3 || item.type === 2);
            if (selectedMedia) {
                if (selectedMedia.type === 3) {
                    window.open(selectedMedia.url, '_blank');
                } else if (selectedMedia.type === 2) {
                    window.open(selectedMedia.url, '_blank');
                }
            }
        }
        handleMenuClose();
    };

    const handleDownload = () => {
        if (media && media.length > 0) {
            const selectedMedia = media.find((item: any) => item.type === 3 || item.type === 2);
            if (selectedMedia) {
                const link = document.createElement('a');
                link.href = selectedMedia.url;
                link.download = name;
                link.click();
            }
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        try {
            await getDeleteLesson(id);
            if (onDeleteSuccess) {
                onDeleteSuccess(id);
            }
        } catch (error) {
            console.error('Xóa lesson thất bại:', error);
        } finally {
            handleMenuClose();
        }
        handleMenuClose();
    };

    return (
        <div onClick={() => onClick(id)} className={clsx(styles.wrap, { [styles.active]: active })}>
            <div className={styles.card}>
                <div className={styles.top}>
                    <img
                        src={thumbnail || 'default-thumbnail-url'}
                        alt="Document thumbnail"
                        className={styles.thumbnail}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={clsx(styles.header)}>{name}</div>
                    <div className={styles.info}>
                        {viewer ? `${viewer} lượt xem` : 'Chưa có lượt xem'}
                        <br />
                        {dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY')}
                    </div>
                </div>
                <MoreVertIcon onClick={handleMenuClick} className={styles.menuIcon} />
            </div>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleView}>Xem</MenuItem>
                <MenuItem onClick={handleDownload}>Tải về</MenuItem>
                <MenuItem onClick={handleDelete}>Xóa</MenuItem>
            </Menu>
        </div>
    );
}

export default CardDocument;

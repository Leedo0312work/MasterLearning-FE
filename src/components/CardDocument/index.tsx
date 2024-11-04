// CardDocument.js
import clsx from 'clsx';
import PropTypes from 'prop-types';
import dayjs from '~/packages/dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import styles from './styles.module.css';
import { deleteLesson, updateLesson } from '~/repositories/lesson';
import { useNavigate } from 'react-router-dom';
import saveAs from 'file-saver'

function CardDocument({
    name,
    viewer,
    createdAt,
    thumbnail,
    active,
    media,
    onDeleteSuccess,
    classId, 
    lessonId, 
}: any) {
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        if (media && media.length > 0) {
            if (lessonId) {
                navigate(`/class/${classId}/content/0/view/${lessonId}`);
            }
        }
        handleMenuClose();
    };

    const handleDownload = () => {
        if (media && media.length > 0) {
            const selectedMedia = media.find((item: any) => item.type === 3);
            if (selectedMedia) {
                console.log('selectedMedia: ', selectedMedia);
                saveAs(selectedMedia.url, `${name}.pdf`);
            }
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        try {
            await deleteLesson(lessonId);
            if (onDeleteSuccess) {
                onDeleteSuccess(lessonId);
            }
        } catch (error) {
            console.error('Xóa lesson thất bại:', error);
        } finally {
            handleMenuClose();
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        navigate(`/class/${classId}/content/0/edit/${lessonId}`);
        handleMenuClose();
    };

    return (
        <div  className={clsx(styles.wrap, { [styles.active]: active })}>
            <div className={styles.card}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className={styles.top}>
                        <img
                            src={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbssICLw_Xz8qJ9PPcrqZaW55wY23F0b43A&s'
                            }
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
                </div>
                <MoreVertIcon onClick={handleMenuClick} className={styles.menuIcon} />
            </div>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleView}>Xem</MenuItem>
                <MenuItem onClick={handleDownload}>Tải về</MenuItem>
                <MenuItem onClick={handleDelete}>Xóa</MenuItem>
                <MenuItem onClick={handleEdit}>Sửa</MenuItem>
            </Menu>
        </div>
    );
}

export default CardDocument;

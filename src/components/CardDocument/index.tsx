// CardDocument.js
import clsx from 'clsx';
import PropTypes from 'prop-types';
import dayjs from '~/packages/dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

import styles from './styles.module.css';
import { deleteLesson } from '~/repositories/lesson';
import { useNavigate } from 'react-router-dom';
import saveAs from 'file-saver';
import { useConfirm } from 'material-ui-confirm';
import { Menu, MenuItem, IconButton, styled } from '@mui/material';
import useAuthStore from '~/store/useAuthStore';

const CustomMenuItem = styled(MenuItem)({
    fontSize: '16px',
    color: '#555',
    '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#000',
    },
});

function CardDocument({
    name,
    viewer,
    created_at,
    description,
    active,
    media,
    onDeleteSuccess,
    classId,
    lessonId,
    censored,
}: any) {
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useAuthStore((state) => state.user);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        if (lessonId) {
            navigate(`/class/${classId}/content/0/view/${lessonId}`);
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
        confirm({
            description: 'Bạn có chắc chắn muốn xóa bài giảng này?',
            title: 'Xác nhận xóa',
            confirmationText: 'Xóa',
            cancellationText: 'Hủy',
        })
            .then(async () => {
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
            })
            .catch(() => {
                handleMenuClose();
            });
    };

    const handleEdit = () => {
        navigate(`/class/${classId}/content/0/edit/${lessonId}`);
        handleMenuClose();
    };

    return (
        <div className={styles.wrap}>
            <div className={clsx(styles.card, { [styles.selected]: active })}>
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
                    <div className={styles.content}>
                        <div className={styles.name}>
                            <div className={styles.header}>{name}</div>
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
                        <div className={styles.info}>
                            <div>Mô tả: {description}</div>
                        </div>
                    </div>
                </div>
                <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <CustomMenuItem onClick={handleView}>Xem</CustomMenuItem>
                    <CustomMenuItem onClick={handleDownload}>Tải về</CustomMenuItem>
                    {user?.role === 2 && (
                        <div>
                            <CustomMenuItem onClick={handleDelete}>Xóa</CustomMenuItem>
                            <CustomMenuItem onClick={handleEdit}>Sửa</CustomMenuItem>
                        </div>
                    )}
                </Menu>
            </div>
        </div>
    );
}

export default CardDocument;

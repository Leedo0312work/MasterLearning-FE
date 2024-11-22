import styles from './styles.module.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function DocumentTableContentHeader() {
    return (
        <div className={styles.wrap}>
            <div className={styles.item}>
                <div className={styles.path_1}>
                    <div className={styles.left_path_1}></div>
                    Tên tài liệu
                    <div className={styles.right_path_1}>
                        <ArrowUpwardIcon sx={{ fontSize: 18, color: '#65697B' }} />
                    </div>
                </div>
                <div className={styles.path_2}></div>
                <div className={styles.path_3}>Thời gian tạo</div>
                <div className={styles.path_4}>Lớp</div>
                <div className={styles.path_5}>Giáo viên</div>
                <div className={styles.path_6}>Hành động</div>
            </div>
        </div>
    );
}

export default DocumentTableContentHeader;

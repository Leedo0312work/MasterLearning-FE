import CheckIcon from '@mui/icons-material/Check';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ProfileHeader() {
    return (
        <div className={styles.wrap}>
                <div className={styles.back_icon}>
                <Link to="/class" className={styles.back_link}>
                    <ArrowBackIcon className={styles.icon} />
                    <span>Quay lại</span>
                </Link>
            </div>
            <h3 className={styles.name}>Hồ sơ của tôi</h3>
            <div className={styles.button}>
                <div className={styles.icon}>
                    <CheckIcon />
                </div>
                <h6 className={styles.title}>Tài khoản an toàn </h6>
            </div>
        </div>
    );
}

export default ProfileHeader;

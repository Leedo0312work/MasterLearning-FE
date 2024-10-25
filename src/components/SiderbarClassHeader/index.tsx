import InsertLinkIcon from '@mui/icons-material/InsertLink';

import styles from './styles.module.css';
import useDetailClass from '~/hooks/useDetailClass';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SiderbarClassHeader() {
    const { id } = useParams();

    const detailClass = useDetailClass(Number(id));

    return (
        <div className={styles.header}>
            <div className={styles.back_icon}>
                <Link to="/class" className={styles.back_link}>
                    <ArrowBackIcon className={styles.icon} />
                    <span>Quay lại</span>
                </Link>
            </div>
            <h4 className={styles.header_name}>{detailClass?.name}</h4>
            <div className={styles.header_class}>
                {/* <div className={styles.header_icon}>
                    <InsertLinkIcon className={styles.icon} />
                </div> */}
                <div className={styles.class_code}>
                    <span className={styles.title}>Mã lớp:</span>
                    <span className={styles.code}>{id}</span>
                </div>
            </div>
        </div>
    );
}

export default SiderbarClassHeader;

import InsertLinkIcon from '@mui/icons-material/InsertLink';

import styles from './styles.module.css';
import useDetailClass from '~/hooks/useDetailClass';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getClassById } from '~/repositories/class';
import { useEffect, useState } from 'react';

function SiderbarClassHeader() {
    const { id }:any = useParams();

    const [code, setCode] = useState('')
    const [name, setName] = useState('')

    const fetchClass = async () => {
        try {
            const res = await getClassById(id);
            console.log(res);
            setCode(res.code)
            setName(res.name)
        } catch (error) {
            console.error('Đã xảy ra lỗi, vui lòng thử lại sau.', error);
        }
    };

    useEffect(() => {
        fetchClass();
    }, [id]);

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
                <div className={styles.class_code}>
                    <InsertLinkIcon className={styles.icon} />
                    <span className={styles.title}>Tên lớp:</span>
                    <span className={styles.code}>{name}</span>
                </div>
                <div className={styles.class_code}>
                    <InsertLinkIcon className={styles.icon} />
                    <span className={styles.title}>Mã lớp:</span>
                    <span className={styles.code}>{code}</span>
                </div>
            </div>
        </div>
    );
}

export default SiderbarClassHeader;

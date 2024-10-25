import { Link, Outlet, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { getClassById } from '~/repositories/class';

const config = [
    {
        text: 'Trong lớp',
        to: 'accepted',
    },
    {
        text: 'Chờ xét duyệt',
        to: 'pending',
        private: true,
    },
];

const NewMember = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { id: classId } = useParams();

    const [type, setType] = useState('')

    const fetchClass = async () => {
        try {
            const res = await getClassById(classId);
            console.log(res);
            setType(res.type);
        } catch (error) {
            console.error('Đã xảy ra lỗi, vui lòng thử lại sau.', error);
        }
    };

    useEffect(() => {
        fetchClass();
    }, [classId]);

    useEffect(() => {
        if (location.pathname.endsWith('/member')) {
            navigate('accepted');
        }
    }, [location, navigate]);

    const active = useMemo(() => {
        const { pathname } = location;
        const result = config.find((item) => pathname.includes(item.to));
        return result?.to;
    }, [location]);

    const isShowPending = type === 'Private';

    return (
        <div>
            <div className={styles.header}>
                {config.map((item) => (
                    (item.private ? isShowPending : true) && (
                        <Link
                            to={item.to}
                            key={item.to}
                            className={clsx([styles.headerItem, { [styles.active]: item.to === active }])}
                        >
                            <div>{item.text}</div>
                        </Link>
                    )
                ))}
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
};

export default NewMember;
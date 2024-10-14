import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

const config = [
    {
        text: 'Trong lớp',
        to: 'accepted',
    },
    {
        text: 'Chờ xét duyệt',
        to: 'pending',
    },
];

const NewMember = () => {
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <div>
            <div className={styles.header}>
                {config.map((item) => (
                    <Link
                        to={item.to}
                        key={item.to}
                        className={clsx([styles.headerItem, { [styles.active]: item.to === active }])}
                    >
                        <div>{item.text}</div>
                    </Link>
                ))}
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
};

export default NewMember;

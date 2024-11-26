import styles from './style.module.scss';
import clsx from 'clsx';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';
import { LinearProgress } from '@mui/material';

const types = [
    {
        type: 'word',
        url: 'https://shub.edu.vn/images/icons/doc_blue.png',
    },
    {
        type: 'pdf',
        url: 'https://shub.edu.vn/images/icons/pdf_red.png',
    },
    {
        type: 'otherType',
        url: 'https://shub.edu.vn/images/icons/slide.png',
    },
];

interface Prop {
    name: string;
    active?: boolean;
    id: string;
    onClick: (id: string) => void;
    created?: string;
    time: string;
    avatar: string;
}

function ScoreHomeWorkItem({ active = true, name, id, onClick, created, time, avatar }: Prop) {
    const type = 'pdf';
    const typeCurrent = types.find((item) => item.type === type);

    const handleClick = () => {
        onClick(id);
    };
    return (
        <div
            onClick={handleClick}
            style={{ marginBottom: 12 }}
            className={clsx(styles.wrap, {
                [styles.active]: active,
            })}
        >
            <div>
                {
                    <img
                        src={avatar}
                        alt="avatar"
                        style={{ width: 80, height: 80, borderRadius: '50%' }}
                    />
                }
            </div>
            <div className={styles.mid}>
                <h6 className={styles.name}>{name}</h6>
                {/*<div className={styles.loading}></div>*/}
                <div className={styles.line}>
                    <LinearProgress variant={'determinate'} />
                </div>
                <h6 className={styles.title}>{`Ngày làm : ${time}`}</h6>
                {/* <div className={styles.title}>Trắc nghiệm</div> */}
            </div>
        </div>
    );
}

export default ScoreHomeWorkItem;

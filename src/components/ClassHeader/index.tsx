import clsx from 'clsx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from './styles.module.css';
import { memo } from 'react';

function ClassHeader({ handleOpenJoinModal }: { handleOpenJoinModal: any }) {
    return (
        <div className={styles.wrap}>
            <div className={styles.left}>
                <button
                    onClick={handleOpenJoinModal}
                    className={clsx(styles.button, styles.primary)}
                >
                    Tham gia lớp học
                </button>
            </div>
            <div></div>
        </div>
    );
}

export default memo(ClassHeader);

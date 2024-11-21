import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import clsx from 'clsx';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { toast } from 'react-toastify';
interface Props {
    to: string;
    active?: boolean;
    name: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    disable?: boolean;
}

function SiderbarRightHomeWorkSettingItem({ to, active, name, Icon, disable }: Props) {
    return (
        <Link
            to={to}
            onClick={(event) => {
                if (disable) {
                    toast.error('Số lần thi của bạn đã vượt quá số lần cho phép');
                    event.preventDefault(); // Ngăn chặn chuyển trang
                }
            }}
            className={clsx(styles.bottom_item, {
                [styles.focus]: active,
                [styles.disable]: disable,
            })}
        >
            <h4 className={styles.name}>{name}</h4>
            <h5 className={styles.icon}>{React.createElement(Icon)}</h5>
        </Link>
    );
}

export default SiderbarRightHomeWorkSettingItem;

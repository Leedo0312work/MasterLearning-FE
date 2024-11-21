import * as React from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './styles.module.css';
import useAuthStore from '~/store/useAuthStore';
import { toast } from 'react-toastify';

interface Prop {
    onClick: () => void;
}

export default function HeaderMenuUser({ onClick }: Prop) {
    const navigate = useNavigate();
    const logOut = useAuthStore((state) => state.logOut);

    const configs = useMemo(() => {
        return [
            {
                text: 'Thông tin cá nhân',
                icon: PersonIcon,
                onClick: () => {
                    navigate('/profile');
                },
            },
            {
                text: 'Đăng xuất',
                icon: LogoutIcon,
                onClick: () => {
                    logOut();
                    navigate('/login');
                    toast.success('Đăng xuất thành công');
                },
            },
        ];
    }, [logOut, navigate]);

    return (
        <Paper className={styles.menu} sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                {configs.map((config, index) => (
                    <MenuItem
                        onClick={() => {
                            config.onClick();
                            onClick();
                        }}
                        key={index}
                    >
                        <ListItemIcon>
                            <Avatar className={styles.user}>
                                <config.icon className={styles.user_icon} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText className={styles.text}>{config.text}</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </Paper>
    );
}

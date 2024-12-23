import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from 'react-router-dom';

import styles from './styles.module.css';
import useAuthStore from '~/store/useAuthStore';

function LesssonContentHeader() {
    const { type } = useParams();
    const user = useAuthStore((state) => state.user);

    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <TextField
                    style={{
                        width: '100%',
                    }}
                    InputProps={{
                        style: {
                            height: 38,
                            border: 'none',
                        },
                    }}
                    variant="outlined"
                />
                <div className={styles.icon}>
                    <SearchIcon />
                </div>
            </div>
            {user?.role === 2 && <Link to={`add`} className={styles.link}>
                <Button className={styles.button}>
                    {type === '1' ? 'Tạo bài giảng' : 'Tạo tài liệu'}
                </Button>
            </Link>}
        </div>
    );
}

export default LesssonContentHeader;

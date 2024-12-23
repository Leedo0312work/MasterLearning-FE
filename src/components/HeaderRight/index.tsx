import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './styles.module.css';
import HeaderUser from '~/components/HeaderUser';

import { useEffect, useRef } from 'react';
import { Instance } from 'tippy.js';

function HeaderRight() {
    const instance = useRef<Instance | null>(null);

    return (
        <div className={styles.content_right_header}>
            <HeaderUser />
        </div>
    );
}

export default HeaderRight;

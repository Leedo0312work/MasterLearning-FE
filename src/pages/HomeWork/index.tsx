import HomeWorkContent from '~/components/HomeWorkContent';
import SiderbarRightHomeWork from '~/components/SiderbarRightHomeWork';
import LessonHeader from '~/components/LessonHeader';

import styles from './styles.module.css';
function HomeWork() {
    return (
        <div className={styles.wrap}>
            <LessonHeader name="Bài tập" />
            <div className={styles.content}>
                <HomeWorkContent />
                <SiderbarRightHomeWork />
            </div>
        </div>
    );
}

export default HomeWork;

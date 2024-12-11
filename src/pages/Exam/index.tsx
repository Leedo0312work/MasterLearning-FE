import HomeWorkContent from '~/components/HomeWorkContent';
import SiderbarRightHomeWork from '~/components/SiderbarRightHomeWork';
import LessonHeader from '~/components/LessonHeader';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

function Exam() {
    const { id } = useParams();

    return (
        <div className={styles.wrap}>
            <LessonHeader name="Kiểm tra" />
            <div className={styles.content}>
                <HomeWorkContent />
                <SiderbarRightHomeWork />
            </div>
        </div>
    );
}

export default Exam;

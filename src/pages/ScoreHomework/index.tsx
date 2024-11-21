import HomeWorkContent from '~/components/HomeWorkContent';
import LessonHeader from '~/components/LessonHeader';
import MultipleChoiceForm from '~/components/MultipleChoiceForm';
import SidebarClass from '~/components/SidebarClass';
import SiderbarRightHomeWork from '~/components/SiderbarRightHomeWork';
import SiderbarRightScoreHomeWork from '~/components/SiderbarRightScoreHomeWork';
import styles from './styles.module.css';
import ScoreHomeWorkContent from '~/components/ScoreHomeWorkContent';
function ScoreHomework() {
    return (
        <div>
            <SidebarClass />
            <div>
                <div className={styles.wrap}>
                    {/* <LessonHeader name="Bài tập" /> */}
                    <div className={styles.content}>
                        <ScoreHomeWorkContent />
                        {/* <SiderbarRightHomeWork /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScoreHomework;

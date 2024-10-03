// @ts-ignore
import styles from './styles.module.css';

const ClassListHeading = () => {
    return (
        <div className={styles.heading}>
            <div className={styles.left}>Tên lớp</div>

            <div className={styles.right}>
                <div>Học sinh</div>
                <div>Bài giảng</div>
                <div>Bài tập</div>
                <div>Tài liệu</div>
            </div>
        </div>
    )
}

export default ClassListHeading
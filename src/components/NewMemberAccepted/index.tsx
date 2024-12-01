import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getAcceptedMember } from '~/repositories/class';
import { useParams } from 'react-router-dom';

type User = any;
type Member = {
    user: User[];
};

const NewMemberAccepted = () => {
    
    const [acceptedMembers, setAcceptedMembers] = useState<Member[]>([]);

    const { id: classId } = useParams();

    useEffect(() => {
        const fetchAcceptedMember = async () => {
            try {
                const response = await getAcceptedMember(classId);
                setAcceptedMembers(response);
            } catch (error) {
                console.error('Không thể lấy danh sách member:', error);
            }
        };
        fetchAcceptedMember();
    }, [classId]);

    const renderUserAvatar = (user: any) => {
        return user.avatar 
            ? <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
            : <div className={styles.avatarPlaceholder}>{user.name.charAt(0).toUpperCase()}</div>;
    };

    const getSum = () => {
        let sum = 0;
    
        acceptedMembers.forEach(member => {
            member.user.forEach(user => {
                sum += 1;
            });
        });
    
        return sum;
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <span className={styles.title}>Bạn học</span>
                <span>{getSum()} thành viên</span>
            </div>
    
            <hr />
    
            <table className={styles.membersTable}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Ngày sinh</th>
                    </tr>
                </thead>
                <tbody>
                    {acceptedMembers.map(member => (
                        member.user.map(user => (
                            <tr key={user._id}>
                                <td className={styles.avatarCell}>
                                    {renderUserAvatar(user)}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.date_of_birth).toLocaleDateString('vi-VN')}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewMemberAccepted;

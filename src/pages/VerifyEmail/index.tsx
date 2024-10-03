
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '~/network/API'; 
import axiosIns from '~/services/axios';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const emailVerifyToken = searchParams.get('token');
    console.log(emailVerifyToken);
     const navigate = useNavigate();
  
    useEffect(() => {
      const verifyEmail = async () => {
        if (emailVerifyToken) {
          try {
            const response = await axiosIns.post('/users/verify-email', {emailVerifyToken} );
            if (response?.status === 200) {
              console.log('Received emailVerifyToken:', response.data.emailVerifyToken);
              alert('Xác thực email thành công');
              navigate('/login'); 
              toast.success('Mời bạn đăng nhập lại ');
            } else {
              throw new Error('Token verification failed');
            }
          } catch (error) {
            console.error('Xác thực email thất bại:', error);
            alert('Xác thực email thất bại. Vui lòng thử lại sau.');
          }
        }
      };
  
      verifyEmail();
    }, [emailVerifyToken]);
  
    return (
      <div>
        <h1>Đang xác thực email...</h1>
      </div>
    );
  };
  
  export default VerifyEmail;
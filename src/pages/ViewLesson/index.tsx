import SidebarLeftLesson from '~/components/SidebarLeftLesson';
import LesssonContent from '~/components/LesssonContent';
import SiderbarRightLesson from '~/components/SiderbarRightLesson';
import LessonHeader from '~/components/LessonHeader';
import useModal from '~/hooks/useModal';
import ModalAddFolder from '~/components/ModalAddFolder';

import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getLessonByClassId, getLessonById } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';
import VideoHLS from '~/utils/media/videoHLS';
import { Spin } from 'antd';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function ViewLesson() {
    const { lessonId, type } = useParams();
    const data = useQuery({
        queryKey: ['lesson', lessonId],
        queryFn: () => getLessonById(lessonId as string),
    });
    console.log('data: ', data);
    console.log('type: ', Number(type));
    if (data.isLoading)
        return (
            <Spin
                style={{ width: '100%', height: '100vh', marginTop: '50%' }}
                spinning={true}
            ></Spin>
        );

    if (Number(type) === 1)
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '80%',
                    }}
                >
                    <VideoHLS src={data?.data?.result?.media?.url} />
                </div>
            </div>
        );

    if (Number(type) === 0)
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                {/* <div style={{ height: '100vh' }}>
                    <Worker
                        workerUrl={`https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js`}
                    >
                        <Viewer fileUrl={data?.data?.result?.media[0]?.url} />
                    </Worker>
                </div> */}
                <iframe
                    src={data?.data?.result?.media[0]?.url}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="PDF Viewer"
                />
            </div>
        );
}

export default ViewLesson;

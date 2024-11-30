import { useNavigate, useParams } from 'react-router-dom';
import useMultipleChoiceTestStore from '~/store/useMultipleChoiceTestStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import PreviewFileMultipleChoice from '~/components/PreviewFileMultipleChoice';
import TimeLeftMultipleChoice from '~/components/TimeLeftMultipleChoice';
import clsx from 'clsx';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from '~/packages/dayjs';
import { getExecireDetail } from '~/repositories/execire';
import { ExecireAnswerType } from '~/enums/exercise';
import FormMultipleChoice from '../FormMultipleChoice';
import FormMultipleChoiceItem from '../FormMultipleChoiceItem';
import FormMultipleChoiceItemDo from '../FormMultipleChoiceItemDo';
import styles from './style.module.scss';
import mediaServices from '~/services/media';
import { Ianswer, IExercise, ISubmit } from '~/types/exercise';
import { fetchSubmitExecireByStudent } from '~/services/exercise';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

function DoMultipleChoiceTest() {
    const { exerciseId, id } = useParams();
    const [execire, setExecire] = useState<IExercise>({});
    const [answers, setAnswers] = useState<any>([]);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [open, setOpen] = useState(false);
    // const submit = useMultipleChoiceTestStore((state) => state.submit);
    const navigate = useNavigate();
    const onUpdate = (data: any) => {
        setAnswers((prevAnswers: any) => {
            const existingIndex = prevAnswers.findIndex((item: Ianswer) => item.no === data.no);

            if (existingIndex !== -1) {
                // Nếu đã có, cập nhật phần tử tại vị trí đó
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingIndex] = data;
                return updatedAnswers;
            } else {
                // Nếu chưa có, thêm phần tử mới vào danh sách
                return [...prevAnswers, data];
            }
        });
    };
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log('vo dya', file);
        if (!file) return;
        try {
            const response = await mediaServices.uploadPDF(file);
            const uploadedUrl = response.result?.[0]?.url;
            if (uploadedUrl) {
                console.log('check', uploadedUrl);
                setFileUrl(uploadedUrl);
                setFileName(file.name);
                console.log('check file name', file.name);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    useEffect(() => {
        if (execire.answers) {
            const data = execire.answers.map((item, index) => {
                if (item.type == ExecireAnswerType.ESSAY) {
                    return item;
                } else {
                    return { ...item, answer: '' };
                }
            });

            setAnswers(data);
        }
        // if (!exerciseId) return;
        // init(Number(exerciseId), false);
    }, [execire]);
    useEffect(() => {
        console.log('exerciseId', exerciseId);
        if (exerciseId) {
            const fetchData = async () => {
                const res = await getExecireDetail(exerciseId);
                setExecire(res.result);
            };
            fetchData();
        }
        // if (!exerciseId) return;
        // init(Number(exerciseId), false);
    }, [exerciseId]);
    console.log('checlssss', execire);
    useEffect(() => {
        // const id = setInterval(() => setTimeLeft(), 1000);
        // idInterval.current = id;
        return () => {
            clearInterval(id);
        };
    }, []);
    const handleClickOpen = () => {
        console.log('check ac', answers);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        const data: ISubmit = {
            excirse_id: exerciseId,
            file: fileUrl,
            answers: answers,
        };
        const res = await fetchSubmitExecireByStudent(data);
        if (res.status == 200) {
            toast.success('Nộp bài tập thành công');
            navigate(`/class/${id}/homework`);
        } else {
            toast.error('Nộp bài không thành công');
        }
        handleClose();
        console.log('ress', res);
        console.log('chec', data);
    };

    const handleLeave = () => {
        // leave();
        navigate(`/class/${id}/newsfeed`);
        // navigate(`/class/${id}/homework`);
    };
    const renderChooseFile = useMemo(() => {
        return (
            <div className={styles.btnChooseFile}>
                <label>
                    {!fileUrl ? 'Gửi đáp án tự luận( PDF)' : `Đã tải lên thành công: ${fileName}`}{' '}
                </label>
                <input
                    type="file"
                    accept="application/pdf"
                    id="fileUpload"
                    onChange={handleFileUpload}
                />
            </div>
        );
    }, [fileUrl, fileName]);
    return (
        <div className={'tw-grid tw-grid-cols-12'}>
            <div className={'tw-col-span-7'}>
                {!execire.file ? (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>Không tìm thấy file đề</div>
                ) : (
                    <PreviewFileMultipleChoice name={execire.name} pdfUrl={execire.file} />
                )}
            </div>
            <div className="tw-col-span-5">
                <div
                    className={'tw-flex tw-flex-col tw-justify-between'}
                    style={{ height: 'calc(100vh)' }}
                >
                    <div
                        className={'tw-bg-blue-900 tw-py-5 tw-flex tw-justify-center tw-text-white'}
                    >
                        {execire?.time_limit ? (
                            <div>
                                <div>Thời gian còn lại</div>
                                <div className={'tw-flex tw-justify-center'}>
                                    <TimeLeftMultipleChoice
                                        time={execire?.time_limit || 1}
                                        onEnd={handleSubmit}
                                    />
                                </div>
                            </div>
                        ) : (
                            'Không giới hạn thời gian'
                        )}
                    </div>
                    <div>
                        <div className={'tw-w-full tw-text-center tw-font-bold'}>
                            {/* Cau {active + 1} */}
                        </div>
                        <div className={'tw-flex tw-mt-10'}>
                            <div
                                className="tw-flex tw-flex-wrap tw-w-full"
                                style={{ maxHeight: 480, overflow: 'auto' }}
                            >
                                {execire &&
                                    execire?.answers?.map((item, index) => (
                                        <div style={{ width: '33.33%' }}>
                                            <FormMultipleChoiceItemDo
                                                type={item.type}
                                                no={item.no}
                                                key={index}
                                                point={item.point}
                                                onUpdate={onUpdate}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* <div className={'tw-flex tw-justify-center tw-mt-5'}>
                            <TextField
                                value={answers[active]?.answer}
                                onChange={(event) => changeAnswer(active, event.target.value)}
                            />
                        </div> */}
                    </div>
                    <div style={{ paddingTop: 20 }}>
                        <div style={{ paddingBottom: 12 }}>{renderChooseFile}</div>
                        <div className={'tw-flex tw-justify-center tw-mb-10'}>
                            <Button variant={'outlined'} onClick={handleLeave}>
                                Roi khoi
                            </Button>
                            <div className="tw-ml-4">
                                <Button onClick={handleClickOpen} variant={'contained'}>
                                    Nop bai
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xác nhận nộp bài?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn nộp bài không!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DoMultipleChoiceTest;

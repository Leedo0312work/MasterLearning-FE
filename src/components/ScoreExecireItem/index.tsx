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
import { getExecireDetail, getExecireDetailItem } from '~/repositories/execire';
import { ExecireAnswerType } from '~/enums/exercise';
import FormMultipleChoice from '../FormMultipleChoice';
import FormMultipleChoiceItem from '../FormMultipleChoiceItem';
import FormMultipleChoiceItemDo from '../FormMultipleChoiceItemDo';
import styles from './style.module.scss';
import mediaServices from '~/services/media';
import { Ianswer, IExercise, IExerciseDetail, ISubmit, ISubmitScore } from '~/types/exercise';
import { fetchScoreExecireByTeacher, fetchSubmitExecireByStudent } from '~/services/exercise';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import FormMultipleChoiceItemScore from '../FormMultipleChoiceItemScore';

function ScoreExecireItem() {
    const { id, itemId } = useParams();
    const [execire, setExecire] = useState<IExerciseDetail>({});
    const [answers, setAnswers] = useState<any>([]);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [questionUrl, setQuestionUrl] = useState<string>('');
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

    useEffect(() => {
        // if (execire.answers) {
        //     const data = execire.answers.map((item, index) => {
        //         if (item.type == ExecireAnswerType.ESSAY) {
        //             return item;
        //         } else {
        //             return { ...item, answer: '' };
        //         }
        //     });

        // }
        setAnswers(execire.answers);
        // if (!exerciseId) return;
        // init(Number(exerciseId), false);
    }, [execire]);
    useEffect(() => {
        console.log('itemId', itemId);
        if (itemId) {
            const fetchData = async () => {
                const res = await getExecireDetailItem(itemId);
                console.log('res', res);
                setExecire(res.result);
                setQuestionUrl(res.result.question_file);
            };
            fetchData();
        }
        // if (!exerciseId) return;
        // init(Number(exerciseId), false);
    }, [itemId]);
    console.log(execire);
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
        const data: ISubmitScore = {
            exercise_answer_id: itemId,
            answers: answers,
        };
        const res = await fetchScoreExecireByTeacher(data);
        if (res.status == 200) {
            toast.success('Gửi kết quả thành công');
            navigate(`/class/${id}/homework`);
        } else {
            toast.error('Gửi kết quả không thành công');
        }
        handleClose();
        console.log('ress', res);
        console.log('chec', data);
    };
    const handleLeave = () => {
        // leave();
        navigate(`/class/${id}/homework`);
    };
    const renderViewQuestion = useMemo(() => {
        const handleOpenUrl = () => {
            if (questionUrl) {
                window.open(questionUrl, '_blank');
            } else {
                alert('URL đề bài không tồn tại.');
            }
        };
        return (
            <div className={styles.btnChooseFile} onClick={handleOpenUrl}>
                <label>Giáo viên xem lại đề bài</label>
            </div>
        );
    }, [questionUrl]);
    return (
        <div
            className={'tw-grid tw-grid-cols-12  tw-h-screen'}
            style={{ height: 'calc(100vh - 64px)' }}
        >
            <div className={'tw-col-span-7'}>
                {!execire.file ? (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>Không có file tự luận</div>
                ) : (
                    <PreviewFileMultipleChoice
                        name={'Kết quả phần tự luận'}
                        pdfUrl={execire.file}
                    />
                )}
            </div>
            <div className="tw-col-span-5">
                <div className={'tw-flex tw-flex-col tw-justify-between  tw-h-full'}>
                    {/* <div
                        className={'tw-bg-blue-900 tw-py-5 tw-flex tw-justify-center tw-text-white'}
                    >
                        <div>
                            <div>Thoi gian con lai</div>
                            <div className={'tw-flex tw-justify-center'}>
                                <TimeLeftMultipleChoice
                                    time={execire.time_limit || 1}
                                    onEnd={handleSubmit}
                                />
                            </div>
                        </div>
                    </div> */}
                    <div>
                        <div className={'tw-w-full tw-text-center tw-font-bold'}>
                            {/* Cau {active + 1} */}
                        </div>
                        <div className={'tw-flex tw-mt-10'}>
                            <div
                                className="tw-flex tw-flex-wrap"
                                style={{ maxHeight: 500, minHeight: 200, overflow: 'auto' }}
                            >
                                {execire &&
                                    execire?.answers?.map((item, index) => (
                                        <div>
                                            <FormMultipleChoiceItemScore
                                                type={item.type}
                                                no={item.no}
                                                key={index}
                                                point={item.point}
                                                onUpdate={onUpdate}
                                                mark={true}
                                                result={item.answer}
                                                correct={item.correct}
                                                maxPoint={item.max_point}
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
                    <div>
                        <div>{renderViewQuestion}</div>
                        <div
                            className={'tw-flex tw-justify-center tw-mb-10'}
                            style={{ marginTop: 16 }}
                        >
                            <Button variant={'outlined'} onClick={handleLeave}>
                                Roi khoi
                            </Button>
                            <div className="tw-ml-4">
                                <Button onClick={handleClickOpen} variant={'contained'}>
                                    Gửi kết quả
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
                        Bạn có chắc chắn muốn gửi kết quả không?
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

export default ScoreExecireItem;

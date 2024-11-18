import { useNavigate, useParams } from 'react-router-dom';
import useMultipleChoiceTestStore from '~/store/useMultipleChoiceTestStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import PreviewFileMultipleChoice from '~/components/PreviewFileMultipleChoice';
import TimeLeftMultipleChoice from '~/components/TimeLeftMultipleChoice';
import clsx from 'clsx';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from '~/packages/dayjs';
import { getExecireDetail } from '~/repositories/execire';
import { ExecireAnswerType } from '~/enums/exercise';
import FormMultipleChoice from '../FormMultipleChoice';
import FormMultipleChoiceItem from '../FormMultipleChoiceItem';
import FormMultipleChoiceItemDo from '../FormMultipleChoiceItemDo';

interface Ianswer {
    no: number;
    point: number;
    type: ExecireAnswerType;
}
interface IExercise {
    name?: string;
    time_limit?: number;
    answers?: Ianswer[];
    file?: string;
}
function DoMultipleChoiceTest() {
    const { exerciseId, id } = useParams();
    const [execire, setExecire] = useState<IExercise>({});
    const [answers, setAnswers] = useState([]);
    const submit = useMultipleChoiceTestStore((state) => state.submit);
    const navigate = useNavigate();
    const onUpdate = () => {};
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
    console.log(execire);
    useEffect(() => {
        // const id = setInterval(() => setTimeLeft(), 1000);
        // idInterval.current = id;
        return () => {
            clearInterval(id);
        };
    }, []);

    const handleLeave = () => {
        // leave();
        navigate(`/class/${id}/homework`);
    };

    return (
        <div className={'tw-grid tw-grid-cols-12 tw-h-screen'}>
            <div className={'tw-col-span-7'}>
                <PreviewFileMultipleChoice name={execire.name} pdfUrl={execire.file} />
            </div>
            <div className="tw-col-span-5">
                <div className={'tw-flex tw-flex-col tw-justify-between tw-h-full'}>
                    <div
                        className={'tw-bg-blue-900 tw-py-5 tw-flex tw-justify-center tw-text-white'}
                    >
                        <div>
                            <div>Thoi gian con lai</div>
                            <div className={'tw-flex tw-justify-center'}>
                                <TimeLeftMultipleChoice time={execire.time_limit} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={'tw-w-full tw-text-center tw-font-bold'}>
                            {/* Cau {active + 1} */}
                        </div>
                        <div className={'tw-flex tw-mt-10'}>
                            <div className="tw-flex tw-flex-wrap">
                                {execire &&
                                    execire?.answers?.map((item, index) => (
                                        <div style={{ width: '50%' }}>
                                            <FormMultipleChoiceItemDo
                                                type={item.type}
                                                no={item.no}
                                                key={index}
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
                    <div></div>
                    <div className={'tw-flex tw-justify-center tw-mb-10'}>
                        <Button variant={'outlined'} onClick={handleLeave}>
                            Roi khoi
                        </Button>
                        <div className="tw-ml-4">
                            <Button onClick={submit} variant={'contained'}>
                                Nop bai
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoMultipleChoiceTest;

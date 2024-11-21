import useMultipleChoiceTestStore from '~/store/useMultipleChoiceTestStore';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    time: number;
    onEnd: () => Promise<void>;
}
function TimeLeftMultipleChoice({ time, onEnd }: Props) {
    // const timeLeft = useMultipleChoiceTestStore((state) => state.timeLeft);
    const [timeLeftSecond, setTimeLeft] = useState<number>(10);
    useEffect(() => {
        setTimeLeft(time * 60);
    }, [time]);
    console.log('cj', timeLeftSecond);
    const timeLeftConvert = useMemo<string>(() => {
        // const timeLenght = time.time;

        if (!timeLeftSecond) return '';

        const hour = Math.floor(timeLeftSecond / 3600);
        const minute = Math.floor((timeLeftSecond - hour * 3600) / 60);
        const second = timeLeftSecond - hour * 3600 - minute * 60;
        return `${hour}h:${minute}:${second}`;
    }, [timeLeftSecond]);
    useEffect(() => {
        if (timeLeftSecond <= 0) {
            onEnd();
            toast.success('Hết thời gian bạn đã tự động nộp bài');
            return;
        }

        // Cài đặt interval để đếm ngược
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Dọn dẹp interval khi component unmount hoặc khi timeLeft thay đổi
        return () => clearInterval(timerId);
    }, [timeLeftSecond]);
    return <div>{timeLeftConvert}</div>;
}

export default TimeLeftMultipleChoice;

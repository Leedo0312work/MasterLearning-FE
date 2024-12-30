import HeaderHomework from '~/components/HeaderHomework';
import { useCallback, useEffect, useState } from 'react';
import useStep from '~/hooks/useStep';
import HeaderStepHomework from '~/components/HeaderStepHomework';
import PreviewFileMultipleChoice from '~/components/PreviewFileMultipleChoice';
import FormMultipleChoice from '~/components/FormMultipleChoice';
import { useForm, FormProvider } from 'react-hook-form';
import { FormMultipleChoiceInterface } from '~/types/exercise';
import FormExercise from '~/components/FormExercise';
import { RoleStudent } from '~/enums/role_student';
import { ExerciseMode } from '~/enums/exercise';
import { useMutation, useQuery } from 'react-query';
import {
    getCreateMultipleChoice,
    getExercisesTeacher,
    getMultipleChoiceExerciseDetail,
    getUpdateMultipleChoice,
} from '~/repositories/exercise';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function MultipleChoiceForm() {
    const { step, previous, next } = useStep();
    const [maxPoint, setMaxPoint] = useState<number>(10);
    const location = useLocation();

    const isExam = location.pathname.includes('exam');

    const navigate = useNavigate();
    const { mutate: mutateCreate } = useMutation(
        (data: FormMultipleChoiceInterface) => {
            console.log('Data sent to getCreateMultipleChoice:', data);
            return getCreateMultipleChoice(data);
        },
        {
            onSuccess() {
                isExam ? navigate(`/class/${id}/isTest/exam`) : navigate(`/class/${id}/homework`);
                toast.success('Thêm mới bài tập thành công');
            },
            onError() {
                toast.error('Bạn không phải là giáo viên của lớp học này');
            },
        },
    );

    const { mutate: mutateUpdate } = useMutation(
        'edit',
        (data: FormMultipleChoiceInterface) => getUpdateMultipleChoice(data),
        {
            onSuccess() {
                isExam ? navigate(`/class/${id}/isTest/exam`) : navigate(`/class/${id}/homework`);
                toast.success('Chỉnh sửa bài tập thành công');
            },
        },
    );

    const { id, exerciseId } = useParams();

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await getExercisesTeacher(exerciseId);
                console.log('Assignment details received:', response);

                // Setting fetched PDF file URL to state
                setPdfUrl(response.file);
                methods.reset({
                    ...response,
                    multipleChoice: {
                        ...response.multipleChoice,
                        fileQuestionUrl: response.file, // Set the file URL here
                        numberOfQuestions: response.answers.length,
                        totalMark: response.max_point,
                    },
                });
            } catch (error) {
                console.error('Error while fetching assignment details:', error);
            }
        };

        if (exerciseId) {
            fetchExerciseDetails();
        }
    }, [exerciseId]);

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleFileUpload = (url: string) => {
        setPdfUrl(url);
    };

    const handleComplete = useCallback(
        (data: FormMultipleChoiceInterface) => {
            if (!pdfUrl) {
                toast.error('Vui lòng chọn file PDF');
                return;
            }

            const formattedData = {
                excirse_id: exerciseId,
                class_id: id,
                name: data.name,
                // file: data.multipleChoice.fileQuestionUrl || "",
                file: pdfUrl || '',
                password: data.password || '',
                time_limit: data.time_limit,
                deadline: data.deadline || undefined,
                time_to_enable: data.time_to_enable || undefined,
                is_test: Boolean(data.is_test),
                student_role: data.student_role,
                times_to_do: data.times_to_do,
                point_type: data.point_type,

                max_point: Number(data.multipleChoice.mark) || 0,
                answers: data.answers.map((item, index) => ({
                    no: item.no || index + 1,
                    type: item.type,
                    answer: item.answer || '',
                    point: Number(item.point) || 0,
                })),
            };

            if (Boolean(data?._id)) {
                mutateUpdate(formattedData);
            } else {
                mutateCreate(formattedData);
            }
        },
        [id, pdfUrl, mutateCreate, mutateUpdate],
    );

    const methods = useForm<FormMultipleChoiceInterface>({
        defaultValues: {
            multipleChoice: {
                fileQuestionUrl: '',
                mark: '10',
                numberOfQuestions: '',
            },
            answers: [],
            is_test: isExam ? true : false,
            student_role: RoleStudent.ONLY_VIEW_MARK,
            times_to_do: 1,
            point_type: 1,
            time_limit: 90,
            deadline: '',
            time_to_enable: '',
            password: '',
            name: '',
        },
        reValidateMode: 'onChange',
        mode: 'onChange',
    });
    const { getValues, setValue } = methods;
    // console.log('check tu ben ngoai', maxPoint);
    const numberOfQuestions = getValues('answers').length;
    const totalMark = Number(getValues('multipleChoice.mark') || 10);
    useEffect(() => {
        setValue('multipleChoice.mark', maxPoint);
    }, [maxPoint]);
    useEffect(() => {
        setMaxPoint(Number(getValues('multipleChoice.mark')));
    }, [getValues('multipleChoice.mark')]);
    const handleNext = useCallback(async () => {
        if (step === 1) {
            const { trigger } = methods;
            const hasError =
                (
                    await Promise.all([
                        trigger('multipleChoice.mark'),
                        trigger('multipleChoice.numberOfQuestions'),
                        trigger('answers'),
                    ])
                ).filter((item) => !item).length > 0;
            const result = getValues('answers');
            const total = result.reduce((sum, item) => sum + Number(item.point), 0);
            const pointReal = Number(getValues('multipleChoice.mark'));
            console.log('check total', total, pointReal);
            if (hasError) return;
            if (total != pointReal) {
                toast.error(
                    'Tổng điểm các câu hỏi khác với số điểm tối đa bạn vui lòng kiểm tra lại',
                );
                return;
            }
        }

        next();
    }, [step, methods, next]);

    return (
        <FormProvider {...methods}>
            <HeaderHomework
                showComplete={step === 2}
                handleComplete={methods.handleSubmit(handleComplete)}
                handlePrevious={previous}
                handleNext={handleNext}
            />

            <div>
                <div className={'tw-grid tw-grid-cols-12 tw-gap-3'}>
                    <div className="tw-col-span-6">
                        <PreviewFileMultipleChoice
                            pdfUrl={pdfUrl}
                            onFileUpload={handleFileUpload}
                        />
                    </div>
                    <div className={'tw-col-span-6'}>
                        <div>{/* <HeaderStepHomework step={step} /> */}</div>
                        <div>
                            {step === 1 && (
                                <FormMultipleChoice
                                    setMaxPoint={setMaxPoint}
                                    maxPoint={maxPoint}
                                    numberOfQuestions={numberOfQuestions}
                                    totalMark={totalMark}
                                />
                            )}
                        </div>
                        {step === 2 && <FormExercise />}
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}

export default MultipleChoiceForm;

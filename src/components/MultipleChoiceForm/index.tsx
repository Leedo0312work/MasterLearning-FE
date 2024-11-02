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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function MultipleChoiceForm() {
    const { step, previous, next } = useStep();

    const navigate = useNavigate();
    const { mutate: mutateCreate } = useMutation(
        (data: FormMultipleChoiceInterface) => {
            console.log("Data sent to getCreateMultipleChoice:", data);
            return getCreateMultipleChoice(data);
        },
        {
            onSuccess() {
                navigate(`/class/${id}/homework`);
                toast.success('Thêm mới bài tập thành công');
            },
            onError() {
                toast.error('Bạn không phải là giáo viên của lớp học này');
            }
        }
    );

    const { mutate: mutateUpdate } = useMutation(
        'edit',
        (data: FormMultipleChoiceInterface) => getUpdateMultipleChoice(data),
        {
            onSuccess() {
                navigate(`/class/${id}/homework`);
                toast.success('Chỉnh sửa bài tập thành công');
            }
        },
    );

    const { id, exerciseId } = useParams();

    // const { data } = useQuery(['detail', exerciseId], () => getExercisesTeacher(exerciseId), {
    //     onSuccess(response) {
    //         methods.reset({
    //             ...response,
    //             answers: response.multipleChoice.answers,
    //         });
    //         console.log("Thông tin bài tập nhận được:", response);
    //     },
    // });

    // console.log('dữ liệu bài tập', data)

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await getExercisesTeacher(exerciseId);
                console.log("Assignment details received:", response);

                // Setting fetched PDF file URL to state
                setPdfUrl(response.file);
                methods.reset({
                    ...response,
                    multipleChoice: {
                        ...response.multipleChoice,
                        fileQuestionUrl: response.file, // Set the file URL here
                        numberOfQuestions: response.answers.length,
                        totalMark: response.max_point,
                    }
                });
            } catch (error) {
                console.error("Error while fetching assignment details:", error);
            }
        };

        if (exerciseId) {
            fetchExerciseDetails();
        }
    }, [exerciseId]);



    // const handleComplete = useCallback((data: FormMultipleChoiceInterface) => {
    //     data.class_id = id;
    //     data.multipleChoice.answers = data.answers;
    //     data.multipleChoice.mark = Number(data.multipleChoice.mark);
    //     data.multipleChoice.numberOfQuestions = Number(data.multipleChoice.numberOfQuestions);
    //     data.multipleChoice.answers = data.answers.map((item, index) => ({
    //         ...item,
    //         order: index + 1,
    //     }));
    //     // data.preventViewQuestion = data.preventViewQuestion ? 1 : 0;
    //     data.is_test = data.is_test ? 1 : 0;
    //     data.student_role = Number(data.student_role);
    //     data.point_type = Number(data.point_type);

    //     if (Boolean(data?._id)) {
    //         mutateUpdate(data);
    //     } else {
    //         mutate(data);
    //     }
    // }, []);

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleFileUpload = (url: string) => {
        setPdfUrl(url);
    };


    const handleComplete = useCallback((data: FormMultipleChoiceInterface) => {
        const formattedData = {
            excirse_id: exerciseId,
            class_id: id,
            name: data.name,
            // file: data.multipleChoice.fileQuestionUrl || "", 
            file: pdfUrl || "",
            password: data.password || "",
            time_limit: data.time_limit,
            deadline: data.deadline || null,
            time_to_enable: data.time_to_enable || null,
            is_test: Boolean(data.is_test),
            student_role: data.student_role,
            times_to_do: data.times_to_do,
            point_type: data.point_type,

            max_point: Number(data.multipleChoice.mark) || 0,
            answers: data.answers.map((item, index) => ({
                no: item.no || index + 1,
                type: item.type,
                answer: item.answer || "",
                point: item.point || 0,
            })),
        };

        if (Boolean(data?._id)) {
            mutateUpdate(formattedData);
        } else {
            mutateCreate(formattedData);
        }
    }, [id, pdfUrl, mutateCreate, mutateUpdate]);

    const methods = useForm<FormMultipleChoiceInterface>({
        defaultValues: {
            multipleChoice: {
                fileQuestionUrl: '',
                mark: '10',
                numberOfQuestions: '',
            },
            answers: [],
            is_test: false,
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
    const { getValues } = methods;
    const numberOfQuestions = getValues("answers").length;
    const totalMark = Number(getValues("multipleChoice.mark") || 10);

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

            if (hasError) return;
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
                        <PreviewFileMultipleChoice pdfUrl={pdfUrl} onFileUpload={handleFileUpload} />
                    </div>
                    <div className={'tw-col-span-6'}>
                        <div>
                            <HeaderStepHomework step={step} />
                        </div>
                        <div>{step === 1 && <FormMultipleChoice numberOfQuestions={numberOfQuestions} totalMark={totalMark} />}</div>
                        {step === 2 && <FormExercise />}
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}

export default MultipleChoiceForm;

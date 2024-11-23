import React, { ExoticComponent, Fragment, lazy, ReactNode } from 'react';

import DefaultLayout from '~/layout/Default';

const CensorLessonUI = lazy(() => import('~/pages/Admin/LessonManagementUI'));
const CensorDocumentUI = lazy(() => import('~/pages/Admin/DocumentManagementUI'));

const Chats = lazy(() => import('~/pages/Chats'));
const Home = lazy(() => import('~/pages/Home'));
const Meeting = lazy(() => import('~/pages/Meeting'));
const Login = lazy(() => import('~/pages/Login'));
const Register = lazy(() => import('~/pages/Register'));
const Class = lazy(() => import('~/pages/Class'));
const Resource = lazy(() => import('~/pages/Resource'));
const DetailClass = lazy(() => import('~/pages/DetailClass'));
const Newsfeed = lazy(() => import('~/pages/Newsfeed'));
const AddHomework = lazy(() => import('~/pages/AddHomework'));
const ScoreHomework = lazy(() => import('~/pages/ScoreHomework'));
const ScoreExecireItem = lazy(() => import('~/components/ScoreExecireItem'));
const Schedule = lazy(() => import('~/pages/Schedule'));
const Profile = lazy(() => import('~/pages/Profile'));
const Member = lazy(() => import('~/pages/Member'));
const NewMember = lazy(() => import('~/pages/NewMember'));
const Lesson = lazy(() => import('~/pages/Lesson'));
const LessonAdd = lazy(() => import('~/pages/LessonAdd'));
const ViewLesson = lazy(() => import('~/pages/ViewLesson'));
const LessonEdit = lazy(() => import('~/pages/EditLesson'));
const HomeWork = lazy(() => import('~/pages/HomeWork'));
const ScoreTable = lazy(() => import('~/pages/ScoreTable'));
const EditHomework = lazy(() => import('~/pages/EditHomework/index'));
const TestHomework = lazy(() => import('~/pages/TestHomework/index'));
const DoHomework = lazy(() => import('~/pages/DoHomework/index'));
const VerifyEmail = lazy(() => import('~/pages/VerifyEmail/index'));
const ForgotPassword = lazy(() => import('~/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('~/pages/ResetPassword'));
const AdminLayout = lazy(() => import('~/pages/AdminLayout'));
const CheckEmailNoti = lazy(() => import('~/pages/CheckEmailNoti'));

const NewMemberAccepted = lazy(() => import('~/components/NewMemberAccepted'));
const NewMemberPending = lazy(() => import('~/components/NewMemberPending'));
const Exam = lazy(() => import('~/pages/Exam'));

interface Route {
    path: string;
    component: React.LazyExoticComponent<any>;
    layout?: any;
    private?: boolean;
    children?: RouteChildren[];
    role?: any;
}

interface RouteChildren {
    path: string;
    component: React.LazyExoticComponent<any>;
    children?: RouteChildren1[];
}

interface RouteChildren1 {
    path: string;
    component: React.LazyExoticComponent<any>;
    layout?: any;
}

const routes: Route[] = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/check-email-noti',
        component: CheckEmailNoti,
    },
    {
        path: '/reset-password',
        component: ResetPassword,
    },
    {
        path: '/class',
        component: Class,
        layout: DefaultLayout,
        // private: true,
        // children: [
        //     {
        //         path: 'myclass',
        //         component: MyClass,
        //     },
        //     {
        //         path: 'hiddenclass',
        //         component: HiddenClass,
        //     },
        // ],
    },

    {
        path: '/profile',
        component: Profile,
        layout: DefaultLayout,
        private: true,
    },
    {
        path: '/resource',
        component: Resource,
        layout: DefaultLayout,
    },
    {
        path: '/verify-email',
        component: VerifyEmail,
    },
    {
        path: '/admin',
        component: AdminLayout,
        private: true,
        layout: DefaultLayout,
        children: [
            {
                path: 'censorPost',
                component: Newsfeed,
            },
            {
                path: 'manageAccount',
                component: Profile,
            },
            {
                path: 'manageMember',
                component: Member,
            },
            {
                path: 'manageClass',
                component: Class,
            },
            {
                path: 'manageLesson',
                component: CensorLessonUI,
            },
            {
                path: 'manageDocument',
                component: CensorDocumentUI,
            },
            // {
            //     path: 'censorLesson',
            //     component: Lesson,
            // },
            // {
            //     path: 'censorDocument',
            //     component: CensorDocumentUI,
            // },
        ],
    },
    {
        path: '/class/:id',
        component: DetailClass,
        layout: DefaultLayout,
        private: true,
        children: [
            {
                path: 'newsfeed',
                component: Newsfeed,
            },
            {
                path: 'schedule',
                component: Schedule,
            },
            {
                path: 'member',
                component: NewMember,
                children: [
                    {
                        path: 'accepted',
                        component: NewMemberAccepted,
                        layout: DefaultLayout,
                    },
                    {
                        path: 'pending',
                        component: NewMemberPending,
                    },
                ],
            },
            {
                path: 'scoretable',
                component: ScoreTable,
            },
            {
                path: 'homework',
                component: HomeWork,
            },
            {
                path: 'homework/:id/score',
                component: ScoreHomework,
            },
            {
                path: 'homework/:id/score/:itemId',
                component: ScoreExecireItem,
            },
            {
                path: 'meeting',
                component: Meeting,
            },
            {
                path: 'chat',
                component: Chats,
            },
            {
                path: 'chat',
                component: HomeWork,
            },
            {
                path: 'isTest/exam',
                component: Exam,
            },
            {
                path: 'content/:type',
                component: Lesson,
            },

            {
                path: 'content/:type/add',
                component: LessonAdd,
            },
            {
                path: 'content/:type/edit/:lessonId',
                component: LessonAdd,
            },
            {
                path: 'content/:type/view/:lessonId',
                component: ViewLesson,
            },
        ],
    },
    {
        path: '/class/:id/homework/add',
        component: AddHomework,
        layout: Fragment,
        private: true,
    },
    {
        path: '/class/:id/homework/:exerciseId/edit',
        component: EditHomework,
        layout: Fragment,
        private: true,
    },
    // {
    //     path: '/class/:id/homework/:exerciseId/score',
    //     component: ScoreHomework,
    //     layout: DefaultLayout,
    //     private: true,
    // },

    {
        path: '/class/:id/isTest/exam/add',
        component: AddHomework,
        layout: Fragment,
        private: true,
    },
    {
        path: '/class/:id/isTest/exam/:exerciseId/edit',
        component: EditHomework,
        layout: Fragment,
        private: true,
    },

    {
        path: '/class/:id/homework/:exerciseId/test',
        component: TestHomework,
        layout: Fragment,
    },
    {
        path: '/class/:id/homework/:exerciseId/do',
        component: DoHomework,
        layout: Fragment,
        private: true,
    },
];

export default routes;

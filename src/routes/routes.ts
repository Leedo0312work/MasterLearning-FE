import React, { ExoticComponent, Fragment, lazy, ReactNode } from 'react';

import DefaultLayout from '~/layout/Default';

const Home = lazy(() => import('~/pages/Home'));
const Login = lazy(() => import('~/pages/Login'));
const Register = lazy(() => import('~/pages/Register'));
const Class = lazy(() => import('~/pages/Class'));
const Resource = lazy(() => import('~/pages/Resource'));
const DetailClass = lazy(() => import('~/pages/DetailClass'));
const Newsfeed = lazy(() => import('~/pages/Newsfeed'));
const AddHomework = lazy(() => import('~/pages/AddHomework'));
const Schedule = lazy(() => import('~/pages/Schedule'));
const Profile = lazy(() => import('~/pages/Profile'));
const Member = lazy(() => import('~/pages/Member'));
const Lesson = lazy(() => import('~/pages/Lesson'));
const LessonAdd = lazy(() => import('~/pages/LessonAdd'));
const LessonEdit = lazy(() => import('~/pages/LessonEdit'));
const HomeWork = lazy(() => import('~/pages/HomeWork'));
const ScoreTable = lazy(() => import('~/pages/ScoreTable'));
const EditHomework = lazy(() => import('~/pages/EditHomework/index'));
const TestHomework = lazy(() => import('~/pages/TestHomework/index'));
const DoHomework = lazy(() => import('~/pages/DoHomework/index'));
const VerifyEmail = lazy(() => import('~/pages/VerifyEmail/index'));
const ForgotPassword = lazy(() => import('~/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('~/pages/ResetPassword')); 
const CheckEmailNoti = lazy(() => import('~/pages/CheckEmailNoti'));




interface Route {
    path: string;
    component: React.LazyExoticComponent<any>;
    layout?: any;
    private?: boolean;
    children?: RouteChildren[];
}

interface RouteChildren {
    path: string;
    component: React.LazyExoticComponent<any>;
}

const routes: Route[] = [
    {
        path: '/',
        component: Home,
        // layout: DefaultLayout,
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
        private: true,
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
                component: Member,
            },
            {
                path: 'lesson',
                component: Lesson,
            },
            {
                path: 'scoretable',
                component: ScoreTable,
            },
            {
                path: 'lesson/add',
                component: LessonAdd,
            },
            {
                path: 'lesson/:lessonId/edit',
                component: LessonEdit,
            },
            {
                path: 'homework',
                component: HomeWork,
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

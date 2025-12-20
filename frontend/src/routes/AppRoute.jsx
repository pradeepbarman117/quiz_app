import AppLayout from '@/layout/AppLayout'
import ForgetPasswordPage from '@/pages/auth/ForgetPasswordPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ContestListPage from '@/pages/contest/ContestListPage'
import DuelContestPage from '@/pages/contest/DuelContestPage'
import HomePage from '@/pages/home/HomePage'
import LeaderboardPage from '@/pages/leaderboard/LeaderboardPage'
import OnboardingPage from '@/pages/onboarding/OnboardingPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import DailyQuizInstructionPage from '@/pages/quiz/DailyQuizInstructionPage'
import QuizPlayPage from '@/pages/quiz/QuizPlayPage'
import QuizResultPage from '@/pages/quiz/QuizResultPage'
import QuizRewardPage from '@/pages/quiz/QuizRewardPage'
import RewardPage from '@/pages/reward/RewardPage'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <OnboardingPage /> },
            {
                path: '/home',
                element: <HomePage />,
            },
            {
                path: 'quiz',
                children: [
                    {
                        path: 'daily',
                        element: <DailyQuizInstructionPage />,
                    },
                    {
                        path: 'daily/:categoryName/:categoryId/play/:roomId',
                        element: <QuizPlayPage />,
                    },
                    {
                        path: 'daily/:categoryName/:categoryId/result/:roomId',
                        element: <QuizResultPage />,
                    },
                    {
                        path: 'reward/:rewardId',
                        element: <QuizRewardPage />,
                    },
                    // Contest Routes
                ],
            },
            {
                path: 'contest',
                children: [
                    {
                        path: 'list',
                        element: <ContestListPage />,
                    },
                    {
                        path: 'duel/:categoryId',
                        element: <DuelContestPage />,
                    },
                    {
                        path: 'duel/:categoryName/:categoryId/play/:roomId',
                        element: <QuizPlayPage />,
                    },
                    {
                        path: 'duel/:categoryName/:categoryId/result/:roomId',
                        element: <QuizResultPage />,
                    },
                ],
            },
            {
                path: '/leaderboard',
                element:<LeaderboardPage/>,
            },
            {
                path: '/rewards',
                element:<RewardPage/>,
            },
            {
                path:'/profile',
                element:<ProfilePage/>,
            }
        ],
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgetPasswordPage />,
    }

])


export { router }
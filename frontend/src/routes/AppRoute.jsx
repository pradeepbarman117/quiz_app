import AppLayout from '@/layout/AppLayout'
import OnboardingPage from '@/pages/onboarding/OnboardingPage'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <OnboardingPage /> },
        ],
    },
])


export { router }
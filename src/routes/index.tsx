import { createBrowserRouter } from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout'
import DashboardLayout from '@/layouts/DashboardLayout'

import Home from '@/pages/Home'
import Courses from '@/pages/Courses'
import CourseDetail from '@/pages/CourseDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Learn from '@/pages/Learn'
import StudentDashboard from '@/pages/StudentDashboard'
import InstructorDashboard from '@/pages/InstructorDashboard'
import AdminDashboard from '@/pages/AdminDashboard'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/courses', element: <Courses /> },
      { path: '/courses/:slug', element: <CourseDetail /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <StudentDashboard /> },
      { path: '/instructor', element: <InstructorDashboard /> },
      { path: '/admin', element: <AdminDashboard /> },
    ],
  },
  // Le lecteur de cours est en plein écran, sans layout (comme Udemy)
  { path: '/learn/:courseSlug/:lessonId', element: <Learn /> },
  { path: '*', element: <NotFound /> },
])
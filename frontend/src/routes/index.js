import { Navigate } from 'react-router-dom'
import MainPage from '../Commponents/MainPage/MainPage'
import LoginPage from '../Commponents/Login/LoginPage/LoginPage'
import SignupPage from '../Commponents/Login/SignupPage/SignupPage'
import FindPwdPage from '../Commponents/Login/FindPwdPage/FindPwdPage'
import ChatPage from '../Commponents/Chat/ChatPage'
import { ShowCommentPage } from '../Commponents/ShowCommentPage/ShowCommentPage'
import { PersonalPage } from '../Commponents/PersonalPage/PersonalPage'
export default [
    {
        path: '/',
        element: <Navigate to='/login'></Navigate>
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>,
    },
    {
        path: '/mainpage',
        element: <MainPage></MainPage>,
    },
    {
        path: '/register',
        element: <SignupPage></SignupPage>,
    },
    {
        path: '/findPwd',
        element: <FindPwdPage></FindPwdPage>,
    },
    {
        path: '/chat',
        element: <ChatPage></ChatPage>,
    },
    {
        path: '/comment',
        element: <ShowCommentPage></ShowCommentPage>,
    },
    {
        path: '/personal',
        element: <PersonalPage></PersonalPage>,
    }
]
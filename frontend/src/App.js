import logo from './logo.svg';
import './App.css';
import LoginPage from './Commponents/Login/LoginPage/LoginPage';
import SignupPage from './Commponents/Login/SignupPage/SignupPage';
import MainPage from './Commponents/MainPage/MainPage';
import { useRoutes } from 'react-router-dom';
import routes from './routes'
import ChatPage from './Commponents/Chat/ChatPage';
import { OrderCard } from './Commponents/MainPage/OrderCard';
import { CommentPage } from './Commponents/Comment/CommentPage';
import { PersonalPage } from './Commponents/PersonalPage/PersonalPage';
import { NewOrder } from './Commponents/NewOrder/NewOrder';
import { OrderInfo } from './Commponents/OrderInfo/OrderInfo';
import { ShowCommentPage } from './Commponents/ShowCommentPage/ShowCommentPage';
import ChargeMoneyCard from './Commponents/PersonalPage/ChargeMoneyCard';
import EditInfoCard from './Commponents/PersonalPage/EditInfoCard';
function App() {
  const RouteTable = useRoutes(routes)
  return (
    <>
      {RouteTable}
    </>
    // <LoginPage />
    // <SignupPage />
    // <MainPage />
    // <ChatPage />
    // <CommentPage />
    // <PersonalPage />
    // <NewOrder />s
    // <OrderInfo />
    // <ShowCommentPage />
    // <EditInfoCard></EditInfoCard>
    // <ChargeMoneyCard />
  );
}

export default App;

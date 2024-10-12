import { Route, Routes } from 'react-router-dom';
import Signup from './pages/CreateEmployee';
import SignIn from './pages/SignIn';
import AdminPage from './components/AdminPage';
import UserInfo from './components/userInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}></Route>
      <Route path="/createuser" element={<Signup/>}></Route>
      <Route path="/adminpage" element={<AdminPage/>}></Route>
      <Route path="/userinfo" element={<UserInfo/>}></Route>
      <Route path="*" element={<h1>KYa Haal HAI Mitr</h1>}></Route>
    </Routes>
  )
}

export default App

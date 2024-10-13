import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import AdminPage from './components/AdminPage';
import UserInfo from './components/userInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}></Route>
      <Route path="/adminpage" element={<AdminPage/>}></Route>
      <Route path="/userinfo" element={<UserInfo/>}></Route>
      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  )
}

export default App

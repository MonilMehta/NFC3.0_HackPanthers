
import './App.css'
import {  
  BrowserRouter,  
  Route,  
  Routes,  
  Link  
} from 'react-router-dom';  
import Signin from './pages/Singin/Signin';
import Signup from './pages/Singup/Signup';
import Landing from './pages/landing/Landing';
import Mainpage from './pages/main/Mainpage';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
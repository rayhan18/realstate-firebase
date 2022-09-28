
import {  Routes ,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

import ForgePassword from './Pages/ForgetPassword';
import Home from './Pages/Home';
import Offers from './Pages/Offers';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Header/>
        <Routes >
          <Route path="/"  element={<Home/>} />
          <Route path="/Offers"  element={<Offers/>} />
          <Route path="/Profile"  element={<Profile/>} />
          <Route path="/Sign-in"  element={<SignIn/>} />
          <Route path="/Sign-up"  element={<Signup/>} />
          <Route path="/ForgePassword"  element={<ForgePassword/>} />
          
         </Routes>

         <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
{/* Same as */}
<ToastContainer />
    </div>
  );
}

export default App;

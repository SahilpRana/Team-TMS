import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/Homepage';
import AboutUsPage from './components/AboutUsPage';
import ResourcePage from './components/ResourcePage';
import ContactUs from './components/ContactUs';

import TaskQueue from './components/TaskQueue';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import ProfilePage from './components/Profile';
import SignUp from './components/SignUp';
import EmissionsCalculator from './components/EmissionCalculator';
import Logout from './components/Logout';

export default function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [parentState, setParentState] = useState(false);
  const [activeProfile, setActiveProfile] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar setParentState={setParentState} isLoggedIn={parentState} />
        <Routes>
          <Route exact path='/' element={<HomePage parentstate={parentState} />} />
          <Route exact path='/upload' element={<UploadPage user={activeProfile} setuser={setActiveProfile} setParentState={setParentState}/>} />
          <Route exact path='/task-queue' element={<TaskQueue user={activeProfile}/>} />
          <Route
            exact
            path='/profile'
            element={<ProfilePage user={activeProfile} setuser={setActiveProfile} setParentState={setParentState} />}
          />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/about' element={<AboutUsPage />} />
          <Route exact path='/resources' element={<ResourcePage />} />
          <Route
            exact
            path='/login'
            element={<LoginPage setActiveProfile={setActiveProfile} setParentState={setParentState} />}
          />

          <Route exact path='/ec' element={<EmissionsCalculator />} />
          <Route exact path='/logout' element={<Logout setActiveProfile={setActiveProfile} setParentState={setParentState} />} />


          <Route exact path='/contact' element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

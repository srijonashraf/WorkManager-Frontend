import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { isLoggedIn,setLoggedIn } from "./helper/SessionHelper.js";
import Error from "./components/404.jsx";
import RegisterPage from './page/RegisterPage';
import NewTaskPage from './page/NewTaskPage';
import TaskListPage from "./page/TaskListPage.jsx";
import DashboardPage from "./page/DashboardPage.jsx";
import SendOTPPage from './page/SendOTPPage';
import VerifyOTPPage from './page/VerifyOTPPage';
import CreatePasswordPage from './page/CreatePasswordPage';
import ProfilePage from './page/ProfilePage';

function App() {
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    return (
      <Fragment>
        <Router>
          <AppNavbar />
          <Routes>
            <Route exact path="/task" element={<NewTaskPage />} />
            <Route exact path="/allTask" element={<TaskListPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/profile" element={<ProfilePage/>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Router>
          <Routes>
            <Route exact path="*" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/sendOTP" element={<SendOTPPage/>} />
            <Route exact path="/verifyOTP" element={<VerifyOTPPage/>} />
            <Route exact path="/createPassword" element={<CreatePasswordPage/>} />
           
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;

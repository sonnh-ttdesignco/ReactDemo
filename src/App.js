import { Route, Routes } from "react-router-dom";
import './App.css';
import './_root.scss';

//import components
import MainNavigation from './components/layouts/MainNavigation';
import Dashboard from "./components/pages/Dashboard";
import Calendar from './components/pages/calendar/Calendar';
import LeaveHistory from "./components/pages/LeaveHistory";
import LeaveForm from "./components/pages/LeaveForm.js";

function App() {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/leavehistory' element={<LeaveHistory />} />
        <Route path='/leaveform' element={<LeaveForm />} />
      </Routes>
    </>
  );
}

export default App;
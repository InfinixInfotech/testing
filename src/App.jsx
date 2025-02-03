import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import store from "./Redux/Storage/store";
import { Provider } from "react-redux";
import MailBox from "./Pages/MailBox/MailBox";
import Compose from "./Pages/MailBox/Compose/Compose";
import Drafts from "./Pages/MailBox/Drafts/Drafts";
import SentMail from "./Pages/MailBox/SentMail/SentMail";
import Starred from "./Pages/MailBox/Starred/Starred";
import Template from "./Components/Template/Template";
import WarningMail from "./Components/Template/ModernPoster/WarningMail";
import GeneralMail from "./Components/Template/ModernPoster/GeneralMail";
import EmailDetails from "./Pages/EmailDetails/EmailDetails";
import DraftEdit from "./Pages/DraftEdit/DraftEdit ";
import Login from "./Components/Login/Login"
import ProtecteRoute from "./Components/ProtectedRooute/ProtectRoute";
import Promotion from "./Components/Template/ModernPoster/Promotion";
import Target from "./Components/Template/ModernPoster/Target";


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route
            path="/*"
            element={
              <ProtecteRoute>
                <div>
                  <Navbar />
                  <div className="d-flex">

                  <Sidebar />
                  <div className="p-4" style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/mailbox" element={<MailBox/>} />
                      <Route path="/email/:id" element={<EmailDetails />} />
                      <Route path="/compose" element={<Compose />} />
                      <Route path="/drafts" element={<Drafts />} />
                      <Route path="/edit/:id" element={<DraftEdit />} />
                      <Route path="/sentmail" element={<SentMail />} />
                      <Route path="/starred" element={<Starred />} />
                      <Route path="/template" element={<Template />} />
                      <Route path="/warning" element={<WarningMail />} />
                      <Route path="/general" element={<GeneralMail />} />
                      <Route path="/promotion"element={<Promotion />} />
                      <Route path="/target" element={<Target/>} />

                    </Routes>
                  </div>

                </div>
                </div>


              </ProtecteRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

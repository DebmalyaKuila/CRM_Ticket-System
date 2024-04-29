import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css'

import Entry from "./pages/Entry.page/entryLogin.jsx"
import ResetPassword from './pages/Entry.page/password-reset.jsx';

import DefaultLayout from './layout/defaultLayout'
import Dashboard from './pages/Dashboard.page/dashboard'
import AddTicketsPage from './pages/AddTickets.page/addTickets'
import TicketList from './pages/TicketListing.page/TicketList.page.jsx'
import TicketPage from './pages/Ticket.page/TicketPage.jsx'

function App() {


  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={ <Entry/>} />
          <Route path="/reset-password" element={ <ResetPassword/>} />
          <Route path="/dashboard" element={<DefaultLayout><Dashboard/></DefaultLayout>} />
          <Route path="/tickets" element={<DefaultLayout><TicketList/></DefaultLayout>} />
          <Route path="/add-ticket" element={<DefaultLayout><AddTicketsPage/></DefaultLayout>} />
          <Route path="/ticket/:ticketId" element={<DefaultLayout><TicketPage/></DefaultLayout>} />
      </Routes>
    </Router>
      
      
    </>
  )
}

export default App

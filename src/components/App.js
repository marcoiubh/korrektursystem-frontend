import { Route, Routes } from 'react-router-dom';
import '../App.css';
import Home from './home';
import NavBar from './navbar';
import Tickets from './tickets';
import Login from './login';
import TicketDetails from './ticketDetails';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/404/NotFound';
import HomestayReg from './components/HomestayReg';
import Layout from './pages/homestayOwner/Layout';
import Dashboard from './pages/homestayOwner/Dashboard';
import AddRoom from './pages/homestayOwner/AddRoom';
import ListRoom from './pages/homestayOwner/ListRoom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHomestayReg } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHomestayReg && <HomestayReg />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
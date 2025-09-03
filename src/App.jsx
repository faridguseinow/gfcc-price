import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import { AliveScope, KeepAlive } from 'react-activation';

import './App.scss';
import './reset.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Folders from './pages/Folders';
import Vacations from './pages/Vacations';

import Footer from './layouts/Footer';

import PinLock from "./PinLock";


function App() {
  const [unlocked, setUnlocked] = useState(false); // состояние блокировки

  return (
    <>
      {/* {unlocked ? ( */}
        <Router>
          <AliveScope>

            <Routes>
              <Route path="/home" element={<KeepAlive><Home /></KeepAlive>} />
              <Route path="/vacations" element={<KeepAlive><Vacations /></KeepAlive>} />
              <Route path="/folders" element={<KeepAlive><Folders /></KeepAlive>} />
              <Route path="/search" element={<KeepAlive><Search /></KeepAlive>} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>

            <Footer />
          </AliveScope>
        </Router>
      {/* ) : (
        <PinLock onUnlock={() => setUnlocked(true)} />
      )} */}
    </>
  );
}

export default App;

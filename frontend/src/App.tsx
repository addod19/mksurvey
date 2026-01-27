import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import LoaderTipper from './pages/LoaderTipper';
import MachineRentals from './pages/MachineRentals';
import Blocks from './pages/Blocks';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import LoaderAdmin from './pages/dashboard/LoaderAdmin';
import TipperAdmin from './pages/dashboard/TipperAdmin';
import SurveyAdmin from './pages/dashboard/SurveyAdmin';
import BlocksAdmin from './pages/dashboard/BlocksAdmin';
import MainAdmin from './pages/dashboard/MainAdmin';

function App() {

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="content-card">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loaderTipper" element={<LoaderTipper />} />
              <Route path="/machineRentals" element={<MachineRentals />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/contact" element={<Contact />} />
              {/* Dashboard & admin routes (protected) */}
              <Route path="/dashboard/loader" element={<ProtectedRoute><LoaderAdmin /></ProtectedRoute>} />
              <Route path="/dashboard/tipper" element={<ProtectedRoute><TipperAdmin /></ProtectedRoute>} />
              <Route path="/dashboard/survey" element={<ProtectedRoute><SurveyAdmin /></ProtectedRoute>} />
              <Route path="/dashboard/blocks" element={<ProtectedRoute><BlocksAdmin /></ProtectedRoute>} />
              <Route path="/dashboard/main" element={<ProtectedRoute><MainAdmin /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

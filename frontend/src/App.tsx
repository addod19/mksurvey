import { Routes, Route, useLocation } from 'react-router-dom';
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
import LoaderExpenses from './pages/dashboard/LoaderExpenses';

function App() {
  const location = useLocation();
  const isMarketing = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact';
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`app-container ${isMarketing ? 'app-container--marketing' : ''} ${isAuth ? 'app-container--auth' : ''}`}>
      <Navbar />
      <main className={`main-content ${isMarketing ? 'main-content--marketing' : ''} ${isAuth ? 'main-content--auth' : ''}`}>
        <div className="container">
          <div className="content-card">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/loaderTipper"
                element={
                  <ProtectedRoute roles={['loader', 'tipper', 'main']}>
                    <LoaderTipper />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/machineRentals"
                element={
                  <ProtectedRoute roles={['loader', 'main']}>
                    <MachineRentals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blocks"
                element={
                  <ProtectedRoute roles={['blocks', 'main']}>
                    <Blocks />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              {/* Dashboard & admin routes (protected) */}
              <Route
                path="/dashboard/loader"
                element={
                  <ProtectedRoute roles={['loader']}>
                    <LoaderAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/loader/expenses"
                element={
                  <ProtectedRoute roles={['loader']}>
                    <LoaderExpenses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/tipper"
                element={
                  <ProtectedRoute roles={['tipper']}>
                    <TipperAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/survey"
                element={
                  <ProtectedRoute roles={['survey']}>
                    <SurveyAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/blocks"
                element={
                  <ProtectedRoute roles={['blocks']}>
                    <BlocksAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/main"
                element={
                  <ProtectedRoute roles={['main']}>
                    <MainAdmin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

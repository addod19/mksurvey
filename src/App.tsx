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

function App() {


  return (
    <div className="app-container container mt-5">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loaderTipper" element={<LoaderTipper />} />
          <Route path="/machineRentals" element={<MachineRentals />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

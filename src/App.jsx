import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PromptProvider } from './context/PromptContext';
import LandingPage from './pages/Landing/LandingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/shared/ToastContainer';
import { AtmosphericBg } from './components/shared/GradientBackground';
import './locales/i18n';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PromptProvider>
        <AtmosphericBg />
        <Navbar />
        <ToastContainer />
        <AnimatedRoutes />
      </PromptProvider>
    </BrowserRouter>
  );
}

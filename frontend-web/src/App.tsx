import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import BoatListPage from './pages/BoatListPage';
import BoatDetailPage from './pages/BoatDetailPage';
import ExperienceSelectionPage from './pages/ExperienceSelectionPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import WriteReviewPage from './pages/WriteReviewPage';
import HostDashboardPage from './pages/HostDashboardPage';
import CreateListingWizardPage from './pages/CreateListingWizardPage';
import HostOnboardingPage from './pages/HostOnboardingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boats" element={<BoatListPage />} />
            <Route path="/boats/:id" element={<BoatDetailPage />} />
            <Route path="/boats/:id/experiences" element={<ExperienceSelectionPage />} />
            <Route path="/booking/:boatId" element={<BookingPage />} />
            <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reviews/:bookingId/write" element={<WriteReviewPage />} />
            <Route path="/host/dashboard" element={<HostDashboardPage />} />
            <Route path="/host/listing/create" element={<CreateListingWizardPage />} />
            <Route path="/host/onboarding" element={<HostOnboardingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



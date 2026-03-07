import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/ui/Stepper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './HostOnboardingPage.css';

const HostOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Profile
    name: '',
    bio: '',
    avatar: '',
    // Languages
    languages: [] as string[],
    // Verification
    documentType: 'passport',
    documentNumber: '',
    documentFile: null as File | null,
  });

  const steps = [
    { id: 'profile', label: 'Profile' },
    { id: 'languages', label: 'Languages' },
    { id: 'verification', label: 'Verification' },
    { id: 'preview', label: 'Preview' },
  ];

  const availableLanguages = [
    'English',
    'Italian',
    'German',
    'French',
    'Spanish',
    'Croatian',
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit to API
    console.log('Submitting host profile:', formData);
    navigate('/host/dashboard');
  };

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Profile
        return (
          <div className="onboarding-step-content">
            <h2 className="step-title">Complete Your Profile</h2>
            <p className="step-subtitle">Tell guests about yourself</p>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio *</label>
              <textarea
                className="form-textarea"
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell guests about yourself, your experience, and what makes you a great host..."
                rows={5}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Photo</label>
              <div className="avatar-upload">
                {formData.avatar ? (
                  <div className="avatar-preview">
                    <img src={formData.avatar} alt="Profile" />
                    <button
                      type="button"
                      className="avatar-remove"
                      onClick={() => setFormData((prev) => ({ ...prev, avatar: '' }))}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="avatar-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Upload Photo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1: // Languages
        return (
          <div className="onboarding-step-content">
            <h2 className="step-title">Select Languages</h2>
            <p className="step-subtitle">Which languages can you communicate in?</p>

            <div className="languages-grid">
              {availableLanguages.map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`language-chip ${formData.languages.includes(language) ? 'language-chip-selected' : ''}`}
                  onClick={() => toggleLanguage(language)}
                >
                  {language}
                </button>
              ))}
            </div>

            {formData.languages.length > 0 && (
              <div className="selected-languages">
                <p className="selected-label">Selected: {formData.languages.join(', ')}</p>
              </div>
            )}
          </div>
        );

      case 2: // Verification
        return (
          <div className="onboarding-step-content">
            <h2 className="step-title">Identity Verification</h2>
            <p className="step-subtitle">Verify your identity to become a host</p>

            <div className="form-group">
              <label className="form-label">Document Type *</label>
              <select
                className="form-input"
                value={formData.documentType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, documentType: e.target.value }))
                }
              >
                <option value="passport">Passport</option>
                <option value="id">National ID</option>
                <option value="license">Driver's License</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Document Number *</label>
              <input
                type="text"
                className="form-input"
                value={formData.documentNumber}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, documentNumber: e.target.value }))
                }
                placeholder="Enter document number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Document *</label>
              <div className="document-upload">
                {formData.documentFile ? (
                  <div className="document-preview">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>{formData.documentFile.name}</p>
                    <button
                      type="button"
                      className="document-remove"
                      onClick={() => setFormData((prev) => ({ ...prev, documentFile: null }))}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="document-upload-label">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData((prev) => ({ ...prev, documentFile: file }));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Upload Document</p>
                  </label>
                )}
              </div>
            </div>

            <Card className="verification-info-card">
              <h3 className="info-card-title">Verification Process</h3>
              <ul className="info-list">
                <li>Your document will be securely verified</li>
                <li>This usually takes 1-2 business days</li>
                <li>You can start creating listings after verification</li>
              </ul>
            </Card>
          </div>
        );

      case 3: // Preview
        return (
          <div className="onboarding-step-content">
            <h2 className="step-title">Review Your Profile</h2>
            <p className="step-subtitle">Make sure everything looks good</p>

            <Card className="preview-card">
              <div className="preview-avatar">
                {formData.avatar ? (
                  <img src={formData.avatar} alt={formData.name} />
                ) : (
                  <div className="preview-avatar-placeholder">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="preview-name">{formData.name || 'Your Name'}</h3>
              <p className="preview-bio">{formData.bio || 'Your bio will appear here'}</p>
              <div className="preview-languages">
                <span className="preview-label">Languages:</span>
                <span>
                  {formData.languages.length > 0
                    ? formData.languages.join(', ')
                    : 'No languages selected'}
                </span>
              </div>
              <div className="preview-verification">
                <span className="preview-label">Verification:</span>
                <span className="verification-status pending">Pending</span>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="host-onboarding-page">
      {/* Header */}
      <div className="onboarding-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="onboarding-title">Become a Host</h1>
        <div className="header-spacer" />
      </div>

      {/* Stepper */}
      <div className="onboarding-stepper-container">
        <Stepper
          steps={steps.map((step, index) => ({
            id: step.id,
            label: step.label,
            completed: index < currentStep,
          }))}
          currentStep={currentStep}
        />
      </div>

      {/* Content */}
      <div className="onboarding-content">
        <Card className="onboarding-card">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="onboarding-navigation">
          {currentStep > 0 && (
            <Button variant="outline" size="large" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="navigation-spacer" />
          {currentStep < steps.length - 1 ? (
            <Button
              variant="primary"
              size="large"
              onClick={handleNext}
              disabled={
                (currentStep === 0 && (!formData.name || !formData.bio)) ||
                (currentStep === 1 && formData.languages.length === 0) ||
                (currentStep === 2 &&
                  (!formData.documentNumber || !formData.documentFile))
              }
            >
              Next
            </Button>
          ) : (
            <Button variant="primary" size="large" onClick={handleSubmit}>
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostOnboardingPage;


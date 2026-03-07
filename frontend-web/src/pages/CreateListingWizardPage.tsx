import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/ui/Stepper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './CreateListingWizardPage.css';

const CreateListingWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Details
    name: '',
    description: '',
    location: '',
    capacity: '',
    cabins: '',
    year: '',
    length: '',
    // Photos
    photos: [] as string[],
    // Route
    startLocation: '',
    endLocation: '',
    // Experiences
    experiences: [] as Array<{
      type: string;
      name: string;
      duration: string;
      price: string;
      description: string[];
    }>,
    // Pricing
    basePrice: '',
  });

  const steps = [
    { id: 'details', label: 'Details' },
    { id: 'photos', label: 'Photos' },
    { id: 'route', label: 'Route' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'pricing', label: 'Pricing' },
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
    console.log('Submitting listing:', formData);
    navigate('/host/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          type: 'ride',
          name: '',
          duration: '',
          price: '',
          description: [''],
        },
      ],
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Details
        return (
          <div className="wizard-step-content">
            <h2 className="step-title">Boat Details</h2>
            <p className="step-subtitle">Tell us about your boat</p>

            <div className="form-group">
              <label className="form-label">Boat Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Azzurra"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your boat and what makes it special..."
                rows={5}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Trieste, Italy"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Capacity (people) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="8"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cabins *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.cabins}
                  onChange={(e) => handleInputChange('cabins', e.target.value)}
                  placeholder="2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Year *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Length (meters) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Photos
        return (
          <div className="wizard-step-content">
            <h2 className="step-title">Add Photos</h2>
            <p className="step-subtitle">Upload at least 3 photos of your boat</p>

            <div className="photos-grid">
              {formData.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Photo ${index + 1}`} />
                  <button className="photo-remove">×</button>
                </div>
              ))}
              <div className="photo-upload">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Add Photo</p>
              </div>
            </div>
          </div>
        );

      case 2: // Route
        return (
          <div className="wizard-step-content">
            <h2 className="step-title">Set Your Route</h2>
            <p className="step-subtitle">Define where your trips start and end</p>

            <div className="form-group">
              <label className="form-label">Start Location *</label>
              <input
                type="text"
                className="form-input"
                value={formData.startLocation}
                onChange={(e) => handleInputChange('startLocation', e.target.value)}
                placeholder="e.g., Marina San Giusto, Trieste"
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Location *</label>
              <input
                type="text"
                className="form-input"
                value={formData.endLocation}
                onChange={(e) => handleInputChange('endLocation', e.target.value)}
                placeholder="e.g., Miramare Castle Area"
              />
            </div>

            <div className="route-map-preview">
              <div className="map-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="#666666"
                  />
                </svg>
                <p>Map preview will appear here</p>
              </div>
            </div>
          </div>
        );

      case 3: // Experiences
        return (
          <div className="wizard-step-content">
            <h2 className="step-title">Experiences Offered</h2>
            <p className="step-subtitle">Add the experiences guests can book</p>

            {formData.experiences.map((experience, index) => (
              <Card key={index} className="experience-form-card">
                <div className="form-group">
                  <label className="form-label">Experience Type *</label>
                  <select
                    className="form-input"
                    value={experience.type}
                    onChange={(e) => handleExperienceChange(index, 'type', e.target.value)}
                  >
                    <option value="ride">Just a Ride</option>
                    <option value="panorama">Panorama Tour</option>
                    <option value="spritz_swim_panorama">Spritz, Swim & Panorama</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={experience.name}
                    onChange={(e) => handleExperienceChange(index, 'name', e.target.value)}
                    placeholder="e.g., Spritz & Sail"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Duration (hours) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={experience.duration}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                      placeholder="2"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (€) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={experience.price}
                      onChange={(e) => handleExperienceChange(index, 'price', e.target.value)}
                      placeholder="45"
                    />
                  </div>
                </div>
              </Card>
            ))}

            <Button variant="outline" size="medium" onClick={handleAddExperience}>
              + Add Experience
            </Button>
          </div>
        );

      case 4: // Pricing
        return (
          <div className="wizard-step-content">
            <h2 className="step-title">Set Your Pricing</h2>
            <p className="step-subtitle">Set a base price per hour</p>

            <div className="form-group">
              <label className="form-label">Base Price per Hour (€) *</label>
              <input
                type="number"
                className="form-input form-input-large"
                value={formData.basePrice}
                onChange={(e) => handleInputChange('basePrice', e.target.value)}
                placeholder="120"
              />
            </div>

            <Card className="pricing-info-card">
              <h3 className="info-card-title">Pricing Information</h3>
              <ul className="info-list">
                <li>Base price is the minimum charge per hour</li>
                <li>Experience prices can be set individually</li>
                <li>You can adjust prices anytime after publishing</li>
              </ul>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="create-listing-wizard-page">
      {/* Header */}
      <div className="wizard-header">
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
        <h1 className="wizard-title">Create Listing</h1>
        <div className="header-spacer" />
      </div>

      {/* Stepper */}
      <div className="wizard-stepper-container">
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
      <div className="wizard-content">
        <Card className="wizard-card">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="wizard-navigation">
          {currentStep > 0 && (
            <Button variant="outline" size="large" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="navigation-spacer" />
          {currentStep < steps.length - 1 ? (
            <Button variant="primary" size="large" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="primary" size="large" onClick={handleSubmit}>
              Publish Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListingWizardPage;


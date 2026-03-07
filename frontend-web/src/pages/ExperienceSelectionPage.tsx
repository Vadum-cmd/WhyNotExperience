import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boatService, Boat, Experience } from '../services/boatService';
import Button from '../components/ui/Button';
import './ExperienceSelectionPage.css';

const ExperienceSelectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBoat();
    }
  }, [id]);

  const loadBoat = async () => {
    if (!id) return;
    try {
      const data = await boatService.getBoatById(id);
      setBoat(data);
    } catch (error) {
      console.error('Failed to load boat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSelect = (experience: Experience) => {
    setSelectedExperience(experience);
  };

  const handleContinue = () => {
    if (selectedExperience && id) {
      // Navigate to booking page for this boat with the selected experience
      navigate(`/booking/${id}?experienceId=${selectedExperience.id}`);
    }
  };

  if (loading) {
    return (
      <div className="experience-selection-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!boat) {
    return (
      <div className="experience-selection-page">
        <div className="error">Boat not found</div>
      </div>
    );
  }

  // Helper function to parse step descriptions into title and subtitle
  const parseStepDescription = (step: string): { title: string; subtitle: string } => {
    const lowerStep = step.toLowerCase().trim();
    
    // Comprehensive mapping of common patterns
    const mappings: Array<{ pattern: RegExp; title: string; subtitle: string }> = [
      { pattern: /^meet up/i, title: 'Meet up', subtitle: 'Meet at Marina San Giusto' },
      { pattern: /^meet at/i, title: 'Meet up', subtitle: step },
      { pattern: /start.*boat ride/i, title: 'Start boat ride', subtitle: 'Start boat ride around Trieste' },
      { pattern: /start.*panoramic.*tour/i, title: 'Start panoramic tour', subtitle: 'Start panoramic boat tour of Trieste' },
      { pattern: /enjoy.*spritz/i, title: 'Enjoy your Spritz', subtitle: 'Relax with refreshing Spritz cocktails' },
      { pattern: /learn.*history/i, title: 'Learn history', subtitle: 'Learn history of the city from your host' },
      { pattern: /take.*swim/i, title: 'Take a swim', subtitle: 'Swim in the crystal-clear Adriatic waters' },
      { pattern: /take.*photos/i, title: 'Take photos', subtitle: 'Take photos, enjoy the sea' },
      { pattern: /enjoy.*sea/i, title: 'Enjoy the sea', subtitle: 'Relax and soak in the coastal beauty' },
      { pattern: /sailing experience/i, title: 'Sailing experience', subtitle: step },
      { pattern: /coffee and breakfast/i, title: 'Coffee and breakfast', subtitle: step },
      { pattern: /relaxing cruise/i, title: 'Relaxing cruise', subtitle: step },
      { pattern: /sunset sailing/i, title: 'Sunset sailing', subtitle: step },
      { pattern: /spritz and snacks/i, title: 'Spritz and snacks', subtitle: step },
      { pattern: /swimming stop/i, title: 'Swimming stop', subtitle: step },
      { pattern: /return at sunset/i, title: 'Return at sunset', subtitle: step },
      { pattern: /luxury yacht/i, title: 'Luxury yacht experience', subtitle: step },
      { pattern: /champagne service/i, title: 'Champagne service', subtitle: step },
      { pattern: /professional guide/i, title: 'Professional guide', subtitle: step },
      { pattern: /full day/i, title: 'Full day experience', subtitle: step },
      { pattern: /lunch/i, title: 'Lunch on board', subtitle: step },
      { pattern: /gourmet meals/i, title: 'Gourmet meals', subtitle: step },
      { pattern: /premium service/i, title: 'Premium service', subtitle: step },
    ];

    // Try to match patterns
    for (const mapping of mappings) {
      if (mapping.pattern.test(step)) {
        return { title: mapping.title, subtitle: mapping.subtitle };
      }
    }

    // Default: capitalize first letter and use as title, full text as subtitle if short
    const capitalized = step.charAt(0).toUpperCase() + step.slice(1);
    if (step.length < 30) {
      return { title: capitalized, subtitle: '' };
    }
    
    // For longer text, try to split intelligently
    const words = step.split(' ');
    if (words.length <= 4) {
      return { title: capitalized, subtitle: '' };
    }
    
    // Split at a natural break point (after 2-3 words)
    const titleWords = words.slice(0, 3).join(' ');
    const subtitleWords = words.slice(3).join(' ');
    return {
      title: titleWords.charAt(0).toUpperCase() + titleWords.slice(1),
      subtitle: subtitleWords.charAt(0).toUpperCase() + subtitleWords.slice(1)
    };
  };

  const renderExperienceTimeline = (description: string[]) => {
    return (
      <div className="experience-timeline">
        {description.map((step, index) => {
          const { title, subtitle } = parseStepDescription(step);
          const isLast = index === description.length - 1;
          const isFirst = index === 0;
          const isMiddle = !isFirst && !isLast;
          
          return (
            <div key={index} className="timeline-step">
              <div className={`timeline-circle ${isFirst ? 'timeline-circle-start' : isLast ? 'timeline-circle-end' : 'timeline-circle-route'}`}>
                {isFirst && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="white" />
                    <path
                      d="M10 4L6 8L4 6"
                      stroke="#1E6CFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isLast && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" fill="#1E6CFF" />
                    <path
                      d="M7 3L7 11M3 7L11 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {isMiddle && (
                  <div className="timeline-route-dot" />
                )}
              </div>
              {!isLast && (
                <div className={`timeline-line ${isFirst ? 'timeline-line-active' : 'timeline-line-route'}`} />
              )}
              <div className="timeline-content">
                {isFirst && <span className="timeline-route-label timeline-route-label-start">Start</span>}
                {isLast && <span className="timeline-route-label timeline-route-label-end">Destination</span>}
                <p className="timeline-title">{title}</p>
                {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="experience-selection-page">
      {/* Header */}
      <div className="experience-header">
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
        <div className="header-spacer" />
      </div>

      {/* Content */}
      <div className="experience-content">
        <h1 className="experience-main-title">Choose your adventure</h1>
        <p className="experience-subtitle">on {boat.name}</p>

        <div className="experiences-list">
          {(!boat.experiences || boat.experiences.length === 0) ? (
            <div className="no-experiences">No experiences available for this boat.</div>
          ) : (
            boat.experiences.map((experience) => {
              const isSelected = selectedExperience?.id === experience.id;
              const experienceImage = boat.images && boat.images.length > 0 
                ? boat.images[0] 
                : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400';
              
            return (
              <div
                key={experience.id}
                  className={`experience-card ${isSelected ? 'experience-card-selected' : ''}`}
                onClick={() => handleExperienceSelect(experience)}
              >
                  <div className="experience-card-image">
                    <img src={experienceImage} alt={experience.name} />
                    <div className="experience-image-overlay">
                      <h3 className="experience-name">{experience.name}</h3>
                    </div>
                  </div>
                  <div className="experience-card-content">
                    <div className="experience-header-section">
                      <div className="experience-duration-price">
                        <span className="experience-duration">{experience.duration} hour{experience.duration !== 1 ? 's' : ''}</span>
                        <span className="experience-price">€{experience.price}</span>
                      </div>
                </div>
                
                    <p className="experience-description-text">
                      {experience.type === 'ride' && 'A quick and delightful coastal experience with refreshments'}
                      {experience.type === 'panorama' && 'Comprehensive coastal tour with historical insights'}
                      {experience.type === 'spritz_swim_panorama' && 'The complete experience combining sightseeing, swimming, and relaxation'}
                    </p>

                    {experience.description && experience.description.length > 0 && (
                      <div className="experience-timeline-container">
                        {renderExperienceTimeline(experience.description)}
                      </div>
                    )}
                </div>
              </div>
            );
            })
          )}
        </div>

        {selectedExperience && (
        <div className="experience-footer">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleContinue}
            >
              Continue with {selectedExperience.name}
            </Button>
          </div>
          )}
      </div>
    </div>
  );
};

export default ExperienceSelectionPage;

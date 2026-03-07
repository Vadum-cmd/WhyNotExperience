import React from 'react';
import './Stepper.css';

interface Step {
  id: string;
  label: string;
  completed?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`stepper ${className}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = step.completed || index < currentStep;
        const isCurrent = index === currentStep;
        const isPast = index < currentStep;

        return (
          <div key={step.id} className="stepper-step">
            <div className="stepper-line-container">
              {index > 0 && (
                <div
                  className={`stepper-line ${isPast || isCompleted ? 'stepper-line-completed' : ''}`}
                />
              )}
              <div
                className={`stepper-circle ${
                  isCompleted
                    ? 'stepper-circle-completed'
                    : isCurrent
                    ? 'stepper-circle-current'
                    : 'stepper-circle-upcoming'
                }`}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.3333 4L6 11.3333L2.66667 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`stepper-line ${
                    isPast || isCompleted ? 'stepper-line-completed' : ''
                  }`}
                />
              )}
            </div>
            <span
              className={`stepper-label ${
                isCurrent ? 'stepper-label-current' : isCompleted ? 'stepper-label-completed' : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;


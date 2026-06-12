import React, { useState } from 'react';
import { UserProfile, DEFAULT_PROFILE } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS = ['🚗 Transport', '🏠 Home', '🍽️ Food', '🛍️ Shopping'];

export const OnboardingWizard: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ ...DEFAULT_PROFILE });

  const updateTransport = <K extends keyof UserProfile['transport']>(key: K, value: UserProfile['transport'][K]) =>
    setProfile(p => ({ ...p, transport: { ...p.transport, [key]: value } }));
  const updateHome = <K extends keyof UserProfile['home']>(key: K, value: UserProfile['home'][K]) =>
    setProfile(p => ({ ...p, home: { ...p.home, [key]: value } }));
  const updateFood = <K extends keyof UserProfile['food']>(key: K, value: UserProfile['food'][K]) =>
    setProfile(p => ({ ...p, food: { ...p.food, [key]: value } }));
  const updateShopping = <K extends keyof UserProfile['shopping']>(key: K, value: UserProfile['shopping'][K]) =>
    setProfile(p => ({ ...p, shopping: { ...p.shopping, [key]: value } }));

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div>
          <div className="nm-field">
            <label htmlFor="carType" className="nm-label">Car type</label>
            <select 
              id="carType" 
              className="nm-input" 
              value={profile.transport.carType}
              onChange={e => updateTransport('carType', e.target.value as 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'none')}
            >
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
              <option value="none">No car</option>
            </select>
          </div>
          <div className="nm-field">
            <label htmlFor="carMiles" className="nm-label">Miles driven per week: {profile.transport.carMilesPerWeek}</label>
            <input 
              id="carMiles" 
              type="range" 
              min={0} 
              max={500} 
              value={profile.transport.carMilesPerWeek}
              aria-label="Miles driven per week"
              onChange={e => updateTransport('carMilesPerWeek', Number(e.target.value))} 
            />
          </div>
          <div className="nm-field">
            <label htmlFor="transitHours" className="nm-label">Public transit hours per week: {profile.transport.publicTransitHoursPerWeek}</label>
            <input 
              id="transitHours" 
              type="range" 
              min={0} 
              max={40} 
              value={profile.transport.publicTransitHoursPerWeek}
              aria-label="Public transit hours per week"
              onChange={e => updateTransport('publicTransitHoursPerWeek', Number(e.target.value))} 
            />
          </div>
          <div className="nm-field">
            <label htmlFor="flights" className="nm-label">Round-trip flights per year: {profile.transport.flightsPerYear}</label>
            <input 
              id="flights" 
              type="range" 
              min={0} 
              max={20} 
              value={profile.transport.flightsPerYear}
              aria-label="Round trip flights per year"
              onChange={e => updateTransport('flightsPerYear', Number(e.target.value))} 
            />
          </div>
        </div>
      );
      case 1: return (
        <div>
          <div className="nm-field">
            <label htmlFor="electricity" className="nm-label">Electricity usage (kWh/month): {profile.home.electricityKwhPerMonth}</label>
            <input 
              id="electricity" 
              type="range" 
              min={100} 
              max={3000} 
              step={50} 
              value={profile.home.electricityKwhPerMonth}
              aria-label="Electricity usage in kilowatt hours per month"
              onChange={e => updateHome('electricityKwhPerMonth', Number(e.target.value))} 
            />
          </div>
          <div className="nm-field">
            <label htmlFor="naturalGas" className="nm-label">Natural gas (therms/month): {profile.home.naturalGasThermsPerMonth}</label>
            <input 
              id="naturalGas" 
              type="range" 
              min={0} 
              max={200} 
              value={profile.home.naturalGasThermsPerMonth}
              aria-label="Natural gas usage in therms per month"
              onChange={e => updateHome('naturalGasThermsPerMonth', Number(e.target.value))} 
            />
          </div>
          <div className="nm-field">
            <label htmlFor="householdSize" className="nm-label">Household size: {profile.home.householdSize}</label>
            <input 
              id="householdSize" 
              type="range" 
              min={1} 
              max={8} 
              value={profile.home.householdSize}
              aria-label="Household size"
              onChange={e => updateHome('householdSize', Number(e.target.value))} 
            />
          </div>
        </div>
      );
      case 2: return (
        <div>
          <div className="nm-field">
            <label htmlFor="dietType" className="nm-label">Diet type</label>
            <select 
              id="dietType" 
              className="nm-input" 
              value={profile.food.dietType}
              onChange={e => updateFood('dietType', e.target.value as 'meat_heavy' | 'average' | 'pescatarian' | 'vegetarian' | 'vegan')}
            >
              <option value="meat_heavy">Meat Heavy</option>
              <option value="average">Average</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="nm-field">
            <label htmlFor="localFood" className="nm-label">Locally sourced food: {profile.food.localFoodPercent}%</label>
            <input 
              id="localFood" 
              type="range" 
              min={0} 
              max={100} 
              value={profile.food.localFoodPercent}
              aria-label="Percentage of locally sourced food"
              onChange={e => updateFood('localFoodPercent', Number(e.target.value))} 
            />
          </div>
        </div>
      );
      case 3: return (
        <div>
          <div className="nm-field">
            <label htmlFor="clothing" className="nm-label">Clothing items per month: {profile.shopping.clothingItemsPerMonth}</label>
            <input 
              id="clothing" 
              type="range" 
              min={0} 
              max={20} 
              value={profile.shopping.clothingItemsPerMonth}
              aria-label="Clothing items purchased per month"
              onChange={e => updateShopping('clothingItemsPerMonth', Number(e.target.value))} 
            />
          </div>
          <div className="nm-field">
            <label htmlFor="electronics" className="nm-label">Electronics purchased per year: {profile.shopping.electronicsPerYear}</label>
            <input 
              id="electronics" 
              type="range" 
              min={0} 
              max={10} 
              value={profile.shopping.electronicsPerYear}
              aria-label="Electronics purchased per year"
              onChange={e => updateShopping('electronicsPerYear', Number(e.target.value))} 
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-card">
        {/* Progress bar */}
        <div className="wizard-progress-bar-container">
          {STEPS.map((s, i) => (
            <div key={s} className="wizard-progress-step">
              <div 
                className="wizard-progress-line"
                style={{
                  background: i <= step
                    ? 'linear-gradient(90deg, #667eea, #764ba2)'
                    : '#e0e5ec',
                  boxShadow: i <= step
                    ? 'none'
                    : 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
                }} 
              />
              <span 
                className="wizard-progress-text"
                style={{ color: i <= step ? '#2d3748' : '#a0aec0' }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        <h2 className="wizard-title">
          {STEPS[step]}
        </h2>

        {renderStep()}

        <div className="wizard-buttons">
          {step > 0 ? (
            <button 
              onClick={() => setStep(s => s - 1)} 
              className="nm-btn"
            >
              ← Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button 
              onClick={() => setStep(s => s + 1)} 
              className="nm-btn-primary"
            >
              Next →
            </button>
          ) : (
            <button 
              onClick={() => onComplete(profile)} 
              className="nm-btn-primary"
              style={{ background: 'linear-gradient(135deg, #48bb78, #4299e1)' }}
            >
              See My Footprint 🌍
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

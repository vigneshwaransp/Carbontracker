import React, { useState } from 'react';
import { UserProfile, DEFAULT_PROFILE } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS = ['🚗 Transport', '🏠 Home', '🍽️ Food', '🛍️ Shopping'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem', background: '#e0e5ec',
  border: 'none', borderRadius: '12px',
  color: '#2d3748', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
  boxShadow: 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff',
  transition: 'box-shadow 0.3s ease',
};

const labelStyle: React.CSSProperties = {
  color: '#718096', fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block', fontWeight: 600,
};

const fieldStyle: React.CSSProperties = { marginBottom: '1.25rem' };

export const OnboardingWizard: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ ...DEFAULT_PROFILE });

  const updateTransport = (key: string, value: any) =>
    setProfile(p => ({ ...p, transport: { ...p.transport, [key]: value } }));
  const updateHome = (key: string, value: any) =>
    setProfile(p => ({ ...p, home: { ...p.home, [key]: value } }));
  const updateFood = (key: string, value: any) =>
    setProfile(p => ({ ...p, food: { ...p.food, [key]: value } }));
  const updateShopping = (key: string, value: any) =>
    setProfile(p => ({ ...p, shopping: { ...p.shopping, [key]: value } }));

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Car type</label>
            <select style={inputStyle} value={profile.transport.carType}
              onChange={e => updateTransport('carType', e.target.value)}>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
              <option value="none">No car</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Miles driven per week: {profile.transport.carMilesPerWeek}</label>
            <input type="range" min={0} max={500} value={profile.transport.carMilesPerWeek}
              onChange={e => updateTransport('carMilesPerWeek', Number(e.target.value))} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Public transit hours per week: {profile.transport.publicTransitHoursPerWeek}</label>
            <input type="range" min={0} max={40} value={profile.transport.publicTransitHoursPerWeek}
              onChange={e => updateTransport('publicTransitHoursPerWeek', Number(e.target.value))} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Round-trip flights per year: {profile.transport.flightsPerYear}</label>
            <input type="range" min={0} max={20} value={profile.transport.flightsPerYear}
              onChange={e => updateTransport('flightsPerYear', Number(e.target.value))} />
          </div>
        </div>
      );
      case 1: return (
        <div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Electricity usage (kWh/month): {profile.home.electricityKwhPerMonth}</label>
            <input type="range" min={100} max={3000} step={50} value={profile.home.electricityKwhPerMonth}
              onChange={e => updateHome('electricityKwhPerMonth', Number(e.target.value))} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Natural gas (therms/month): {profile.home.naturalGasThermsPerMonth}</label>
            <input type="range" min={0} max={200} value={profile.home.naturalGasThermsPerMonth}
              onChange={e => updateHome('naturalGasThermsPerMonth', Number(e.target.value))} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Household size: {profile.home.householdSize}</label>
            <input type="range" min={1} max={8} value={profile.home.householdSize}
              onChange={e => updateHome('householdSize', Number(e.target.value))} />
          </div>
        </div>
      );
      case 2: return (
        <div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Diet type</label>
            <select style={inputStyle} value={profile.food.dietType}
              onChange={e => updateFood('dietType', e.target.value)}>
              <option value="meat_heavy">Meat Heavy</option>
              <option value="average">Average</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Locally sourced food: {profile.food.localFoodPercent}%</label>
            <input type="range" min={0} max={100} value={profile.food.localFoodPercent}
              onChange={e => updateFood('localFoodPercent', Number(e.target.value))} />
          </div>
        </div>
      );
      case 3: return (
        <div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Clothing items per month: {profile.shopping.clothingItemsPerMonth}</label>
            <input type="range" min={0} max={20} value={profile.shopping.clothingItemsPerMonth}
              onChange={e => updateShopping('clothingItemsPerMonth', Number(e.target.value))} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Electronics purchased per year: {profile.shopping.electronicsPerYear}</label>
            <input type="range" min={0} max={10} value={profile.shopping.electronicsPerYear}
              onChange={e => updateShopping('electronicsPerYear', Number(e.target.value))} />
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#e0e5ec' }}>
      <div style={{
        background: '#e0e5ec',
        boxShadow: '12px 12px 24px #b8bec7, -12px -12px 24px #ffffff',
        borderRadius: '24px',
        padding: '2.5rem', width: '100%', maxWidth: '520px',
      }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: '6px', borderRadius: '3px', marginBottom: '0.5rem',
                background: i <= step
                  ? 'linear-gradient(90deg, #667eea, #764ba2)'
                  : '#e0e5ec',
                boxShadow: i <= step
                  ? 'none'
                  : 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
                transition: 'all 0.5s ease',
              }} />
              <span style={{ fontSize: '0.7rem', color: i <= step ? '#2d3748' : '#a0aec0' }}>{s}</span>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#2d3748', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1.5rem' }}>
          {STEPS[step]}
        </h2>

        {renderStep()}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} style={{
              background: '#e0e5ec',
              boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
              border: 'none',
              color: '#718096', padding: '0.7rem 1.5rem', borderRadius: '14px',
              cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s',
            }}>← Back</button>
          ) : <div />}
          {step < 3 ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none',
              color: '#ffffff', padding: '0.7rem 1.5rem', borderRadius: '14px',
              cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Next →</button>
          ) : (
            <button onClick={() => onComplete(profile)} style={{
              background: 'linear-gradient(135deg, #48bb78, #4299e1)', border: 'none',
              color: '#ffffff', padding: '0.7rem 1.5rem', borderRadius: '14px',
              cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >See My Footprint 🌍</button>
          )}
        </div>
      </div>
    </div>
  );
};

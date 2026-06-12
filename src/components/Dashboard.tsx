import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { UserProfile, CarbonBreakdown } from '../types';
import { getGrade, formatTonnes } from '../utils/carbonCalc';
import { BENCHMARKS } from '../data/emissionFactors';

interface DashboardProps {
  profile: UserProfile;
  breakdown: CarbonBreakdown;
  onEdit: () => void;
}

const CATEGORY_COLORS = {
  transport: '#4299e1',
  home: '#9f7aea',
  food: '#48bb78',
  shopping: '#ecc94b',
};

const CATEGORY_ICONS: Record<string, string> = {
  transport: '🚗',
  home: '🏠',
  food: '🍽️',
  shopping: '🛍️',
};

export const Dashboard: React.FC<DashboardProps> = ({ breakdown, onEdit }) => {
  const grade = getGrade(breakdown.total);
  const pieData = [
    { name: 'Transport', value: breakdown.transport, color: CATEGORY_COLORS.transport },
    { name: 'Home', value: breakdown.home, color: CATEGORY_COLORS.home },
    { name: 'Food', value: breakdown.food, color: CATEGORY_COLORS.food },
    { name: 'Shopping', value: breakdown.shopping, color: CATEGORY_COLORS.shopping },
  ];

  const comparisonData = [
    { name: 'You', value: breakdown.total, fill: grade.color },
    { name: 'World Avg', value: BENCHMARKS.WORLD_AVERAGE, fill: '#a0aec0' },
    { name: 'EU Avg', value: BENCHMARKS.EU_AVERAGE, fill: '#a0aec0' },
    { name: 'US Avg', value: BENCHMARKS.US_AVERAGE, fill: '#a0aec0' },
    { name: '2030 Target', value: BENCHMARKS.TARGET_2030, fill: '#48bb78' },
  ];

  return (
    <div className="dashboard-container">
      {/* Screen Reader Only Summary (A11y Requirement) */}
      <div className="sr-only">
        <h2>EcoTrack Carbon Dashboard Summary</h2>
        <p>Your overall rating is {grade.grade}: {grade.label}</p>
        <p>Your total carbon footprint is {formatTonnes(breakdown.total)} tonnes of CO₂ per year.</p>
        
        <h3>Category Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Emissions (Tonnes CO₂/year)</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map(cat => {
              const pct = breakdown.total > 0 ? Math.round((cat.value / breakdown.total) * 100) : 0;
              return (
                <tr key={cat.name}>
                  <td>{cat.name}</td>
                  <td>{formatTonnes(cat.value)}</td>
                  <td>{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>Global Benchmarks Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Entity</th>
              <th>Emissions (Tonnes CO₂/year)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{formatTonnes(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grade Card */}
      <div className="dashboard-grade-card" aria-live="polite">
        <div className="dashboard-grade-value" style={{ color: grade.color }}>{grade.grade}</div>
        <div className="dashboard-grade-title">
          {formatTonnes(breakdown.total)} tonnes CO₂/year
        </div>
        <div className="dashboard-grade-subtitle">{grade.label}</div>
        <button 
          onClick={onEdit} 
          className="nm-btn dashboard-grade-btn"
        >
          <span role="img" aria-label="pencil">✏️</span> Update My Data
        </button>
      </div>

      {/* Category breakdown cards */}
      <div className="dashboard-categories-grid">
        {pieData.map(cat => {
          const pct = breakdown.total > 0 ? Math.round((cat.value / breakdown.total) * 100) : 0;
          return (
            <div key={cat.name} className="dashboard-category-card">
              <div className="dashboard-category-header">
                <span className="dashboard-category-icon">
                  <span role="img" aria-label={cat.name}>{CATEGORY_ICONS[cat.name.toLowerCase()]}</span>
                </span>
                <span className="dashboard-category-name">{cat.name}</span>
              </div>
              <div className="dashboard-category-value" style={{ color: cat.color }}>
                {formatTonnes(cat.value)}t
              </div>
              <div className="dashboard-category-pct">{pct}% of total</div>
              <div className="dashboard-category-progress-track">
                <div 
                  className="dashboard-category-progress-bar"
                  style={{ width: `${pct}%`, background: cat.color }} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="dashboard-charts-grid">
        {/* Donut */}
        <div className="dashboard-chart-card" aria-hidden="true">
          <h3 className="dashboard-chart-title">Emissions Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3} stroke="none">
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#e0e5ec', boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff', borderRadius: '12px', border: 'none', color: '#2d3748' }}
                formatter={(value: unknown) => [`${formatTonnes(Number(value))}t CO₂`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="dashboard-chart-legend">
            {pieData.map(cat => (
              <div key={cat.name} className="dashboard-chart-legend-item">
                <div className="dashboard-chart-legend-dot" style={{ background: cat.color }} />
                <span className="dashboard-chart-legend-label">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="dashboard-chart-card" aria-hidden="true">
          <h3 className="dashboard-chart-title">How You Compare</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparisonData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e0" />
              <XAxis type="number" tick={{ fill: '#718096', fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(1)}t`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#718096', fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{ background: '#e0e5ec', boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff', borderRadius: '12px', border: 'none', color: '#2d3748' }}
                formatter={(value: unknown) => [`${(Number(value)/1000).toFixed(1)} tonnes CO₂/year`, '']}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {comparisonData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

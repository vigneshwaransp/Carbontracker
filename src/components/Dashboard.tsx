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

const cardStyle: React.CSSProperties = {
  background: '#e0e5ec',
  boxShadow: '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff',
  borderRadius: '20px',
  padding: '1.5rem',
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
    <div style={{ padding: '5rem 1.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Grade Card */}
      <div style={{
        ...cardStyle, textAlign: 'center', marginBottom: '2rem',
      }}>
        <div style={{ fontSize: '4rem', fontWeight: 800, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2d3748', margin: '0.5rem 0' }}>
          {formatTonnes(breakdown.total)} tonnes CO₂/year
        </div>
        <div style={{ color: '#718096', fontSize: '1rem' }}>{grade.label}</div>
        <button onClick={onEdit} style={{
          marginTop: '1rem', background: '#e0e5ec',
          boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
          border: 'none', color: '#718096',
          padding: '0.5rem 1.2rem', borderRadius: '14px', cursor: 'pointer',
          fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s',
        }}>✏️ Update My Data</button>
      </div>

      {/* Category breakdown cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {pieData.map(cat => {
          const pct = breakdown.total > 0 ? Math.round((cat.value / breakdown.total) * 100) : 0;
          return (
            <div key={cat.name} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{CATEGORY_ICONS[cat.name.toLowerCase()]}</span>
                <span style={{ color: '#2d3748', fontWeight: 600, fontSize: '1rem' }}>{cat.name}</span>
              </div>
              <div style={{ color: cat.color, fontSize: '1.5rem', fontWeight: 700 }}>
                {formatTonnes(cat.value)}t
              </div>
              <div style={{ color: '#718096', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{pct}% of total</div>
              <div style={{
                height: '8px', borderRadius: '4px',
                background: '#e0e5ec',
                boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
                overflow: 'hidden',
              }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: '4px', background: cat.color, transition: 'width 1s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {/* Donut */}
        <div style={cardStyle}>
          <h3 style={{ color: '#2d3748', fontWeight: 700, margin: '0 0 1rem', fontSize: '1.05rem' }}>Emissions Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3} stroke="none">
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#e0e5ec', boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff', borderRadius: '12px', border: 'none', color: '#2d3748' }}
                formatter={(value: any) => [`${formatTonnes(Number(value))}t CO₂`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {pieData.map(cat => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color }} />
                <span style={{ color: '#718096', fontSize: '0.8rem' }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div style={cardStyle}>
          <h3 style={{ color: '#2d3748', fontWeight: 700, margin: '0 0 1rem', fontSize: '1.05rem' }}>How You Compare</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparisonData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e0" />
              <XAxis type="number" tick={{ fill: '#718096', fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(1)}t`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#718096', fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{ background: '#e0e5ec', boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff', borderRadius: '12px', border: 'none', color: '#2d3748' }}
                formatter={(value: any) => [`${(Number(value)/1000).toFixed(1)} tonnes CO₂/year`, '']}
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

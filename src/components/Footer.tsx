import React from 'react';

export const Footer: React.FC = () => (
  <footer style={{
    textAlign: 'center', padding: '2rem 1rem',
    color: '#a0aec0', fontSize: '0.8rem', marginTop: 'auto',
    background: '#e0e5ec',
  }}>
    <p style={{ margin: '0 0 0.3rem' }}>
      🌍 EcoTrack — Built with ❤️ for a sustainable future
    </p>
    <p style={{ margin: 0 }}>
      Carbon factors based on EPA & academic research. Data stored locally in your browser.
    </p>
  </footer>
);

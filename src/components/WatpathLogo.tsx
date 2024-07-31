import React from 'react';

const WatpathLogo = () => {
  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px', // Increased left margin for more space
  };

  const logoTextStyle = {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#FFFFFF',
    letterSpacing: '1px',
  };

  const accentStyle = {
    color: '#6AB4F0', // Adjusted to match the "future" text color
  };

  return (
    <div style={logoContainerStyle}>
      <span style={logoTextStyle}>WAT</span>
      <span style={{...logoTextStyle, ...accentStyle}}>PATH</span>
    </div>
  );
};

export default WatpathLogo;
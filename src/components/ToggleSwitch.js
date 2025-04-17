import React from 'react';

const ToggleSwitch = ({ onChange, checked }) => {
  return (
    <div
      className={`toggle-switch-18 ${checked ? 'active' : ''}`}
      onClick={() => onChange(!checked)}
    ></div>
  );
};

export default ToggleSwitch;
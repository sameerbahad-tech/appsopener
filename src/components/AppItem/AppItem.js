import React from 'react';
import './AppItem.css';

const AppItem = ({ app, appIndex, moodIndex, handleAppChange, discardApp }) => {
  return (
    <div className="app-item">
      <input
        type="text"
        placeholder="Application Path"
        value={app}
        onChange={(e) => handleAppChange(moodIndex, appIndex, e)}
        className="app-path"
        title="Enter the full path to the application"
      />
      <button onClick={() => discardApp(moodIndex, appIndex)} className="discard-app-button">x</button>
    </div>
  );
};

export default AppItem;

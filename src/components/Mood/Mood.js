import React from 'react';
import './Mood.css';
import AppItem from '../AppItem/AppItem';
import Note from '../Note/Note';

const Mood = ({ mood, moodIndex, handleMoodChange, handleAppChange, addApp, discardApp }) => {
  return (
    <div className="mood-group">
      <input
        type="text"
        placeholder="Mood Name"
        value={mood.name}
        onChange={(e) => handleMoodChange(moodIndex, e)}
        className="mood-name"
      />
      <div className="apps-group">
        {mood.apps.map((app, appIndex) => (
          <AppItem
            key={appIndex}
            app={app}
            appIndex={appIndex}
            moodIndex={moodIndex}
            handleAppChange={handleAppChange}
            discardApp={discardApp}
          />
        ))}
        <Note />
        <button onClick={() => addApp(moodIndex)} className="add-app-button">Add Application</button>
      </div>
    </div>
  );
};

export default Mood;

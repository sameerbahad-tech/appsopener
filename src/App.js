import React, { useState } from 'react';
import './App.css';
import Note from './Note.js';
import Instruction from './instruction.js';
import Footer from "./footer.js";

function App() {
  const [moods, setMoods] = useState([{ name: '', apps: [''] }]);
  const [script, setScript] = useState('');

  const handleMoodChange = (index, event) => {
    const newMoods = [...moods];
    newMoods[index].name = event.target.value;
    setMoods(newMoods);
  };

  const handleAppChange = (moodIndex, appIndex, event) => {
    const newMoods = [...moods];
    newMoods[moodIndex].apps[appIndex] = event.target.value;
    setMoods(newMoods);
  };

  const addMood = () => {
    setMoods([...moods, { name: '', apps: [''] }]);
  };

  const addApp = (moodIndex) => {
    const newMoods = [...moods];
    newMoods[moodIndex].apps.push('');
    setMoods(newMoods);
  };

  const generateScript = () => {
    let scriptContent = '@echo off\n';
    scriptContent += 'echo Select your work setup:\n';

    moods.forEach((mood, index) => {
      scriptContent += `echo ${index + 1}. ${mood.name}\n`;
    });

    scriptContent += 'set /p choice="Enter your choice: "\n\n';

    moods.forEach((mood, index) => {
      scriptContent += `if %choice%==${index + 1} (\n`;
      mood.apps.forEach(app => {
        scriptContent += `    start "" "${app}"\n`;
      });
      scriptContent += ')\n';
    });

    scriptContent += 'else (\n';
    scriptContent += '    echo Invalid choice. Please run the script again.\n';
    scriptContent += ')\n';

    setScript(scriptContent);
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apps-opener.bat';
    a.click();
  };

  return (
    <div className="App">
      <h1>AppsOpener</h1>
      <p>AppsOpener is a handy tool for all computer users. 
        It helps you quickly open multiple apps based on your work mood. 
        Just set up different moods with the apps you need, and AppsOpener will create a script to launch them all at once. 
        It's perfect for boosting your productivity and keeping your workflow smooth and organized.</p>
      {moods.map((mood, moodIndex) => (
        <div key={moodIndex} className="mood-group">
          <input
            type="text"
            placeholder="Mood Name"
            value={mood.name}
            onChange={(e) => handleMoodChange(moodIndex, e)}
            className="mood-name"
          />
          <div className="apps-group">
            {mood.apps.map((app, appIndex) => (
              <input
                key={appIndex}
                type="text"
                placeholder="Application Path"
                value={app}
                onChange={(e) => handleAppChange(moodIndex, appIndex, e)}
                className="app-path"
                title="Enter the full path to the application"
              />              
            ))}
            <Note></Note>
            <button onClick={() => addApp(moodIndex)} className="add-app-button">Add Application</button>
          </div>
        </div>
      ))}
      <button onClick={addMood} className="add-mood-button">Add Mood</button>
      <button onClick={generateScript} className="generate-script-button">Generate Script</button>
      {script && (
        <div className="script-output">
          <pre>{script}</pre>
          <button onClick={downloadScript} className="download-script-button">Download Script</button>
        </div>
        
      )}
      <Instruction></Instruction>
      <Footer></Footer>
    </div>
  
  );
}

export default App;

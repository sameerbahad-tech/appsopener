import React, { useState } from 'react';
import './App.css';
import Instruction from './components/Instruction/Instruction';
import Footer from './components/Footer/Footer';
import logo from './Assest/appsOpenerLogo.png';
import RefreshButton from './components/RefreshButton/RefreshButton';
import Mood from './components/Mood/Mood'; 


function App() {
  const [moods, setMoods] = useState([{ name: '', apps: [''] }]);
  const [script, setScript] = useState('');
  const [file, setFile] = useState(null);

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

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseBatFile(content);
    };
    reader.readAsText(uploadedFile);
  };

  const parseBatFile = (content) => {
    const lines = content.split('\n');
    const newMoods = [];
    const allMoods = [];
    let currentMood = null;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('echo')) {
        const moodMatch = trimmedLine.match(/echo \d+\. (.+)/);
        if (moodMatch) {
          allMoods.push(moodMatch[1]);
        }
      }

      if (trimmedLine.startsWith('start "" ')) {
        const appMatch = trimmedLine.match(/start "" "(.+)"|start "" (http.+)/);
        if (appMatch && currentMood) {
          currentMood.apps.push(appMatch[1] || appMatch[2]);
        }
      } else if (trimmedLine.startsWith('if %choice%==')) {
        const choiceMatch = trimmedLine.match(/if %choice%==(\d+)/);

        if (choiceMatch) {
          if (currentMood) {
            newMoods.push(currentMood);
          }
          const mood = choiceMatch[1] - 1;
          currentMood = { name: allMoods[mood], apps: [] };
        }
      }
    });

    if (currentMood) {
      newMoods.push(currentMood);
    }

    setMoods(newMoods);
  };

  const discardApp = (moodIndex, appIndex) => {
    const newMoods = [...moods];
    newMoods[moodIndex].apps = newMoods[moodIndex].apps.filter((_, i) => i !== appIndex);
    setMoods(newMoods);
  };

  return (
    <div className="App">
      <img src={logo} alt="appsopener" className="app-logo" />
      <h1>Apps Opener</h1>
      <p>
        AppsOpener is a handy tool for all computer users. It helps you quickly open multiple apps based on your work mood.
        Just set up different moods with the apps you need, and AppsOpener will create a script to launch them all at once.
        It's perfect for boosting your productivity and keeping your workflow smooth and organized.
      </p>

      <div>
        <b>Alter an Old File:</b>
        <input type="file" accept=".bat" onChange={handleFileUpload} className="upload-button" />
        {file && <p>File Uploaded: {file.name}</p>}
      </div>
      <RefreshButton />

      {moods.map((mood, moodIndex) => (
        <Mood
          key={moodIndex}
          mood={mood}
          moodIndex={moodIndex}
          handleMoodChange={handleMoodChange}
          handleAppChange={handleAppChange}
          addApp={addApp}
          discardApp={discardApp}
        />
      ))}

      <button onClick={addMood} className="add-mood-button">Add Mood</button>
      <button onClick={generateScript} className="generate-script-button">Generate Script</button>
      {script && (
        <div className="script-output">
          <pre>{script}</pre>
          <button onClick={downloadScript} className="download-script-button">Download Script</button>
        </div>
      )}
      <Instruction />
      <Footer />
    </div>
  );
}

export default App;

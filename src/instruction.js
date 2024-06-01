import React from 'react';

function Instruction() {
  return (
    <div className="note">
      <p>
        <strong>How to Use AppOpener Generated Script:</strong>
      </p>
      <b>Run Directly:</b>
          <ul>
            <li>After downloading the <code>apps-opener.bat</code> file, simply double-click it to run.</li>
            <li>Follow the prompts to select your mood and open the related applications</li>
          </ul>
        <strong>Add to Startup:</strong>
          <ul>
            <li>To have the script run automatically when your computer starts, place it in the Startup folder.</li>
            <li>Press <code>Win + R</code>, type <code>shell:startup</code>, and press Enter to open the Startup folder.</li>
            <li>Copy the downloaded <code>apps-opener.bat</code> file into this folder.</li>
            <li>The script will now run every time you start your computer, prompting you to select your mood.</li>
          </ul>
    </div>
  );
}

export default Instruction;

// RefreshButton.js

import React from 'react';

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <button className="add-app-button"  onClick={handleRefresh}>
      Refresh All <i class="fa fa-refresh" aria-hidden="true"></i>
    </button>
  );
};

export default RefreshButton;

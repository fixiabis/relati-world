import React from 'react';

const TutorialDialog = () => {
  return (
    <div className="overlay">
      <div className="tutorial-dialog">
        <div className="tutorial-dialog.description">
          <div className="tutorial-dialog.description-text"></div>
        </div>
        <div className="tutorial-dialog.character"></div>
      </div>
    </div>
  );
};

export default TutorialDialog;

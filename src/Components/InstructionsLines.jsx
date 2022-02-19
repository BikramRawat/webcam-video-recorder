import React from "react";

const InstructionsLines = () => {
  return (
    <div className="guidelines">
      <h3>Please answer these questions in your video application</h3>
      <div className="guidelines-sections">
        <h4>1. Introduction </h4>
        <p>Please give your introduction.</p>
      </div>
      <div className="guidelines-sections">
        <h4>2. Motivation</h4>
        <p>
          Describe about your passion and motivation towards the job position.
        </p>
      </div>
      <div className="guidelines-sections">
        <h4>3. Requirements</h4>
        <p>What are your skills that match the job requirements ? </p>
      </div>
      <div className="guidelines-sections">
        <h4>4. Personal Competences</h4>
        <p>Tell about your personal competences ?</p>
      </div>
      <div className="guidelines-sections">
        <h4>5. Closing</h4>
        <p>At last what you want to say ? </p>
      </div>
      <div className="guidelines-sections">
        <h4>
          Thanks for your interest in this position. We will be back soon to you
          ! 👌
        </h4>
      </div>
    </div>
  );
};
export default InstructionsLines;

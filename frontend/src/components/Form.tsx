import React from 'react';

interface FormProps {
  openNewModal: () => void;
}

export default function Form({ openNewModal }: FormProps) {
  return (
    <>
      <h2>Please Enter your Details</h2>
      <div className="form-container">
        <div>
          <label>Name</label>
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <label>Date of Birth</label>
        </div>
        <div>
          <input type="date" />
        </div>
        <div>
          <label>Email Address</label>
        </div>
        <div>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input type="password" />
        </div>
        <div>
          <button onClick={openNewModal}>Submit</button>
        </div>
      </div>
    </>
  );
}

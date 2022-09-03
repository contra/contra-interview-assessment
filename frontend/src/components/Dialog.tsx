import React from 'react';

export default function Dialog() {
  return (
    <div>
      <div className="">Are you sure the details are correct?</div>
      <div className="buttons-list">
        <button>Yes</button>
        <button style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </div>
  );
}

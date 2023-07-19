import React, { useState, useEffect } from 'react';

function MobileNumberVerification() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVerificationResult(data); // Set the server response in state
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  };

  useEffect(() => {
    if (verificationResult) {
      // Handle the verification result here
      console.log(verificationResult);
    }
  }, [verificationResult]);

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Mobile Number:
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </label>
      <button type="submit">Verify</button>
    </form>
  );
}

export default MobileNumberVerification;
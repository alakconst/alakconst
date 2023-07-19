import React, { useState } from 'react';

function OTPVerification() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Make an API call to your server for OTP verification
    fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVerificationResult(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="text"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <br />
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <br />
        <button type="submit">Verify</button>
      </form>
      {verificationResult && (
        <div>
          {verificationResult.success ? (
            <p>OTP verification successful!</p>
          ) : (
            <p>OTP verification failed. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OTPVerification;

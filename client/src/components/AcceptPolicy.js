import React, { useState } from 'react';

const TermsAndPolicies = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreementChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleAgreementSubmit = () => {
    if (agreed) {
      // Send the agreement to the server and store it in the database
      // You can make an API request using a library like Axios or fetch()
      // to send the agreement data to the server and handle database storage
      fetch('/api/storeAgreement', {
        method: 'POST',
        body: JSON.stringify({ agreed }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // Handle the response as needed
        })
        .catch(error => {
          // Handle errors
        });
    }
  };

  return (
    <div>
      
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleAgreementChange}
        />
        I agree to the terms and policies.
      </label>
      <button onClick={handleAgreementSubmit}>Submit</button>
    </div>
  );
};

// export default TermsAndPolicies;

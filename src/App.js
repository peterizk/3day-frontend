import React, { useState } from 'react';
import './App.css';

function App() {
  const defaultMainForm = { name: '', email: '', message: '' };
  const defaultCamper = { name: '', age: '', phone: '', email: '', grade: '' };

  const [mainForm, setMainForm] = useState(defaultMainForm);
  const [campers, setCampers] = useState([defaultCamper]);

  const handleMainChange = (e) => {
    setMainForm({ ...mainForm, [e.target.name]: e.target.value });
  };

  const handleCamperChange = (index, e) => {
    const updated = [...campers];
    updated[index][e.target.name] = e.target.value;
    setCampers(updated);
  };

  const addCamper = () => {
    setCampers([...campers, { ...defaultCamper }]);
  };

  const removeCamper = (index) => {
    if (index === 0) return;
    const updated = campers.filter((_, i) => i !== index);
    setCampers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  

    // Required: mainForm.email
    if (!mainForm.email) {
      alert('Your email is required.');
      return;
    }

    // Required: Camper 1 must have age and email
    const first = campers[0];
    if (!first.age || !first.email) {
      alert('Camper 1 must have age and email.');
      return;
    }

    const fullSubmission = {
      ...mainForm,
      campers,
    };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullSubmission)
      });
  
      const result = await response.json();

      if (response.ok) {
        alert('Form submitted successfully and saved to database!');
        console.log('Response:', result);
  
        // Reset form
        setMainForm({ name: '', email: '', message: '' });
        setCampers([{ name: '', age: '', phone: '', email: '', grade: '' }]);
      } else {
        alert('Error: ' + result.error);
      }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Something went wrong. Please try again later.');
    
    };

// After form is saved to database
const camperCount = campers.length;
const stripeSession = await fetch('http://localhost:5000/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ camperCount })
});

const stripeData = await stripeSession.json();
if (stripeData.url) {
  window.location.href = stripeData.url; // Redirect to Stripe Checkout
} else {
  alert('Error redirecting to Stripe');
}


    // Reset form
    setMainForm(defaultMainForm);
    setCampers([defaultCamper]);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Camper Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <legend><strong>Your Info</strong></legend>

          <label>Name:<br />
            <input
              type="text"
              name="name"
              value={mainForm.name}
              onChange={handleMainChange}
            />
          </label><br /><br />

          <label>Email:<br />
            <input
              type="email"
              name="email"
              value={mainForm.email}
              onChange={handleMainChange}
              required
            />
          </label><br /><br />

          <label>Message:<br />
            <textarea
              name="message"
              rows="3"
              value={mainForm.message}
              onChange={handleMainChange}
            ></textarea>
          </label>
        </fieldset>

        <br />

        <fieldset style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <legend><strong>Camper Info</strong></legend>

          {campers.map((camper, index) => (
            <div key={index} style={{ borderBottom: '1px dashed #ccc', marginBottom: '1rem', paddingBottom: '1rem' }}>
              <h3>
                Camper {index + 1} {index === 0 ? '(Required)' : ''}
                {index > 0 && (
                  <button
                    type="button"
                    style={{ marginLeft: '1rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                    onClick={() => removeCamper(index)}
                  >
                    Remove
                  </button>
                )}
              </h3>

              <label>Name:<br />
                <input
                  type="text"
                  name="name"
                  value={camper.name}
                  onChange={(e) => handleCamperChange(index, e)}
                />
              </label><br /><br />

              <label>Age:<br />
                <input
                  type="number"
                  name="age"
                  value={camper.age}
                  onChange={(e) => handleCamperChange(index, e)}
                  required={index === 0}
                />
              </label><br /><br />

              <label>Phone:<br />
                <input
                  type="tel"
                  name="phone"
                  value={camper.phone}
                  onChange={(e) => handleCamperChange(index, e)}
                />
              </label><br /><br />

              <label>Email:<br />
                <input
                  type="email"
                  name="email"
                  value={camper.email}
                  onChange={(e) => handleCamperChange(index, e)}
                  required={index === 0}
                />
              </label><br /><br />

              <label>Grade:<br />
                <input
                  type="text"
                  name="grade"
                  value={camper.grade}
                  onChange={(e) => handleCamperChange(index, e)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={addCamper}>➕ Add Another Camper</button>
        </fieldset>

        <br />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
}

export default App;

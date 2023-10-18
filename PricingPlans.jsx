import React, { useState } from 'react';
import './PricingPlans.css';
import { Button, Icon } from 'semantic-ui-react'; // Import Semantic UI Button and Icon components

function PricingPlans() {
  const [freePlanActivated, setFreePlanActivated] = useState(false);

  const handleFreePlanActivation = () => {
    setFreePlanActivated(true);
    // Show an alert when the free plan is activated
    window.alert("Free Plan Activated!");
  };

  return (
    <div className="pricing-plans">
      <div className="pricing-card">
        <h2 style={{ color: '#0073e6', fontSize: '32px' }}>Free Plan</h2>
        <p style={{ fontSize: '20px' }}>Get started with our basic features.</p>
        <Button
          className="free-button"
          onClick={handleFreePlanActivation}
          disabled={freePlanActivated}
          color='teal' // Use Semantic UI teal color
          size='large' // Make the button bigger
        >
          {freePlanActivated ? "Free Plan Activated" : "Choose Free"}
        </Button>
      </div>
      <div className="pricing-card premium-card">
        <h2 style={{ color: '#e74c3c', fontSize: '32px' }}>Premium Plan</h2>
        <p style={{ fontSize: '20px' }}>Unlock all premium features for maximum value.</p>
        <ul className="feature-boxes">
          <li><Icon name="check circle" /> Feature 1: Early access to updates</li>
          <li><Icon name="check circle" /> Feature 2: Unlock every feature of webiste</li>
          <li><Icon name="check circle" /> Feature 3: Get post Funtionality </li>
        </ul>
        <p style={{ fontSize: '20px', margin: '10px 0' }}>Price: 1000rs</p>
        <a href='https://buy.stripe.com/test_7sI28d3Kf9Pf1Z6eUU'>
          <Button className="premium-button" color='teal' size='large'>
            Choose Premium
          </Button>
        </a>
      </div>
    </div>
  );
}

export default PricingPlans;

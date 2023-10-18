import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import PostPage from './Page1';
import QuestionList from './QuestionList';
import PricingPlans from './PricingPlans';
import 'semantic-ui-css/semantic.min.css';
import Login from "./Login";
import Signup from "./Signup.js";
import SignOut from "./Signout.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/PricingPlans" element={<PricingPlans />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path='*' element={<React.Fragment> 
            <h1>Code Editor Example</h1>
          </React.Fragment>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth module from your firebase configuration

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut(); // Use auth.signOut() to sign out the user
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div>
            <h1>Sign Out</h1>
            <p>Click the button below to sign out:</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;

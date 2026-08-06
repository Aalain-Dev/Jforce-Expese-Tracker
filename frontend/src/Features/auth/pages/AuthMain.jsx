import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthMain = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <>
            {isSignIn ? (
                <SignIn onSwitchToSignUp={() => setIsSignIn(false)} />
            ) : (
                <SignUp onSwitchToSignIn={() => setIsSignIn(true)} />
            )}
        </>
    );
};

export default AuthMain;
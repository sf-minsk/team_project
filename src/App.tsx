import React from 'react';
import './App.css';

function App() {
    return (
        <>
            <div>
                <button>HOME</button>
                <button>Register</button>
                <button>Login</button>
                <button>Change Pasword</button>
            </div>
            <Route path='/profile/:userId?' render={() =>
                <ProfileContainer/>}
            />
        </>
    );
}

export default App;

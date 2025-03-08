import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 

const GOOGLE_CLIENT_ID = "635522559348-us1rjbpu999ptef58vkn4k73mmto01bk.apps.googleusercontent.com";
console.log(GOOGLE_CLIENT_ID)

const GoogleAuth: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  console.log(user)

  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential); // Use jwtDecode
    console.log("User Info:", decoded);
    setUser(decoded);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {!user ? (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <div>
            <h2>Welcome, {user.name}</h2>
            <img src={user.picture} alt="Profile" style={{ borderRadius: "50%" }} />
            <button onClick={handleLogout} style={{ marginTop: "10px", padding: "5px 10px" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;

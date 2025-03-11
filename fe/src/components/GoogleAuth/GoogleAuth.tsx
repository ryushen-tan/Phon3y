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
      <div className="text-center mt-12">
      {!user ? (
        <GoogleLogin theme="filled_blue" size="large" width={250}  onSuccess={handleSuccess} onError={handleError} />
      ) : (
        <div>
        <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
        <img src={user.picture} alt="Profile" className="rounded-full mt-4" />
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Logout
        </button>
        </div>
      )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;

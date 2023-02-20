import React from "react";
import "../styles/Home.css";
const Home = () => {
  return (
    <div className="home">
      <h1 className="home--header">Welcome to EzBots</h1>
      <p className="home--text">
        This is still a work in progress, come back later
      </p>
      <div className="home--box">
        <h2>How it works</h2>
        <h3>Step 1</h3>
        <p>
          Use command "/auth-local" to verify for a server or "/auth-global" to
          verify globally using our Auth discord bot to generate a token
        </p>
        <h3>Step 2</h3>
        <p>
          Go to 'verify' page and paste the token and sign the generated message
          to verify
        </p>
      </div>
    </div>
  );
};

export default Home;

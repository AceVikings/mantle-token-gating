import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Verify.css";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Verify = () => {
  const { jwt } = useParams();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [signature, setSignature] = useState("");
  const [token, setToken] = useState();

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      requestWallet();
    } catch (error) {
      console.error(error);
    }
  };

  const notify = (message) => toast(message);

  async function requestWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAddress(accounts[0]);

      const signerProvider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = await signerProvider.getSigner(0);
      setSigner(signer);
      const address = await signer.getAddress();
      setAddress(address);
      notify("Wallet Connected");
    } catch (err) {
      console.log(err);
    }
  }

  async function signMessage() {
    const sign = await signer.signMessage("Hello");
    setSignature(sign);
    console.log(sign);
  }

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };
  useEffect(() => {
    requestWallet();
    if (jwt) {
      setToken(jwt);
    }
  }, []);

  return (
    <div className="verify">
      <ToastContainer />
      {!address && (
        <>
          <h1 className="verify--header">Please connect Wallet to Continue</h1>
          <div className="metamask--button" onClick={connectWallet}>
            Connect Wallet
          </div>
        </>
      )}
      {address && (
        <>
          <h1 className="verify--header">Paste Token</h1>
          <textarea
            className="verify--text-area"
            onChange={handleTokenChange}
            value={token}
          ></textarea>
          <div className="metamask--button" onClick={signMessage}>
            Sign Message
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;

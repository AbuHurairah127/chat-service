import logo from "./logo.svg";
import { ethers } from "ethers";
import "./App.css";
import { useEffect } from "react";
const signMessage = async () => {
  try {
    if (!window.ethereum) {
      console.log(
        "Ethereum not found in window object means user is not a crypto user"
      );
    }
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage("test");
    console.log("🚀 ~ file: App.js:15 ~ signMessage ~ signature", signature);
    const address = await signer.getAddress();
    console.log(address);
  } catch (error) {}
};

function App() {
  useEffect(() => {
    signMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

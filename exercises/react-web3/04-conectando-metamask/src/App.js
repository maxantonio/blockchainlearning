import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Web3 from "web3";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
      net:'',
      isAddress: false,
      loading: false
    };
    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    this.web3 = new Web3(process.env.REACT_APP_PROVIDER_URL);
  }
  setWalletAddress (wallet){
    console.log(wallet);
    if(wallet)
      this.setState({address:wallet});
    else
    this.setState({address:"connect your account and try again to show"});
  }

  async ethEnabled(){
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;

    // if (window.ethereum) {
    //   await window.ethereum.send('eth_requestAccounts');
    //   window.web3 = new Web3(window.ethereum);
    //   return true;
    // }
    // return false;
  }
  connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if(this.ethEnabled()) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId'});
      // Check if user is connected to Mainnet
      // if(chainId != '0x1') {
      //   alert("Please connect to Mainnet");
      // } else {
        let wallet = accounts[0];
        this.setWalletAddress(wallet);
        this.setState({chainId:chainId})
      // }
    } else {
      alert("Please install MetaMask");
    }
  }

  

  

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
         <div>  
         <button className="btn btn-light text-dark" onClick={this.connectWallet}>Connect</button>
         <div className="address">Address: {this.state.address}</div>
         <div className="address">Network: {this.state.chainId}</div>
         </div>
      </Container>
    );
  }
}

export default App;

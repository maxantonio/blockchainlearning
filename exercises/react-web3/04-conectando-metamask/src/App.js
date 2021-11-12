import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Web3 from "web3";
var that = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
      net:'',
      isAddress: false,
      loading: false,
      status:'Conectar'
    };
    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    this.web3 = new Web3(process.env.REACT_APP_PROVIDER_URL);
    var storag = window.localStorage.getItem('connected');
    if(storag){
     window.ethereum.request({ method: 'eth_accounts' }).then(a=>this.setStatus(a));
    }
    that = this;
  }
  setStatus(a){
      if(a.length>0){
        console.log("conectado si esta",a);
        this.setState({status:'Conectado',address:a[0]});
        
      }
  }
  setWalletAddress (wallet){
    console.log(wallet);
    window.localStorage.setItem("connected",true);
    if(wallet)
      this.setState({address:wallet,status:'Conectado'});
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
   disconnectWallet(){
     if(window.ethereum){
     window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {}
        }
      ]
    }).then(function(a){
      console.log("connected ",a);
      window.localStorage.setItem("connected",true);
      that.connectWallet()
    });
  }else{
    alert('Por favor instale metamask');
  }
  }
 
  async disconnectWalletS(){
   window.localStorage.removeItem('connected');
   that.setState({status:"Conectar",address:""})
  }

  

  

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
         <div className="text-center">  
         <button className="btn btn-light text-dark" onClick={this.disconnectWallet}>{this.state.status}</button>
         { this.state.status == 'Conectado' &&
          <button className="btn btn-light text-dark ml-2" onClick={this.disconnectWalletS}>Desconectar</button>
         }
         <div className="card p-2"> {this.state.address}</div>
         
         </div>
      </Container>
    );
  }
}

export default App;

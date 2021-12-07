import React from 'react';
import './App.css';
import { Container,Form, Navbar, Nav } from 'react-bootstrap';
import Web3 from "web3";
const {Keypair} = require("@solana/web3.js")
const bip39 = require('bip39');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      symbol: '',
      decimals: '',
      totalSupply: '',
      validated:'novalid',
      publicKey:'',
      publicKey2:'',
      privateKey:'',
      privateKey2:'',
      value:'',
      entropy:'',
      entropy2:'',
      seed:'',
      seed2:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateWords = this.validateWords.bind(this);
    // bip39.setDefaultWordlist('spanish');
    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    // this.web3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  }
  generateWords(){
    let mnemonyc = bip39.generateMnemonic();
    let entropy = bip39.mnemonicToEntropy(mnemonyc)
    let seed = bip39.mnemonicToSeedSync(mnemonyc).toString('hex');
    
    const solanaWeb3 = require('@solana/web3.js');
    console.log(solanaWeb3);
    const seedArray = new Uint8Array(seed.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    console.log(seedArray.slice(0,32))
    let accountFromSeed = Keypair.fromSeed(seedArray.slice(0,32));
    // let keypair = Keypair.fromSecretKey(seed);
    // console.log(keypair);
    this.setState({symbol:mnemonyc,entropy:entropy,seed:seed,publicKey:accountFromSeed.publicKey.toBase58(),privateKey:accountFromSeed.secretKey});
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  validateWords(){
    if(bip39.validateMnemonic(this.state.value)){
      let seed = bip39.mnemonicToSeedSync(this.state.value).toString('hex');
      const seedArray = new Uint8Array(seed.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      console.log(seedArray.slice(0,32))
      let accountFromSeed = Keypair.fromSeed(seedArray.slice(0,32));
      console.log(accountFromSeed.secretKey);
      this.setState({validated:'valid',entropy2:bip39.mnemonicToEntropy(this.state.value),seed2:bip39.mnemonicToSeedSync(this.state.value).toString('hex'),publicKey2:accountFromSeed.publicKey.toBase58(),privateKey2:accountFromSeed.secretKey.toString()})
    }else{
      this.setState({validated:'novalid',entropy2:'',seed2:''});
    }
      
  }
  async componentDidMount() {
    // this.contract = new this.web3.eth.Contract(abi, address);
    
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" sticky="top" className="mb-5" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">Contrato BNB</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center flex-column pt-5">
        <button className="btn btn-light text-dark ml-2" onClick={()=>this.generateWords()}>Generar Clave</button>
       <b> mnemonic: </b>{ this.state.symbol }<br/>
       <b> entropy:</b> { this.state.entropy }<br/>
       <b> seed: </b> { this.state.seed }<br/>
       <b> solana Address:</b>{this.state.publicKey}
        <Form className="w-100 mb-5">
        
        <Form.Control type="text" placeholder="" className={this.state.validated}  value={this.state.value} onChange={this.handleChange} />
</Form>
<b> entropy:</b>
{ this.state.entropy2 }<br/>
<b> seed:</b>
{ this.state.seed2 }<br/>
<b> Wallet address:</b>
{ this.state.publicKey2 }<br/>
<b> Private Key:</b>
{ this.state.privateKey2 }<br/>

<button className="btn btn-light text-dark ml-2" onClick={()=>this.validateWords()}>Validar Clave</button>

        </Container>
      </div>
    );
  }
}

export default App;

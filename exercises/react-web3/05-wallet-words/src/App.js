import React from 'react';
import './App.css';
import {Container, Form, Navbar, Nav} from 'react-bootstrap';
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
            validated: 'novalid',
            publicKey: '',
            publicKey2: '',
            privateKey: '',
            privateKey2: '',
            value: '',
            entropy: '',
            entropy2: '',
            seed: '',
            seed2: '',
            selected: 'english'
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

    setLanguage(languaje) {
        bip39.setDefaultWordlist(languaje);
        this.setState({selected: languaje})
    }

    generateWords() {
        let mnemonyc = bip39.generateMnemonic();
        let entropy = bip39.mnemonicToEntropy(mnemonyc)
        let seed = bip39.mnemonicToSeedSync(mnemonyc).toString('hex');

        const solanaWeb3 = require('@solana/web3.js');
        console.log(solanaWeb3);
        const seedArray = new Uint8Array(seed.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        console.log(seedArray.slice(0, 32))
        let accountFromSeed = Keypair.fromSeed(seedArray.slice(0, 32));
        // let keypair = Keypair.fromSecretKey(seed);
        // console.log(keypair);
        this.setState({
            symbol: mnemonyc,
            entropy: entropy,
            seed: seed,
            publicKey: accountFromSeed.publicKey.toBase58(),
            privateKey: accountFromSeed.secretKey
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    validateWords() {
        if (bip39.validateMnemonic(this.state.value)) {
            let seed = bip39.mnemonicToSeedSync(this.state.value).toString('hex');
            const seedArray = new Uint8Array(seed.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            console.log(seedArray.slice(0, 32))
            let accountFromSeed = Keypair.fromSeed(seedArray.slice(0, 32));
            console.log(accountFromSeed.secretKey);
            this.setState({
                validated: 'valid',
                entropy2: bip39.mnemonicToEntropy(this.state.value),
                seed2: bip39.mnemonicToSeedSync(this.state.value).toString('hex'),
                publicKey2: accountFromSeed.publicKey.toBase58(),
                privateKey2: accountFromSeed.secretKey.toString()
            })
        } else {
            this.setState({validated: 'novalid', entropy2: '', seed2: ''});
        }

    }

    isActive(value) {
        return 'btn btn-default text-dark ' + ((value === this.state.selected) ? 'active' : '');
    }

    async componentDidMount() {
        // this.contract = new this.web3.eth.Contract(abi, address);

    }

    render() {
        return (
            <div>
                <Navbar expand="lg" sticky="top" className="mb-5" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#">BIP39 Generator</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="d-flex  align-items-center flex-column">
                    <legend>
                        BIP39 Mnemonic Code Converter
                    </legend>
                    <fieldset className="w-100">

                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-2  text-right">
                                    <label className="control-label bold text-right ">Selecciona el
                                        idioma:</label>
                                </div>
                                <div className="col-lg-9">
                                    <div className="btn-group">
                                        <button className={this.isActive('english')}
                                                onClick={() => this.setLanguage('english')}>English
                                        </button>
                                        <button className={this.isActive('japanese')}
                                                onClick={() => this.setLanguage('japanese')}>日本語
                                        </button>
                                        <button className={this.isActive('spanish')}
                                                onClick={() => this.setLanguage('spanish')}>Español
                                        </button>
                                        <button className={this.isActive('chinese_simplified')}
                                                onClick={() => this.setLanguage('chinese_simplified')}>中文(简体)
                                        </button>
                                        <button className={this.isActive('chinese_traditional')}
                                                onClick={() => this.setLanguage('chinese_traditional')}>中文(繁體)
                                        </button>
                                        <button className={this.isActive('french')}
                                                onClick={() => this.setLanguage('french')}>Français
                                        </button>
                                        <button className={this.isActive('italian')}
                                                onClick={() => this.setLanguage('italian')}>Italiano
                                        </button>
                                        <button className={this.isActive('korean')}
                                                onClick={() => this.setLanguage('korean')}>한국어
                                        </button>
                                        <button className={this.isActive('czech')}
                                                onClick={() => this.setLanguage('czech')}>Čeština
                                        </button>
                                        <button className={this.isActive('#portuguese')}
                                                onClick={() => this.setLanguage('#portuguese')}>Português
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-2  text-right">
                                    <label className="control-label bold text-right">Generar
                                        mnemonic
                                        :</label>
                                </div>
                                <div className="col-lg-9">
                                    <button className="btn btn-default text-dark ml-2"
                                            onClick={() => this.generateWords()}>Generar Clave
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-2  text-right">
                                    <label className="control-label bold">BIP39
                                        Mnemonic:</label>
                                </div>
                                <div className="col-lg-9"><input type="text" className="form-control"
                                                                 value={this.state.symbol}></input></div>
                            </div>

                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-2  text-right">
                                    <label className="control-label bold">BIP39
                                        Seed:</label>
                                </div>
                                <div className="col-lg-9"><input type="text" className="form-control"
                                                                 value={this.state.seed}></input></div>
                            </div>

                        </div>
                    </fieldset>

                    Mnemonic Language

                    <b> mnemonic: </b>{this.state.symbol}<br/>
                    <b> entropy:</b> {this.state.entropy}<br/>
                    <b> seed: </b> {this.state.seed}<br/>
                    <b> solana Address:</b>{this.state.publicKey}
                    <Form className="w-100 mb-5">

                        <Form.Control type="text" placeholder="" className={this.state.validated}
                                      value={this.state.value} onChange={this.handleChange}/>
                    </Form>
                    <b> entropy:</b>
                    {this.state.entropy2}<br/>
                    <b> seed:</b>
                    {this.state.seed2}<br/>
                    <b> Wallet address:</b>
                    {this.state.publicKey2}<br/>
                    <b> Private Key:</b>
                    {this.state.privateKey2}<br/>

                    <button className="btn btn-light text-dark ml-2" onClick={() => this.validateWords()}>Validar
                        Clave
                    </button>

                </Container>
            </div>
        );
    }
}

export default App;

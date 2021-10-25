import React from 'react';
import './App.css';
import { Container, Form, Row, Col, InputGroup, Navbar, Nav } from 'react-bootstrap';
import Web3 from "web3";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      symbol: '',
      decimals: '',
      totalSupply: '',
    };

    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    this.web3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  }

  async componentDidMount() {
    const abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "unfreeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "freezeOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "freeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Freeze", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Unfreeze", "type": "event" }];
    const address = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';
    this.contract = new this.web3.eth.Contract(abi, address);

    this.setState({ name: await this.contract.methods.name().call() });
    this.setState({ symbol: await this.contract.methods.symbol().call() });
    this.setState({ decimals: await this.contract.methods.decimals().call() });
    this.setState({ totalSupply: await this.contract.methods.totalSupply().call() });
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
          <Form className="w-100 mb-5">
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column md="2">
                <strong>Nombre</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <Form.Control type="text" placeholder="" value={this.state.name === '' ? 'Cargando...' : this.state.name} readOnly />
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSymbol">
              <Form.Label column md="2">
                <strong>Simbolo</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <Form.Control type="text" placeholder="" value={this.state.symbol === '' ? 'Cargando...' : this.state.symbol} readOnly />
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDecimals">
              <Form.Label column md="2">
                <strong>Decimales</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <Form.Control type="text" placeholder="" value={this.state.decimals === '' ? 'Cargando...' : this.state.decimals} readOnly />
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTotalSupply">
              <Form.Label column md="2">
                <strong># total de tokens</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <Form.Control type="text" placeholder="" value={this.state.totalSupply === '' ? 'Cargando...' : this.state.totalSupply} readOnly />
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;

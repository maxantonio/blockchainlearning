import React from 'react';
import './App.css';
import { Container, Form, Row, Col, InputGroup, Table, Navbar, Nav } from 'react-bootstrap';
import Web3 from "web3";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
      isAddress: false,
      loading: false,
      rowsTxs: [],
      scanUrl: 'https://testnet.bscscan.com/tx/',
      symbol: 'BNB'
    };

    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.checkTransactions = this.checkTransactions.bind(this);
    this.appendRow = this.appendRow.bind(this);
    this.handleChangeProvider = this.handleChangeProvider.bind(this);
    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
  }

  /**
   * Función para manejar el evento onChange del campo #formAddress
   * @param {*} event 
   */
  async handleChangeAddress(event) {
    let address = event.target.value
    /**
     * Verificando que la dirección introducida es válida
     */
    this.state.isAddress = await Web3.utils.isAddress(address)
    await this.setState({ address: address });
    if (this.state.isAddress) {
      var bal;

      this.setState({ loading: true });
      /** Obteniendo el balance de la dirección introducida */
      await this.web3.eth.getBalance(this.state.address)
        .then(response => {
          this.setState({ loading: false, balance: this.numberWithCommas(this.web3.utils.fromWei(response, 'ether')) });
          bal = response;
        });

      await this.checkTransactions(bal);

    } else {
      this.setState({ balance: '' })
    }
  }

  async checkTransactions(bal) {
    /**
     * Obteniendo el número del bloque actual
     */
    var currentBlock = await this.web3.eth.getBlockNumber();
    /**
     * Obteniendo la cantidad de transacciones de salida
     */
    var txCountSend = await this.web3.eth.getTransactionCount(this.state.address);
    var currentAddress = this.state.address.toLowerCase();

    /**
     * Ejecutariamos el proceso de busqueda, desde el bloque actual hacia el inicio,
     * mientras el número de bloques sea >= 0 y al menos tengamos transacciones de
     * salida o nuestro balance sea <= 0.
     */
    for (var i = currentBlock; i >= 0 && (txCountSend > 0 || bal > 0); --i) {
      try {
        let block = await this.web3.eth.getBlock(i);
        if (block && block.transactions) {
          /**
           * Ciclo para recorrer el listado de hash de transacciones 
           */
          for (let txHash of block.transactions) {
            /**
             * Obteniendo la transacción correspondiente al ciclo
             */
            let tx = await this.web3.eth.getTransaction(txHash)
            let from, to;
            if (tx.from)
              from = tx.from.toLowerCase();
            if (tx.to)
              to = tx.to.toLowerCase();
            /**
             * Verificando que la dirección insertada sea igual a la dirección de origen
             * en la transacción
             */
            if (currentAddress === from) {
              if (from !== to)
                bal = bal + tx.value;
              /**
               * Descontando en 1 la cantidad de transacciones de salida
               */
              txCountSend--;
              this.appendRow(tx);
            }
            /**
             * Verificando que la dirección insertada sea igual a la dirección de destino 
             * en la transacción
             */
            if (currentAddress === to) {
              if (from !== to)
                bal = bal - tx.value;
              this.appendRow(tx);
            }
          }
        }
      } catch (e) { console.error("Error en el bloque " + i, e); }
    }
  }

  /**
   * Función para manejar el evento onChange del campo #formNetwork
   * @param {*} event 
   */
  handleChangeProvider(event) {
    let provider = event.target.value
    switch (provider) {
      case 'testnet_bsc':
        this.web3.setProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
        this.setState({ scanUrl: 'https://bscscan.com/tx/' });
        this.setState({ symbol: 'BNB' });
        return;
      case 'mainnet_bsc':
        this.web3.setProvider('https://bsc-dataseed1.binance.org:443');
        this.setState({ scanUrl: 'https://testnet.bscscan.com/tx/' });
        this.setState({ symbol: 'BNB' });
        return;
      case 'ropsten_eth':
        this.web3.setProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
        this.setState({ scanUrl: 'https://ropsten.etherscan.io/tx/q' });
        this.setState({ symbol: 'ETH' });
        return;
      case 'mainnet_eth':
        this.web3.setProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
        this.setState({ scanUrl: 'https://etherscan.io/tx/' });
        this.setState({ symbol: 'ETH' });
        return;
      default:
        this.web3.setProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
        this.setState({ scanUrl: 'https://testnet.bscscan.com/tx/' });
        this.setState({ symbol: 'BNB' });
        return;
    }
  }

  /**
   * Función para aplicar "," como separador de miles antes del "."
   * @example
   * this.numberWithCommas(6589652.7487) // 6,589,652.7487
   * @param {number, string} x 
   * @returns {string}
   */
  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  appendRow(tx) {
    var joined = this.state.rowsTxs.concat(
      <tr key={tx.hash}>
        <td><a href={this.scanUrl + tx.hash} rel="noreferrer" target="_blank">{this.truncate(tx.hash, 20)}</a></td>
        <td>{this.truncate(tx.from, 20)}</td>
        <td>{this.truncate(tx.to, 20)}</td>
        <td>{this.numberWithCommas(this.web3.utils.fromWei(tx.value, 'ether'))}</td>
      </tr>
    );
    this.setState({ rowsTxs: joined })
  }

  truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  render() {
    return (
      <div>
        <Navbar expand="lg" sticky="top" className="mb-5" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">Saldo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <Col sm="2">
                <Form.Select controlid="formNetwork" aria-label="Default select example" onChange={this.handleChangeProvider} defaultValue="testnet_bsc">
                  <option value="testnet_bsc">Testnet BSC </option>
                  <option value="mainnet_bsc">Mainnet BSC </option>
                  <option value="ropsten_eth">Ropsten ETH</option>
                  <option value="mainnet_eth">Mainnet ETH</option>
                </Form.Select>
              </Col>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center flex-column pt-5">
          <Form className="w-100 mb-5">
            <Form.Group as={Row} className="mb-3" controlId="formAddress">
              <Form.Label column sm="2">
                <strong>Dirección</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup hasValidation>
                  <Form.Control type="text" placeholder="" isInvalid={this.state.address && !this.state.isAddress} value={this.state.address} onChange={this.handleChangeAddress} />
                  <Form.Control.Feedback type="invalid">
                    Inserte una dirección valida
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBalance">
              <Form.Label column sm="2">
                <strong>Saldo</strong>
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <Form.Control type="text" placeholder="" value={this.state.loading ? 'Cargando...' : this.state.balance} readOnly />
                  <InputGroup.Text>{this.state.symbol}</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>

          <h4 className="mb-3">Últimas transacciones</h4>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Desde</th>
                <th>Hacia</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rowsTxs}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-center">Cargando...</td>
              </tr>
            </tfoot>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;

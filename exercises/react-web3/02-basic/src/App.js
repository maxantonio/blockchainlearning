import React from 'react';
import './App.css';
import { Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Web3 from "web3";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
      isAddress: false,
      loading: false
    };
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.checkBlock = this.checkBlock.bind(this);
    /** 
     * Iniciando objeto Web3 
     * @example this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
     */
    this.web3 = new Web3(process.env.REACT_APP_PROVIDER_URL);
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

      await this.checkBlock(bal);

    } else {
      this.setState({ balance: '' })
    }
  }

  async checkBlock(bal) {
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
            let from = tx.from.toLowerCase();
            let to = tx.to.toLowerCase();
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
              console.log("OUT: ", tx);
            }
            /**
             * Verificando que la dirección insertada sea igual a la dirección de destino 
             * en la transacción
             */
            if (currentAddress === to) {
              if (from !== to)
                bal = bal - tx.value;
              console.log("IN: ", tx);
            }
          }
        }
      } catch (e) { console.error("Error en el bloque " + i, e); }
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

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form className="w-100">
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
                <InputGroup.Text>ETH</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default App;

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
      this.setState({ loading: true });
      /** Obteniendo el balance de la dirección introducida */
      await this.web3.eth.getBalance(this.state.address)
        .then(response => (
          this.setState({ loading: false, balance: this.numberWithCommas(this.web3.utils.fromWei(response, 'ether')) })
        ));
    } else {
      this.setState({ balance: '' })
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
                <InputGroup.Text>BNB</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default App;

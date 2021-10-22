# Ethereum
Se obtiene el balance al insertar la dirección
pública de una billetera y las transacciones.
Nota: No es recomendable utilizar esta vía.

##### Pasos iniciales:
Debe crear en la raiz del proyecto el fichero .env con la
siguiente variable REACT_APP_PROVIDER_URL y utilizar la red
deseada.

mainnet: https://bsc-dataseed1.binance.org:443

testnet: https://data-seed-prebsc-1-s1.binance.org:8545

Ejemplo:
    
    REACT_APP_PROVIDER_URL='https://bsc-dataseed1.binance.org:443'


##### Instalar dependencias:
    
    npm install

##### Iniciar server:

    npm start

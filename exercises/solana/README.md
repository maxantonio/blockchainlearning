<p align="center">
  <a href="https://solana.com">
    <img alt="Solana" src="https://i.imgur.com/uBVzyX3.png" width="250" />
  </a>
</p>

[![Build status][travis-image]][travis-url] [![Gitpod
Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

[travis-image]:
https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Interacción con Solana

 Cliente y contrato en rust con 2 contadores ejecutando modificador y accediendo a la informacion desde un cliente node( que puede ser con rust tambien o cualquier otro lenguage).

El proyecto conciste en:

* Un programa on-chain desarrollado en rust
* Un cliente que envia una instruccion al contrato de la cadena y luego pide el estado actual de la cuenta


## Tabla de contenido
  - [Quick Start](#quick-start)
    - [Configurando CLI](#configurando-cli)
    - [Start local Solana cluster](#start-local-solana-cluster)
    - [Instalar dependencias de npm](#instalar-dependencias-npm)
    - [Build on-chain program](#build-on-chain-program)
    - [Deploy on-chain program](#deploy-on-chain-program)
    - [Run JavaScript client](#run-the-javascript-client)
    

## Quick Start


Las siguientes dependencias son requeridas
- Install node (v14 recommended)
- Install npm
- Install Rust v1.56.1 or later from https://rustup.rs/
- Install Solana v1.8.2 or later from
  https://docs.solana.com/cli/install-solana-cli-tools


### Configurando CLI

> Si estas usando window se recomienda usar [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) para correr estos comandos

1. Set CLI config url para el cluester de localhost

```bash
solana config set --url localhost
```

2. Crear el CLI Keypair

Si es la primera vez usando Solana CLI, necesitaras generar un nuevo keypair:

```bash
solana-keygen new
```

### Start local Solana cluster

Para iniciciar el servidor cluster local correr el siguiente comando:
```bash
solana-test-validator
```
> **Note**: quizas necesites hacer algun [system tuning](https://docs.solana.com/running-validator/validator-start#system-tuning) para que funcione bien el validador

Ver los registros de logs (ejecutarlo en otra terminal):
```bash
solana logs
```

### Instalar dependencias npm

```bash
npm install
```

### Build on-chain program


```bash
npm run build:program-rust
```


### Deploy on-chain program

Para desplegar la versión compilada se puede ejecutar el siguiente comando o el indicado al final de la compilación

```bash
solana program deploy dist/program/helloworld.so
```

### Run JavaScript client

```bash
npm run start
```


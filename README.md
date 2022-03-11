# blockchainlearning
Blockchain learning - step by step exercises 

Here you will find blockchain exercises with detailed information and comments that will allow you to initiate your pathway as a blockchain developer.

# Recomendend external tools and documentation


## Tools


## Blogs

https://wissal-haji.medium.com
https://dlt-repo.net/

## MINTER

Before run the minter program we need to install the next dependencies

1- Node.js - I recommend installing Node using either nvm or fnm

2- Solana Tool Suite - You can see the installation instructions here. note - If you have any issues installing Solana on an M1 Mac, try building from source and check out this guide.

3- Anchor (including the Mocha installation) - Anchor installation was pretty straight-forward for me. You can find the installation instructions here.

4- Solana browser wallet - I recommend Phantom, which is what I have tested this app with.

To run our minter we need to follow the following steps

1- run in a separate terminal 'solana-test-validator

2- build the program(contract) using the command

        anchor build

4- airdrop some SOL to deploy the program using the command

        solana airdrop 10 

3- Deploy the program using de command

        anchor deploy


if this command fail try to copy the address and airdrop some SOL to that address.
At the end of deploy process an address is displayed, copy this address and replace it in 
files:

Anchor.toml
        token_minter = "PROGRAM ADDRESS"
programs/token_minter/lib.rs
        declare_id!("PROGRAM ADDRESS");

after replace this build and deploy again the program.(we must update this step using ''solana address -k target/deploy/token_minter-keypair.json to get the address first time after build)

4 Install node dependencies off the project using the comand 

        npm install

4- Move to folder /app and install dependencies using the comand 

        npm install

5- Run the aplication using comand

        npm start

To test the aplication we recomend use Chrome with Phantom wallet.
Remember change network selection to Localnet.









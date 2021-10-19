// SPDX-License-Identifier: MIT

// This is one of the most basic contracts in solidity, you only need at least one .sol file to 
// have a contact, after having your contract you need to compile the file to obtain the compiled 
// version, after that you can deploy the contract to any compatible blockchain (ethereum, binance, 
// avalanche, polygon).
// One of the easiest ways to compile and deploy a contract is to use the online tool
//  https://remix.ethereum.org (for ethereum deployment).
// Alternative you can use an IDE tool like truffle or the compiler provided by ethereum.

// step 1 : Declaring the compiler version that we are going to use 
pragma solidity >=0.4.22 <0.9.0;

// Declaring this is a contract named Experimental.
//  Their simple ability is to create a string variable with the content "You are learning fast"
//  and be able to get this value from the blockchain.

contract Experimental {
    string public word = "You are learning fast";

    // Function to get the value of the string word
    function get() public view returns (string memory) {
        return word;
    }
}
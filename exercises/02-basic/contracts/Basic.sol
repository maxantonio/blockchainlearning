// SPDX-License-Identifier: MIT
// Declaring the desired version of the compiler 
pragma solidity >=0.4.22 <0.9.0;


contract Basic {

string message = "Hello World";   

// Function to get the value of the string word
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    

    // Function to get the value of the string word
    function getMessage() public view returns (string memory) {
        return message;
    }



}
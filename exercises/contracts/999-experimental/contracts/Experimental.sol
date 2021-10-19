// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Experimental {
    string public word = "You are learning fast";

    // Function to get the value of word
    function get() public view returns (string memory) {
        return word;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedGuard {
    struct Record {
        string data; // Encrypted patient data
        address owner; // Patient's address
    }

    mapping(uint256 => Record) public records;
    uint256 public totalRecords;

    event RecordAdded(uint256 id, string data);

    // Add a new medical record
    function addRecord(string memory _data) public {
        records[totalRecords] = Record(_data, msg.sender);
        emit RecordAdded(totalRecords, _data);
        totalRecords++;
    }

    // Get a medical record by ID
    function getRecord(uint256 id) public view returns (string memory) {
        require(records[id].owner == msg.sender, "Not authorized");
        return records[id].data;
    }
}
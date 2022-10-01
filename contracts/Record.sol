//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./CrowdFund.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Record {
    using Counters for Counters.Counter;
    Counters.Counter private fundIds;

    struct Fund {
        uint256 balance;
        address contractAddress;
    }

    mapping(uint => address payable) idToFund;

    function storeData(address payable _fund) public {
        // CrowdFund fund = CrowdFund(_fund);

        uint _id = fundIds.current();
        // address _contAddress = _fund;
        idToFund[_id] = _fund;

        fundIds.increment();
    }

    function myContracts(address owner) public view returns (Fund[] memory) {
        uint256 totalFundCount = fundIds.current();
        uint256 fundCount = 0;
        uint256 currentFundIndex = 0;

        for (uint i = 0; i < totalFundCount; i++) {
            CrowdFund fund = CrowdFund(idToFund[i]);
            if (fund.getOwner() == owner) {
                fundCount += 1;
            }
        }

        Fund[] memory items = new Fund[](fundCount);

        for (uint i = 0; i < totalFundCount; i++) {
            CrowdFund fund = CrowdFund(idToFund[i]);
            if (fund.getOwner() == owner) {
                items[currentFundIndex].balance = fund.getBalance();
                items[currentFundIndex].contractAddress = idToFund[i];
                currentFundIndex += 1;
            }
        }

        return items;
    }

    function getAllFunds() public view returns (Fund[] memory) {
        uint256 totalFundCount = fundIds.current();

        Fund[] memory items = new Fund[](totalFundCount);

        for (uint i = 0; i < totalFundCount; i++) {
            CrowdFund fund = CrowdFund(idToFund[i]);
            items[i].balance = fund.getBalance();
            items[i].contractAddress = idToFund[i];
        }

        return items;
    }
}

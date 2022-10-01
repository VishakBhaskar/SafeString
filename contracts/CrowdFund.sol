// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFund {
    uint256 fundGoal;
    uint256 minContribution;
    address public owner;
    string cause;

    address payable destinationWallet;

    mapping(address => uint256) addressContributions;

    constructor(
        uint256 _fundGoal,
        uint256 _minContribution,
        string memory _cause
    ) {
        fundGoal = _fundGoal;
        minContribution = _minContribution;
        destinationWallet = payable(msg.sender);
        owner = msg.sender;
        cause = _cause;
    }

    function donate() public payable {
        require(
            msg.value >= minContribution,
            "Donate Error: Did not meet minimum contribution"
        );
        addressContributions[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public {
        require(
            address(this).balance >= fundGoal,
            "Withdraw Error: Did not meet contribution goal"
        );
        destinationWallet.transfer(address(this).balance);
    }

    function returnFunds() public {
        require(
            address(this).balance < fundGoal,
            "ReturnFunds Error: Cannot refund, goal has been met"
        );
        require(
            addressContributions[msg.sender] != 0,
            "ReturnFunds Error: You have not contributed"
        );
        uint256 amount = addressContributions[msg.sender];
        payable(msg.sender).transfer(amount);
    }

    function getDestinationWallet() public view returns (address) {
        return destinationWallet;
    }

    function getFundGoal() public view returns (uint256) {
        return fundGoal;
    }

    function getMinimumContro() public view returns (uint256) {
        return minContribution;
    }

    function setMinContribution(uint256 minContro) public onlyOwner {
        minContribution = minContro;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function getAddressToContribution(address contributor)
        public
        view
        returns (uint256)
    {
        return addressContributions[contributor];
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCause() public view returns (string memory) {
        return cause;
    }

    function isClosed() public view returns (bool) {
        if (address(this).balance < fundGoal) {
            return false;
        } else {
            return true;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Need to have a fallback function for the contract to be able to receive funds
    receive() external payable {}
}

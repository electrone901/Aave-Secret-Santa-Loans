// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SecretSanta {
    using SafeMath for uint256;

    struct Participant {
        address wallet;
        uint256 depositAmount;
        string tokenName;
    }

    uint256 public depositAmount = 5 * 1e6; // 5 USDC with 6 decimals
    uint256 public gameId;
    mapping(address => Participant) public participants;
    address[] public participantList;
    Participant[] public unwrappedGifts;

    event GameStarted(uint256 gameId);
    event GiftUnwrapped(address participant, string tokenName, uint256 amount);
    event GameEnded();

    modifier onlyParticipants() {
        require(participants[msg.sender].wallet == msg.sender, "You are not a participant");
        _;
    }

    constructor() {
    }

    function joinGame(address _usdcToken) external {
        IERC20 usdcToken = IERC20(_usdcToken);
        require(usdcToken.transferFrom(msg.sender, address(this), depositAmount), "Failed to transfer USDC");
        participants[msg.sender] = Participant(msg.sender, depositAmount, "USDC");
        participantList.push(msg.sender);
    }

    function getParticipants() external view returns (address[] memory) {
        return participantList;
    }

    function startGame(address _usdcToken) external  {
        require(participantList.length > 1, "Not enough participants");
        gameId++;
        _randomlyDistributeTokens(_usdcToken);
        emit GameStarted(gameId);
    }

    function _randomlyDistributeTokens(address _usdcToken) internal {
        IERC20 usdcToken = IERC20(_usdcToken);
        uint256 numParticipants = participantList.length;
        for (uint256 i = 0; i < numParticipants; i++) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, i))) % numParticipants;
            address participant = participantList[i];
            address receiver = participantList[randomIndex];
            // Distribute tokens to the receiver (for simplicity, using the same token name and amount)
            usdcToken.transfer(receiver, depositAmount);
        }
    }

    function pickAndUnwrapGift() external onlyParticipants {
        // Pick someone to unwrap their gift
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % participantList.length;
        address receiver = participantList[randomIndex];

        // Remove the user from the game
        delete participants[msg.sender];
        for (uint256 i = 0; i < participantList.length; i++) {
            if (participantList[i] == msg.sender) {
                participantList[i] = participantList[participantList.length - 1];
                participantList.pop();
                break;
            }
        }

        emit GiftUnwrapped(msg.sender, "USDC", depositAmount);
    }

    // Implement other game instructions as requested
    // ...

    function endGame() external  {
        // Check if there is only one player left or all gifts have been unwrapped
        require(participantList.length == 1 || unwrappedGifts.length == participantList.length, "Game still in progress");
        emit GameEnded();
    }
}

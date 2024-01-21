# Aave Secret Santa Loans

### Web3 tech stack

- This application makes use of tableland to store users' quiz scores. This allows to query all scores, top 10 scores, and highest scores to display a leader board so this is a community-driven app.Tableland stores users' NFTs info and scores: - function to store all metadata for an NFT(tx hash, quiz name, quiz id, user wallet, date) - function to store users' scores - function that returns a user scores - function that returns top 10 user scores

- Sepolia Network: We deployed our dApp on the Sepolia Network with contract address 0xe1fc2d6bd2e43ea944172ce9469a18193eeb40734c387fed3e519498ebd65d1e for secure, fastest, and unexpensive transactions. We are using this contract to keep track of the user's posted quizzes, successfully answered quizzes, NFT awards, user profiles, and rating systems.

- Family Wallet: The "Family Wallet" seamlessly integrates wallets with our platform, facilitating user authentication and enabling seamless interaction with the associated smart contract.

- SDK aave protocol-js: we are using the GHO token for loan & staking purposes, leveraging its stability as a token.

- This application uses NFTStorage to store metadata for NFTs rewards and metadata quiz information such as quiz description, title, category, level, language, image, author, questions, and options.

- ENS: Our application uses ENS to lookup ENS and fetches ENS Avatar and displays an address ENS with a Blockie image and option to copy the address.
- We used Solidity for the smart contract.

- We used OpenZeppelin ERC720 we use the ERC721 template for faster development of our smart contract.

- Hardhat for local blockchain development.

- We used Tailwind, MUI, Nextjs, and ReactJS for the frontend, and Ethersjs to connect to the blockchain.

- Mantle Testnet: The application has been deployed on the Mantle network, renowned for its secure, swift, and cost-effective transactions. We utilize this contract to meticulously record user-generated quizzes, completed quizzes, NFT awards, user profiles, and the accompanying rating systems.

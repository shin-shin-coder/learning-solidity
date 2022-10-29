# MyNft
# Environment
- Node.js: v16.17.0
- npm: 8.15.0
- Solidity: 0.8.17

# Setup

## Contract
- Change directory

```
cd contracts
```

- Install dependencies

```sh
$ npm install
```

- Start node

```sh
$ npm run dev:node
```

- Deploy contract

```sh
$ npm run dev:deploy

> invitation_nft@1.0.0 dev:deploy
> hardhat run scripts/deploy.ts --network localhost

InvitationNFT was deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

- Move artifact files.

```sh
$ cp -rf ./artifacts ../clients/artifacts
```

- Set your own parameters to `contracts/config.ts`.

## Client
- Change directory

```
cd clients
```

- Install dependencies

```sh
$ npm install
```

- Set your own parameters to `clients/config.ts`.

- Start app

```sh
$ npm run dev
```

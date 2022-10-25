import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import appConfig from './config';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: appConfig.API_URL,
      accounts: [`0x${appConfig.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: appConfig.ETHERSCAN_API_KEY,
  },
};

export default config;

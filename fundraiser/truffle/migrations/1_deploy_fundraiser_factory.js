const SimpleStorage = artifacts.require('SimpleStorage');
const FundraiserFactoryContract = artifacts.require('FundraiserFactory');

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FundraiserFactoryContract);
};

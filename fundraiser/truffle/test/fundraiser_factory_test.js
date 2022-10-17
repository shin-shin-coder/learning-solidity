const FundraiserFactoryContract = artifacts.require('FundraiserFactory');

contract('FundraiserFactory: deployment', () => {
  it('has been deployed', async () => {
    const fundraiserFactory = FundraiserFactoryContract.deployed();
    assert(fundraiserFactory, 'fundraiser factory was not deployed');
  });
});

contract('FundraiserFactory: createFundraiser', (accounts) => {
  let fundraiserFactory;
  const name = 'Beneficiary Name';
  const url = 'beneficiaryname.org';
  const imageURL = 'https://placekitten.com/600/350';
  const description = 'Beneficiary description';
  const beneficiary = accounts[1];

  beforeEach(async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
  });

  it('increments the fundraisersCount', async () => {
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();

    await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );

    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount - currentFundraisersCount,
      1,
      'should increment by 1'
    );
  });

  it('emits the FundraiserCreated event', async () => {
    const tx = await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );

    const expectedEvent = 'FundraiserCreated';
    const actualEvent = tx.logs[0].event;

    assert.equal(actualEvent, expectedEvent, 'events should match');
  });
});

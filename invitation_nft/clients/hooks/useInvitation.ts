import { ethers } from 'ethers';
import {
  useState,
  useCallback,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import ABI from '../artifacts/contracts/InvitationNFT.sol/InvitationNFT.json';
import config from '../config';

interface Window {
  ethereum: any;
}
declare var window: Window & typeof globalThis;

const contractAddress = config.CONTRACT_ADDRESS;

export const useInvitation = () => {
  const [addressToInvite, setAddressToInvite] = useState<string>('');

  const onChangeAddressToInvite: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setAddressToInvite(event.target.value);
    }, []);

  const onSubmiteInvitationForm: FormEventHandler<HTMLFormElement> =
    useCallback(
      async (e) => {
        e.preventDefault();

        if (!addressToInvite) {
          window.alert('Error: Must input address to invite.');
          return;
        }

        try {
          const { ethereum } = window;

          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const contract = new ethers.Contract(
              contractAddress,
              ABI.abi,
              provider
            );
            const signer = provider.getSigner();
            const contractWithSigner = contract.connect(signer);

            const nftTx = await contractWithSigner.mintAndTransfer(
              addressToInvite
            );
            const tx = await nftTx.wait();
            console.log('Mined!', tx);
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log('Error minting character', error);
        }
      },
      [addressToInvite]
    );

  return { addressToInvite, onChangeAddressToInvite, onSubmiteInvitationForm };
};

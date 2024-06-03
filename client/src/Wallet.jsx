import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

import server from './server';

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey)); // address
    setAddress(publicKey);
    if (address) {
      console.log(19, address);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder='Set Private key'
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <label>
        Wallet Address
        <input
          placeholder='Type an address, for example: 0x1'
          value={address}
          // onChange={onChange}
        ></input>
      </label>

      {/* <div className='balance'>Public: {publicKey}</div> */}
      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

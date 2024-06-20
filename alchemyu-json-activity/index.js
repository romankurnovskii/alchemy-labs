const axios = require('axios');

const ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/WLFkLOuCPmN1PjMOURk6PxNeTEbNf_4I";

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [
        "0xa1e4380a3b1f749673e270229993ee55f35663b4", // block 46147
        'latest' // retrieve the full transaction object in transactions array
    ]
}).then((response) => {
    console.log(response.data.result);
});
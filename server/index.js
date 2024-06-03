const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "034eeeee78809e08b11bdb0bcc8145a11f120f8d280bac61e42403ddcfb6e3d161": 1003,
  "028d0aa36ae245ad85ba0d640198a3a3156c753451dc542d68c3a6621f6639f92e": 505,
  "03e783bbd7a9b2636f49e815ef8f3aa6276a9eae9d400ea1f8ed9e8a8ccded20b6": 74,
  "02c9287a5100b11f2432a139be32619362297fd1bada5b87116fafbb4c7e700b17": 75,
  "035219de99d52bca3366968c37883740893feb236d79345955beeb2c7b91d739f3": 725,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

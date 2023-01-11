const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);



async function main() {

  //  Name that is on the niceList
  let name = 'Traci McDermott';

  // proof
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name, proof
  });

  console.log(name, { gift });

  //  Name that is not on the niceList
  name = 'Prakhar Goyal';

  // proof
  index = niceList.findIndex(n => n === name);
  proof = merkleTree.getProof(index);

  const { data: gift2 } = await axios.post(`${serverUrl}/gift`, {
    name, proof
  });

  console.log(name, { gift2 });
}

main();
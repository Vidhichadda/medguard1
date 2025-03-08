const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with actual contract address
const contractABI = [ /* Your Smart Contract ABI */ ]; // Replace with actual contract ABI

let web3;
let contract;
let account;

async function connectBlockchain() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];

        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Connected to contract:", contract);
    } else {
        alert("Please install MetaMask!");
    }
}

async function uploadRecord() {
    const ipfsHash = document.getElementById("ipfsHash").value;
    if (!ipfsHash) return alert("Enter a valid IPFS hash.");

    await contract.methods.addRecord(1, ipfsHash).send({ from: account });
    alert("Record uploaded successfully!");
}

async function grantAccess() {
    const doctorAddress = document.getElementById("doctorAddress").value;
    if (!doctorAddress) return alert("Enter a valid wallet address.");

    await contract.methods.grantAccess(doctorAddress).send({ from: account });
    alert("Access granted!");
}

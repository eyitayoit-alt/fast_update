const FLARE_CONTRACTS = "@flarenetwork/flare-periphery-contract-artifacts";
const FLARE_RPC = "https://rpc.ankr.com/flare_coston2";
const FLARE_CONTRACT_REGISTRY_ADDR =
  "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";
const FAST_UPDATE_ABI_URL = `https://api.routescan.io/v2/network/testnet/evm/114/etherscan/api?module=contract&action=getabi&address=0x58fb598EC6DB6901aA6F26a9A2087E9274128E59&format=raw`;

async function runFastUpdate(feed_indices) {
  // 1. Import Dependencies
  const ethers = await import("ethers");
  const flare = await import(FLARE_CONTRACTS);
  const provider = new ethers.JsonRpcProvider(FLARE_RPC);

  // 2. Access the Contract Registry
  const flareContractRegistry = new ethers.Contract(
    FLARE_CONTRACT_REGISTRY_ADDR,
    flare.nameToAbi("FlareContractRegistry", "coston2").data,
    provider
  );

  // 3. Retrieve the FastUpdater Contract
  const updaterAddress = await flareContractRegistry.getContractAddressByName(
    "FastUpdater"
  );

  // 4. Fetch FastUpdater ABI
  // const abiResponse = await fetch(FAST_UPDATE_ABI_URL);
  // const abiJson = await abiResponse.json();

  // 5. Retrieve the Feeds for specified indexes
  const updater = new ethers.Contract(
    updaterAddress,
    flare.nameToAbi("FastUpdater", "coston2").data,
    provider
  );
  // const updater = new ethers.Contract(updaterAddress, abiJson, provider);
  const res = await updater.fetchCurrentFeeds(feed_indices);

  // 6. Log Feeds data
  console.log("Feeds:", res[0]);
  console.log("Decimals:", res[1]);
  console.log("Timestamp:", res[2]);
}

// Feed indices: 0 = FLR/USD, 2 = BTC/USD, 9 = ETH/USD
runFastUpdate([0, 2, 9]);

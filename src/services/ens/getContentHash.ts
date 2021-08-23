import { ZERO_ADDRESS } from "./../../constants";
import { ENS_REGISTRY } from "../../constants";
import { callView } from "../../utils/ethereum";

import { Base58 } from "@ethersproject/basex";
import { namehash } from "ethers/lib/utils";
import { ethers } from "ethers";

export const getContentHash = async (
  domain: string,
  web3?: ethers.providers.JsonRpcProvider
) => {
  const resolverAddress = await callView(
    ENS_REGISTRY,
    "function resolver(bytes32 node) external view returns (address)",
    [namehash(domain)],
    web3
  );

  if (resolverAddress === ZERO_ADDRESS) {
    return "";
  }

  const hash = await callView(
    resolverAddress,
    "function contenthash(bytes32 node) external view returns (bytes)",
    [namehash(domain)],
    web3
  );

  if (hash === "0x") {
    return "";
  }

  if (
    hash.substring(0, 10) === "0xe3010170" &&
    ethers.utils.isHexString(hash, 38)
  ) {
    return Base58.encode(ethers.utils.hexDataSlice(hash, 4));
  } else {
    throw Error(`Unkown CID format, CID hash: ${hash}`);
  }
};

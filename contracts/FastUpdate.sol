// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {IFlareContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/util-contracts/userInterfaces/IFlareContractRegistry.sol";
import {IFastUpdater} from "@flarenetwork/flare-periphery-contracts/coston2/ftso/userInterfaces/IFastUpdater.sol";

contract FastUpdate {
    IFlareContractRegistry internal contractRegistry;
    IFastUpdater internal updater;

    constructor() {
        contractRegistry = IFlareContractRegistry(
            0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019
        );
        updater = IFastUpdater(
            contractRegistry.getContractAddressByName("FastUpdater")
        );
    }

    function fetchFeed(
        uint256[] calldata _indices
    ) public view returns (uint256[] memory, int8[] memory, uint64) {
        return updater.fetchCurrentFeeds(_indices);
    }
}

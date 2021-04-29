export = Dialer;
/**
 * @typedef {import('libp2p-interfaces/src/connection').Connection} Connection
 * @typedef {import('peer-id')} PeerId
 * @typedef {import('../peer-store')} PeerStore
 * @typedef {import('../peer-store/address-book').Address} Address
 * @typedef {import('../transport-manager')} TransportManager
 */
/**
 * @typedef {Object} DialerProperties
 * @property {PeerStore} peerStore
 * @property {TransportManager} transportManager
 *
 * @typedef {(addr:Multiaddr) => Promise<string[]>} Resolver
 *
 * @typedef {Object} DialerOptions
 * @property {(addresses: Address[]) => Address[]} [options.addressSorter = publicAddressesFirst] - Sort the known addresses of a peer before trying to dial.
 * @property {number} [maxParallelDials = MAX_PARALLEL_DIALS] - Number of max concurrent dials.
 * @property {number} [maxDialsPerPeer = MAX_PER_PEER_DIALS] - Number of max concurrent dials per peer.
 * @property {number} [dialTimeout = DIAL_TIMEOUT] - How long a dial attempt is allowed to take.
 * @property {Record<string, Resolver>} [resolvers = {}] - multiaddr resolvers to use when dialing
 *
 * @typedef DialTarget
 * @property {string} id
 * @property {Multiaddr[]} addrs
 *
 * @typedef PendingDial
 * @property {DialRequest} dialRequest
 * @property {TimeoutController} controller
 * @property {Promise<Connection>} promise
 * @property {function():void} destroy
 */
declare class Dialer {
    /**
     * @class
     * @param {DialerProperties & DialerOptions} options
     */
    constructor({ transportManager, peerStore, addressSorter, maxParallelDials, dialTimeout, maxDialsPerPeer, resolvers }: DialerProperties & DialerOptions);
    transportManager: import("../transport-manager");
    peerStore: import("../peer-store");
    addressSorter: (addresses: Address[]) => Address[];
    maxParallelDials: number;
    timeout: number;
    maxDialsPerPeer: number;
    tokens: number[];
    _pendingDials: Map<any, any>;
    /**
     * Clears any pending dials
     */
    destroy(): void;
    /**
     * Connects to a given `peer` by dialing all of its known addresses.
     * The dial to the first address that is successfully able to upgrade a connection
     * will be used.
     *
     * @param {PeerId|Multiaddr|string} peer - The peer to dial
     * @param {object} [options]
     * @param {AbortSignal} [options.signal] - An AbortController signal
     * @returns {Promise<Connection>}
     */
    connectToPeer(peer: PeerId | Multiaddr | string, options?: {
        signal?: AbortSignal | undefined;
    } | undefined): Promise<Connection>;
    /**
     * Creates a DialTarget. The DialTarget is used to create and track
     * the DialRequest to a given peer.
     * If a multiaddr is received it should be the first address attempted.
     * Multiaddrs not supported by the available transports will be filtered out.
     *
     * @private
     * @param {PeerId|Multiaddr|string} peer - A PeerId or Multiaddr
     * @returns {Promise<DialTarget>}
     */
    private _createDialTarget;
    /**
     * Creates a PendingDial that wraps the underlying DialRequest
     *
     * @private
     * @param {DialTarget} dialTarget
     * @param {object} [options]
     * @param {AbortSignal} [options.signal] - An AbortController signal
     * @returns {PendingDial}
     */
    private _createPendingDial;
    /**
     * @param {number} num
     */
    getTokens(num: number): number[];
    /**
     * @param {number} token
     */
    releaseToken(token: number): void;
    /**
     * Resolve multiaddr recursively.
     *
     * @param {Multiaddr} ma
     * @returns {Promise<Multiaddr[]>}
     */
    _resolve(ma: Multiaddr): Promise<Multiaddr[]>;
    /**
     * Resolve a given multiaddr. If this fails, an empty array will be returned
     *
     * @param {Multiaddr} ma
     * @returns {Promise<Multiaddr[]>}
     */
    _resolveRecord(ma: Multiaddr): Promise<Multiaddr[]>;
}
declare namespace Dialer {
    export { Connection, PeerId, PeerStore, Address, TransportManager, DialerProperties, Resolver, DialerOptions, DialTarget, PendingDial };
}
type Address = import('../peer-store/address-book').Address;
type PeerId = import('peer-id');
import { Multiaddr } from "multiaddr";
type Connection = import("libp2p-interfaces/src/connection/connection");
type DialerProperties = {
    peerStore: PeerStore;
    transportManager: TransportManager;
};
type DialerOptions = {
    /**
     * - Sort the known addresses of a peer before trying to dial.
     */
    addressSorter?: ((addresses: Address[]) => Address[]) | undefined;
    /**
     * - Number of max concurrent dials.
     */
    maxParallelDials?: number | undefined;
    /**
     * - Number of max concurrent dials per peer.
     */
    maxDialsPerPeer?: number | undefined;
    /**
     * - How long a dial attempt is allowed to take.
     */
    dialTimeout?: number | undefined;
    /**
     * - multiaddr resolvers to use when dialing
     */
    resolvers?: Record<string, Resolver> | undefined;
};
type PeerStore = import('../peer-store');
type TransportManager = import('../transport-manager');
type Resolver = (addr: Multiaddr) => Promise<string[]>;
type DialTarget = {
    id: string;
    addrs: Multiaddr[];
};
type PendingDial = {
    dialRequest: DialRequest;
    controller: any;
    promise: Promise<Connection>;
    destroy: () => void;
};
import DialRequest = require("./dial-request");
//# sourceMappingURL=index.d.ts.map
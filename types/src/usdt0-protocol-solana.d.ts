/**
 * @typedef {object} BridgeOptions
 * @property {string} targetChain - The identifier of the destination blockchain (e.g., "arbitrum").
 * @property {string} recipient - The address of the recipient.
 * @property {string} token - The spl mint address of the token to bridge.
 * @property {number | bigint} amount - The amount of tokens to bridge to the destination chain (in base unit).
 */
/**
 * @typedef {object} OftSendParam
 * @property {number} dstEid - The LayerZero destination endpoint id.
 * @property {ReadonlyUint8Array} to - The recipient address, encoded as 32 bytes.
 * @property {bigint} amountLD - The amount to send, in local decimals.
 * @property {bigint} minAmountLD - The minimum amount to receive, in local decimals.
 * @property {Uint8Array} extraOptions - The LayerZero executor options.
 * @property {Uint8Array} composeMsg - The compose message.
 * @property {Uint8Array} oftCmd - The oft command.
 */
/**
 * The oft accounts a quote or a send to a destination reads.
 *
 * @typedef {Object} OftRoute
 * @property {SolanaAddress} programAddress - The oft program.
 * @property {SolanaAddress} oftStore - The oft store.
 * @property {SolanaAddress} peer - The destination's peer config.
 * @property {SolanaAddress} credits - The credits account.
 * @property {import('./layerzero.js').OftStore} store - The parsed oft store.
 * @property {import('./layerzero.js').PeerConfig} peerConfig - The parsed peer config.
 * @property {Record<SolanaAddress, SolanaAddress[]>} lookupTables - The store's address lookup table, by address.
 * @property {EndpointRoute} endpoint - The layerzero accounts a quote or a send to the destination reads.
 */
/**
 * A worker a send pays, with its price feed.
 *
 * @typedef {Object} EndpointWorker
 * @property {SolanaAddress} program - The worker's program.
 * @property {SolanaAddress} config - The worker's config.
 * @property {SolanaAddress} priceFeedProgram - The price feed's program.
 * @property {SolanaAddress} priceFeed - The price feed's config.
 */
/**
 * The layerzero endpoint and ULN accounts a quote or a send to a destination reads.
 *
 * @typedef {Object} EndpointRoute
 * @property {SolanaAddress} endpoint - The endpoint program.
 * @property {SolanaAddress} sender - The oapp sending the message.
 * @property {SolanaAddress} uln - The ULN message library.
 * @property {SolanaAddress} sendLibraryConfig - The oapp's send library config.
 * @property {SolanaAddress} defaultSendLibraryConfig - The default send library config.
 * @property {SolanaAddress} sendLibraryInfo - The ULN's message library info.
 * @property {SolanaAddress} endpointSettings - The endpoint settings.
 * @property {SolanaAddress} nonce - The oapp's nonce for the destination.
 * @property {SolanaAddress} endpointEventAuthority - The endpoint's event authority.
 * @property {SolanaAddress} sendConfig - The oapp's ULN send config.
 * @property {SolanaAddress} defaultSendConfig - The default ULN send config.
 * @property {SolanaAddress} ulnEventAuthority - The ULN's event authority.
 * @property {SolanaAddress | null} treasury - The ULN's treasury, if one is set.
 * @property {EndpointWorker[]} workers - The executor, then the dvns.
 */
export default class Usdt0ProtocolSolana extends BridgeProtocol {
    /**
     * Bridges a token from solana to a different blockchain.
     *
     * Gasless accounts pay through their paymaster, which also fronts the layerzero fee and charges it back in the
     * paymaster token.
     *
     * @param {BridgeOptions} options - The bridge's options.
     * @param {PaymasterConfigOverrides & Pick<BridgeProtocolConfig, 'bridgeMaxFee'>} [config] - If the protocol has
     *   been initialized with a gasless wallet account, it can be used to override its paymaster options;
     *   'bridgeMaxFee' overrides the protocol's. 'bridgeMaxFee' caps 'fee' plus 'bridgeFee', in lamports; for a
     *   gasless account it caps 'bridgeFee' alone, and 'transactionMaxFee' caps 'fee', the paymaster fee in the
     *   paymaster token, which includes the layerzero fee.
     * @returns {Promise<BridgeResult>} The bridge's result.
     * @throws {AccountRequiredError} If the protocol has been initialized with a read-only account.
     * @throws {ProviderRequiredError} If the wallet is not connected to a provider.
     * @throws {ValueError} If the target chain, token, amount or recipient is not valid, or the oft program rejects the
     *   amount or the target chain.
     * @throws {MaximumFeeExceededError} If the bridge's costs exceed 'bridgeMaxFee', or a gasless account's
     *   paymaster fee exceeds 'transactionMaxFee'.
     */
    bridge(options: BridgeOptions, config?: PaymasterConfigOverrides & Pick<BridgeProtocolConfig, "bridgeMaxFee">): Promise<BridgeResult>;
    /**
     * Quotes the costs of a bridge operation.
     *
     * @param {BridgeOptions} options - The bridge's options.
     * @param {Pick<PaymasterConfigOverrides, 'paymasterToken'>} [config] - If the protocol has been
     *   initialized with a gasless wallet account, it can be used to override its paymaster token.
     * @returns {Promise<Omit<BridgeResult, 'hash'> & { oftFee: bigint, amountReceived: bigint }>} The costs and net received amount; oftFee and amountReceived are in the bridged token's base units.
     * @throws {ProviderRequiredError} If the wallet is not connected to a provider.
     * @throws {ValueError} If the target chain, token, amount or recipient is not valid, or the oft program rejects the
     *   amount or the target chain.
     */
    quoteBridge(options: BridgeOptions, config?: Pick<PaymasterConfigOverrides, "paymasterToken">): Promise<Omit<BridgeResult, "hash"> & {
        oftFee: bigint;
        amountReceived: bigint;
    }>;
    /**
     * Retrieves the chains supported by the protocol for bridge operations.
     *
     * @returns {Promise<SwidgeSupportedChain[]>} The supported chains.
     */
    getSupportedChains(): Promise<SwidgeSupportedChain[]>;
    /**
     * Retrieves the tokens supported by the protocol for bridge operations.
     *
     * @param {SwidgeSupportedTokensOptions} [options] - Optional filters for chain- or token-scoped discovery.
     * @returns {Promise<SwidgeSupportedToken[]>} The supported tokens.
     */
    getSupportedTokens(options?: SwidgeSupportedTokensOptions): Promise<SwidgeSupportedToken[]>;
    /** @private */
    private _resolveChainKey;
    /** @private */
    private _getPaymasterAddress;
    /** @private */
    private _fetchAccounts;
    /** @private */
    private _getBridgeTransaction;
    /** @private */
    private _quoteOftSend;
    /** @private */
    private _getOftRoute;
    /** @private */
    private _getEndpointRoute;
    /** @private */
    private _getQuoteEndpointAccounts;
    /** @private */
    private _getSendEndpointAccounts;
    /** @private */
    private _buildOftSendInstructions;
    /** @private */
    private _encodeRecipient;
    /** @private */
    private _assertValidRecipient;
}
export type BridgeProtocolConfig = import("@tetherto/wdk-wallet/protocols").BridgeProtocolConfig;
export type BridgeResult = import("@tetherto/wdk-wallet/protocols").BridgeResult;
export type SwidgeSupportedChain = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedChain;
export type SwidgeSupportedToken = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedToken;
export type SwidgeSupportedTokensOptions = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedTokensOptions;
/**
 * The paymaster options a gasless wallet account accepts as overrides.
 */
export type PaymasterConfigOverrides = {
    /**
     * - The paymaster token configuration.
     */
    paymasterToken?: {
        address: string;
    };
    /**
     * - The maximum fee amount for sendTransaction and signTransaction
     * operations.
     */
    transactionMaxFee?: number | bigint;
};
export type SolanaAddress = import("@solana/addresses").Address;
export type ReadonlyUint8Array = import("@solana/codecs").ReadonlyUint8Array;
export type BridgeOptions = {
    /**
     * - The identifier of the destination blockchain (e.g., "arbitrum").
     */
    targetChain: string;
    /**
     * - The address of the recipient.
     */
    recipient: string;
    /**
     * - The spl mint address of the token to bridge.
     */
    token: string;
    /**
     * - The amount of tokens to bridge to the destination chain (in base unit).
     */
    amount: number | bigint;
};
export type OftSendParam = {
    /**
     * - The LayerZero destination endpoint id.
     */
    dstEid: number;
    /**
     * - The recipient address, encoded as 32 bytes.
     */
    to: ReadonlyUint8Array;
    /**
     * - The amount to send, in local decimals.
     */
    amountLD: bigint;
    /**
     * - The minimum amount to receive, in local decimals.
     */
    minAmountLD: bigint;
    /**
     * - The LayerZero executor options.
     */
    extraOptions: Uint8Array;
    /**
     * - The compose message.
     */
    composeMsg: Uint8Array;
    /**
     * - The oft command.
     */
    oftCmd: Uint8Array;
};
/**
 * The oft accounts a quote or a send to a destination reads.
 */
export type OftRoute = {
    /**
     * - The oft program.
     */
    programAddress: SolanaAddress;
    /**
     * - The oft store.
     */
    oftStore: SolanaAddress;
    /**
     * - The destination's peer config.
     */
    peer: SolanaAddress;
    /**
     * - The credits account.
     */
    credits: SolanaAddress;
    /**
     * - The parsed oft store.
     */
    store: import("./layerzero.js").OftStore;
    /**
     * - The parsed peer config.
     */
    peerConfig: import("./layerzero.js").PeerConfig;
    /**
     * - The store's address lookup table, by address.
     */
    lookupTables: Record<SolanaAddress, SolanaAddress[]>;
    /**
     * - The layerzero accounts a quote or a send to the destination reads.
     */
    endpoint: EndpointRoute;
};
/**
 * A worker a send pays, with its price feed.
 */
export type EndpointWorker = {
    /**
     * - The worker's program.
     */
    program: SolanaAddress;
    /**
     * - The worker's config.
     */
    config: SolanaAddress;
    /**
     * - The price feed's program.
     */
    priceFeedProgram: SolanaAddress;
    /**
     * - The price feed's config.
     */
    priceFeed: SolanaAddress;
};
/**
 * The layerzero endpoint and ULN accounts a quote or a send to a destination reads.
 */
export type EndpointRoute = {
    /**
     * - The endpoint program.
     */
    endpoint: SolanaAddress;
    /**
     * - The oapp sending the message.
     */
    sender: SolanaAddress;
    /**
     * - The ULN message library.
     */
    uln: SolanaAddress;
    /**
     * - The oapp's send library config.
     */
    sendLibraryConfig: SolanaAddress;
    /**
     * - The default send library config.
     */
    defaultSendLibraryConfig: SolanaAddress;
    /**
     * - The ULN's message library info.
     */
    sendLibraryInfo: SolanaAddress;
    /**
     * - The endpoint settings.
     */
    endpointSettings: SolanaAddress;
    /**
     * - The oapp's nonce for the destination.
     */
    nonce: SolanaAddress;
    /**
     * - The endpoint's event authority.
     */
    endpointEventAuthority: SolanaAddress;
    /**
     * - The oapp's ULN send config.
     */
    sendConfig: SolanaAddress;
    /**
     * - The default ULN send config.
     */
    defaultSendConfig: SolanaAddress;
    /**
     * - The ULN's event authority.
     */
    ulnEventAuthority: SolanaAddress;
    /**
     * - The ULN's treasury, if one is set.
     */
    treasury: SolanaAddress | null;
    /**
     * - The executor, then the dvns.
     */
    workers: EndpointWorker[];
};
import { BridgeProtocol } from '@tetherto/wdk-wallet/protocols';

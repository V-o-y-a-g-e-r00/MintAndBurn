import NamiWallet from '../../assets/images/walletsIcons/nami_logo.svg';
import EternalWallet from '../../assets/images/walletsIcons//eternal_logo.png';
import GeroWallet from '../../assets/images/walletsIcons/gero_logo.svg';
import MetamaskAndWalletConnect from '../../assets/images/walletsIcons/metamaskAndWalletConnect_logo.png';
import FlintWallet from '../../assets/images/walletsIcons/flintWallet_logo.png';
import CWallet from '../../assets/images/walletsIcons/cardWallet_logo.png';
import EthereumLogo from '../../assets/images/blockchainIcons/ethereum.png'
import CardanoLogo from '../../assets/images/blockchainIcons/cardano.png'

export const availableBlockchains = {
    ETHEREUM: "Ethereum",
    CARDANO: "Cardano"
}

export const blockchains = [
    {
        name: "Ethereum",
        logo: EthereumLogo,
    },
    {
        name: "Cardano",
        logo: CardanoLogo,
    }
]

export const supportedWallets = {
    ETHEREUM: [
        // {
        //   wallet: 'Wallet Connect',
        //   identifier: 'walletconnect',
        //   logo: WalletConnect,
        //   site: 'https://walletconnect.com'
        // },
        // {
        //   wallet: 'Metamask',
        //   identifier: 'metamask',
        //   logo: Metamask,
        //   site: 'https://metamask.io/'
        // }
        {
            wallet: 'Metamask or WalletConnect ',
            identifier: 'metamaskAndWalletConnect',
            logo: MetamaskAndWalletConnect,
            site: 'https://metamask.io/'
        }
    ],
    CARDANO: [
        {
            wallet: 'Nami',
            identifier: 'nami',
            logo: NamiWallet,
            site: 'https://namiwallet.io/'
        },
        {
            wallet: 'Eternl',
            identifier: 'eternl',
            logo: EternalWallet,
            site: 'https://eternl.io/'
        },
        {
            wallet: 'Gero Wallet',
            identifier: 'gerowallet',
            logo: GeroWallet,
            site: 'https://gerowallet.io/'
        },
        {
            wallet: 'Flint',
            identifier: 'flint',
            logo: FlintWallet,
            site: 'https://flint-wallet.com/'
        },
        {
            wallet: 'CWallet',
            identifier: 'cardwallet',
            logo: CWallet,
            site: 'https://cwallet.finance'
        }
    ]
};
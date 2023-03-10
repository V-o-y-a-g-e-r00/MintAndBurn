import NamiWallet from '../../assets/images/walletsIcons/nami_logo.svg';
import EternalWallet from '../../assets/images/walletsIcons//eternal_logo.png';
import GeroWallet from '../../assets/images/walletsIcons/gero_logo.svg';
import Metamask from '../../assets/images/walletsIcons/metamask_logo.png';
import FlintWallet from '../../assets/images/walletsIcons/flintWallet_logo.png';
import CWallet from '../../assets/images/walletsIcons/cardWallet_logo.png';
import EthereumLogo from '../../assets/images/blockchainIcons/ethereum.png'
import CardanoLogo from '../../assets/images/blockchainIcons/cardano.png'

export const progress = {
    IDLE: 'IDLE',
    PROCESSING: 'PROCESSING',
    COMPLETE: 'COMPLETE',
    ERROR: 'ERROR'
};

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
        {
          wallet: 'Metamask',
          identifier: 'metamask',
          logo: Metamask,
          site: 'https://metamask.io/'
        }
        // ,{
            //   wallet: 'Wallet Connect',
            //   identifier: 'walletconnect',
            //   logo: Metamask,
            //   site: 'https://walletconnect.com'
            // },
        // {
        //     wallet: 'Metamask or WalletConnect ',
        //     identifier: 'metamaskAndWalletConnect',
        //     logo: MetamaskAndWalletConnect,
        //     site: 'https://metamask.io/'
        // }
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

export const inputErrors = {
    warnings: {
        triedInputMoreThenOneDot : "You tried to enter a dot, but the dot was already in the entered value",
        triedTooManyCharactersIntegerPart : "You tried to enter too many characters in an integer part",
        triedTooManyCharactersFractionalPart : "You tried to enter too many characters in a fractional part",
    },
    errors: {
        noIntegerPart : "Enter the integer part of the value",
        noFractionalPart: "Enter the fractional part of the value or remove the dot",
        leadingZeros: "Remove leading zeros",
        enteredTooManyCharactersIntegerPart : "You entered too many characters in an integer part",
        enteredTooManyCharactersFractionalPart : "You entered too many characters in a fractional part",
    }

};
export const maxCharactersInIntegerPartOfInput = 10;
export const maxCharactersInFractionalPartOfInput = 6;
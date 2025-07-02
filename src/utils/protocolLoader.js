// src/utils/protocolLoader.js
export class ProtocolLoader {
  constructor() {
    this.baseUrl = '/testnet';
    this.cache = new Map();
    this.indexUrl = `${this.baseUrl}/index.json`;
    this.cacheKey = 'monad_protocols_cache';
    this.cacheExpiry = null;
  }

  // localStorage cache methods
  getCachedData() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);

        let isExpired = false;
        // Only perform expiration check if cacheExpiry is a positive number
        if (typeof this.cacheExpiry === 'number' && this.cacheExpiry > 0) {
          isExpired = Date.now() - timestamp > this.cacheExpiry;
        }
        // If cacheExpiry is null or not a positive number, isExpired remains false.

        if (!isExpired) {
          console.log('Loading protocols from localStorage cache');
          return data;
        }
        // Remove expired cache
        localStorage.removeItem(this.cacheKey);
      }
    } catch (error) {
      console.warn('Failed to load from localStorage cache:', error);
      localStorage.removeItem(this.cacheKey);
    }
    return null;
  }
  // getCachedData() {
  //   try {
  //     const cached = localStorage.getItem(this.cacheKey);
  //     if (cached) {
  //       const { data, timestamp } = JSON.parse(cached);
  //       const isExpired = Date.now() - timestamp > this.cacheExpiry;
  //       if (!isExpired) {
  //         console.log('Loading protocols from localStorage cache');
  //         return data;
  //       }
  //       // Remove expired cache
  //       localStorage.removeItem(this.cacheKey);
  //     }
  //   } catch (error) {
  //     console.warn('Failed to load from localStorage cache:', error);
  //     localStorage.removeItem(this.cacheKey);
  //   }
  //   return null;
  // }

  setCachedData(data) {
    try {
      const cacheObject = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheObject));
      console.log(`Cached ${data.length} protocols to localStorage`);
    } catch (error) {
      console.warn('Failed to save to localStorage cache:', error);
    }
  }

  async loadIndex() {
    try {
      const response = await fetch(this.indexUrl);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(
        'Failed to load protocol index, falling back to file list',
        error
      );
    }
    return null;
  }

  async loadProtocol(fileName) {
    // Check memory cache first
    if (this.cache.has(fileName)) {
      return this.cache.get(fileName);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${fileName}`);
      if (response.ok) {
        const protocol = await response.json();
        this.cache.set(fileName, protocol);
        return protocol;
      } else {
        console.warn(
          `Failed to load ${fileName}: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.warn(`Error loading protocol ${fileName}:`, error);
    }
    return null;
  }

  async loadAllProtocols() {
    // Check localStorage cache first
    const cachedProtocols = this.getCachedData();
    if (cachedProtocols && cachedProtocols.length > 0) {
      return cachedProtocols;
    }

    console.log('Loading protocols from API...');
    const protocols = [];
    const index = await this.loadIndex();

    // Complete file list from your project
    const fileList = index?.protocols?.map(p => p.fileName) || [
      'NadSmith.json',
      'Zona.json',
      'Mach_Exchange.json',
      'Cordial_Systems.json',
      'FUKU.json',
      'Hyperlane.json',
      'NitroFinance.json',
      'PLAY_Network.json',
      't3rn.json',
      'Monorail.json',
      'Ammalgam.json',
      'Lootify.json',
      'Motatoes.json',
      'QuestN.json',
      'Jarvis.json',
      'Mu_Digital.json',
      'Dark_Forest_Ares.json',
      'Chronicle.json',
      'Open_Sea.json',
      'Antarctic_Exchange.json',
      'Curvance.json',
      'Balancer.json',
      'Mentaport.json',
      'Plato.json',
      'HaHa_Wallet.json',
      'Solv_Protocol.json',
      'YieldKingZ.json',
      'tread.fi.json',
      'StakeStone.json',
      'Swing_Monad.json',
      'Uniswap_Wallet.json',
      'Madhouse.json',
      'Atlantis.json',
      'Taya_swap.json',
      'MemeAIAssistant.json',
      'Aarna.json',
      'PumpBTC.json',
      'BlastCommander.json',
      'Defx.json',
      'Hedgemony.json',
      'INFINIT.json',
      'Odyssey.json',
      'Isle_Finance.json',
      'GameRelay.json',
      'Lombard.json',
      'Uniswap.json',
      'Fizen.io.json',
      'Opinion_Labs.json',
      'Timeswap.json',
      'Valor_Quest.json',
      'Standard_Protocol.json',
      'zkSwap.json',
      'Amertis.json',
      'Mace.json',
      'Open_Ocean.json',
      'MonadTiles.json',
      'Mahjong123.json',
      'Anterris.json',
      'PancakeSwap.json',
      'Treasure_Dwarf_Battles.json',
      'Owlto_Finance.json',
      'Tadle.json',
      'Monday_Trade.json',
      'AZEx.json',
      'AtDawn.json',
      'Bubblefi.json',
      'Enjoyoors.json',
      'Kinza_Finance.json',
      'Ambient.json',
      'Anima.json',
      'OctoSwap.json',
      'Monda.json',
      'LFJ.json',
      'Poply.json',
      'Purps.json',
      'sidekick.json',
      'Tarobase.json',
      'Bean_Exchange.json',
      'Sumer.json',
      'Caddy.json',
      'LEVR.bet.json',
      'Cycle_Network.json',
      'Renzo.json',
      'Spine_Finance.json',
      'Kizzy.json',
      'KiloEx.json',
      'Diffuse.json',
      'Dirol_Protocol.json',
      'LA_MOUCH.json',
      'Madness.json',
      'Hive.json',
      'Intract.json',
      'Pingu_Exchange.json',
      'Covenant.json',
      'Crystal.json',
      'Fufuture.json',
      'Rubic.json',
      'Nostra.json',
      'XL.json',
      'Yap_on_Chain.json',
      'ELEPHAPP.json',
      'eOracle.json',
      'BrahmaFi.json',
      'Monadata_AI.json',
      'Flap.json',
      'Stork.json',
      'Fortytwo.json',
      'SynFutures.json',
      'Lendhub.json',
      'Clober.json',
      'Chainlink.json',
      'Rabble.json',
      'ApeBond.json',
      'Nad_Name_Service.json',
    ];

    // Load protocols in parallel with error handling
    const loadPromises = fileList.map(async fileName => {
      try {
        const protocol = await this.loadProtocol(fileName);
        if (protocol) {
          protocols.push(protocol);
        }
      } catch (error) {
        console.warn(`Failed to load ${fileName}:`, error);
      }
    });

    await Promise.all(loadPromises);

    if (protocols.length > 0) {
      // Cache the successfully loaded protocols
      this.setCachedData(protocols);
      console.log(`Successfully loaded ${protocols.length} protocols`);
    } else {
      console.warn('No protocols were loaded successfully');
    }

    return protocols;
  }

  clearCache() {
    this.cache.clear();
    localStorage.removeItem(this.cacheKey);
    console.log('Cache cleared');
  }
}

// Standalone function for backward compatibility
export const loadProtocolsFromFolder = async () => {
  const loader = new ProtocolLoader();
  return await loader.loadAllProtocols();
};

// Demo data function for fallback
export const getDemoProtocols = () => [
  {
    name: 'NadSmith',
    description:
      'AI Agent OS on Monad | Tokenizing Agents & Automating Markets - built exclusively on Monad',
    live: false,
    categories: ['AI::Compute'],
    addresses: {},
    links: {
      project: 'https://x.com/NadSmith_',
      twitter: 'https://x.com/NadSmith_',
    },
  },
  {
    name: 'Zona',
    description:
      'Zona is building scalable infra for composable RWA tokens. We let users mint, speculate, and earn yield on real estate Index Tokens.',
    live: true,
    categories: ['DeFi::RWA'],
    addresses: {
      Master: '0xCF91CD9f22889F1E8631a51B6115B46B51548202',
      ZonaOracle: '0x0Fed9873f364bD49cB4D7039567f69C59aE6Eb2B',
    },
    links: {
      project: 'https://www.zona.finance/',
      twitter: 'https://x.com/zona_io',
      github: 'https://github.com/zona-hk',
    },
  },
  {
    name: 'FUKU',
    description:
      'FUKU: A DefiSaving protocol on Monad, blending savings with the excitement of betting and winning prizes without risking your deposit.',
    live: true,
    categories: ['DeFi::Other'],
    addresses: {
      PrizePoolManager: '0x2e1fd6ec0923de849D6876599f214D2366d5e401',
      PrizePool0: '0x0168c03df4c67e4ea8bb0bd1c5459a4b719be16a',
    },
    links: {
      project: 'https://testnet.fukunad.xyz/',
      twitter: 'https://x.com/Fuku_nad',
      docs: 'https://fuku-1.gitbook.io/fuku-on-monad',
    },
  },
  {
    name: 'Uniswap',
    description:
      'The largest onchain marketplace. Buy and sell crypto on Ethereum and 11+ other chains.',
    live: true,
    categories: ['DeFi::DEX'],
    addresses: {
      Router: '0x5f16e51e3Dcb255480F090157DD01bA962a53E54',
    },
    links: {
      project: 'https://uniswap.org/',
      twitter: 'https://x.com/uniswap',
      github: 'https://github.com/Uniswap',
      docs: 'https://docs.uniswap.org/',
    },
  },
  {
    name: 'Chainlink',
    description:
      'Chainlink is the industry-standard decentralized oracle network that connects smart contracts to external data sources.',
    live: true,
    categories: ['Infra::Oracle'],
    addresses: {
      Router: '0x5f16e51e3Dcb255480F090157DD01bA962a53E54',
    },
    links: {
      project: 'https://chain.link/',
      twitter: 'https://x.com/chainlink',
      github: 'https://github.com/smartcontractkit/chainlink',
      docs: 'https://docs.chain.link/',
    },
  },
];

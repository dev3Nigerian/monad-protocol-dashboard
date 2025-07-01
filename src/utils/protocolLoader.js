// src/utils/protocolLoader.js
export class ProtocolLoader {
  constructor() {
    this.baseUrl = '/testnet';
    this.cache = new Map();
    this.indexUrl = `${this.baseUrl}/index.json`;
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
    if (this.cache.has(fileName)) {
      return this.cache.get(fileName);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${fileName}`);
      if (response.ok) {
        const protocol = await response.json();
        this.cache.set(fileName, protocol);
        return protocol;
      }
    } catch (error) {
      console.warn(`Failed to load ${fileName}:`, error);
    }
    return null;
  }

  async loadAllProtocols() {
    const protocols = [];
    const index = await this.loadIndex();

    const fileList = index?.protocols?.map(p => p.fileName) || [
      // Complete list of all protocol files from your documents
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
      'NFTs2Me.json',
      'Blazpay.json',
      'DRKVRS.json',
      'Nad.fun.json',
      'Crust_Finance.json',
      'Nextmate.ai.json',
      'Rug_Rumble.json',
      'coNFT.json',
      'aPriori.json',
      'LayerZero.json',
      'Prediction3.json',
      'Unipay.json',
      'Agora.json',
      'own.fun.json',
      'Montools.json',
      'Mintpad.json',
      'Rysk.json',
      'Pyth_Network.json',
      'Wenwin.json',
      'Flipside_Crypto.json',
      'Azaar.json',
      'TAYA.json',
      'Primus.json',
      'Yamata.json',
      'DiscoCats.json',
      'Band_Protocol.json',
      'Codatta.json',
      'Multipli.fi.json',
      'Encifher.json',
      'Fiamma.json',
      'Gomoku3.json',
      'Entangle.json',
      'Talentum.json',
      'DAU_Cards.json',
      'Meta_Leap.json',
      'Proof-of-Skill.json',
      'Dyson_Finance.json',
      'Reservoir.json',
      'iZUMi_Finance.json',
      'aiCraft.fun.json',
      'EmelVerse.json',
      'Showdown.json',
      'Zaros.json',
      'Zapry.json',
      'beatBRAWLS.json',
      'Seed_Circle.json',
      'Bima.json',
      'OpenPad_AI.json',
      'Switchboard.json',
      'Gelato.json',
      'HeyElsa_AI.json',
      'RgbClash.json',
      'Kuru.json',
      'Chainsight.json',
      'Demask_Financial.json',
      'Folks_Finance.json',
      'MonadAI.json',
      'Magma.json',
      'Outpost_Surge.json',
      'Slay_The_Moloch.json',
      'Kintsu.json',
      'Slogain.json',
      'Rabble.json',
      'ApeBond.json',
      'Nad_Name_Service.json',
    ];

    const loadPromises = fileList.map(async fileName => {
      const protocol = await this.loadProtocol(fileName);
      if (protocol) {
        protocols.push(protocol);
      }
    });

    await Promise.all(loadPromises);
    return protocols;
  }

  clearCache() {
    this.cache.clear();
  }
}

// src/utils/categoryUtils.js
export const getCategoryColor = category => {
  const colors = {
    AI: 'bg-purple-100 text-purple-800 border-purple-200',
    DeFi: 'bg-blue-100 text-blue-800 border-blue-200',
    Gaming: 'bg-green-100 text-green-800 border-green-200',
    Infra: 'bg-orange-100 text-orange-800 border-orange-200',
    NFT: 'bg-pink-100 text-pink-800 border-pink-200',
    Consumer: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    DePIN: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Payments: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const extractCategoryInfo = categories => {
  if (!categories || categories.length === 0)
    return { main: 'Unknown', sub: '' };

  const [main, sub] = categories[0].split('::');
  return { main: main || 'Unknown', sub: sub || '' };
};

export const getAllCategories = protocols => {
  const mainCategories = new Set();
  const subCategories = new Set();

  protocols.forEach(protocol => {
    protocol.categories?.forEach(category => {
      const [main, sub] = category.split('::');
      if (main) mainCategories.add(main);
      if (sub) subCategories.add(sub);
    });
  });

  return {
    main: Array.from(mainCategories).sort(),
    sub: Array.from(subCategories).sort(),
  };
};

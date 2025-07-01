import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ExternalLink, Twitter, Github, FileText, Globe, ChevronDown, ChevronUp, X } from 'lucide-react';

// Function to load all protocols from the testnet folder
const loadProtocolsFromFolder = async () => {
  try {
    // In a browser environment, we need to use fetch to load files
    // This assumes the JSON files are accessible via HTTP
    const protocolFiles = [
      'NadSmith.json', 'Zona.json', 'Mach_Exchange.json', 'Cordial_Systems.json',
      'FUKU.json', 'Hyperlane.json', 'NitroFinance.json', 'PLAY_Network.json',
      't3rn.json', 'Monorail.json', 'Ammalgam.json', 'Lootify.json',
      'Motatoes.json', 'QuestN.json', 'Jarvis.json', 'Mu_Digital.json',
      'Dark_Forest_Ares.json', 'Chronicle.json', 'Open_Sea.json',
      'Antarctic_Exchange.json', 'Curvance.json', 'Balancer.json',
      'Mentaport.json', 'Plato.json', 'HaHa_Wallet.json', 'Solv_Protocol.json',
      'YieldKingZ.json', 'tread.fi.json', 'StakeStone.json', 'Swing_Monad.json',
      'Uniswap_Wallet.json', 'Madhouse.json', 'Atlantis.json', 'Taya_swap.json',
      'MemeAIAssistant.json', 'Aarna.json', 'PumpBTC.json', 'BlastCommander.json',
      'Defx.json', 'Hedgemony.json', 'INFINIT.json', 'Odyssey.json',
      'Isle_Finance.json', 'GameRelay.json', 'Lombard.json', 'Uniswap.json',
      'Fizen.io.json', 'Opinion_Labs.json', 'Timeswap.json', 'Valor_Quest.json',
      'Standard_Protocol.json', 'zkSwap.json', 'Amertis.json', 'Mace.json',
      'Open_Ocean.json', 'MonadTiles.json', 'Mahjong123.json', 'Anterris.json',
      'PancakeSwap.json', 'Treasure_Dwarf_Battles.json', 'Owlto_Finance.json',
      'Tadle.json', 'Monday_Trade.json', 'AZEx.json', 'AtDawn.json',
      'Bubblefi.json', 'Enjoyoors.json', 'Kinza_Finance.json', 'Ambient.json',
      'Anima.json', 'OctoSwap.json', 'Monda.json', 'LFJ.json', 'Poply.json',
      'Purps.json', 'sidekick.json', 'Tarobase.json', 'Bean_Exchange.json',
      'Sumer.json', 'Caddy.json', 'LEVR.bet.json', 'Cycle_Network.json',
      'Renzo.json', 'Spine_Finance.json', 'Kizzy.json', 'KiloEx.json',
      'Diffuse.json', 'Dirol_Protocol.json', 'LA_MOUCH.json', 'Madness.json',
      'Hive.json', 'Intract.json', 'Pingu_Exchange.json', 'Covenant.json',
      'Crystal.json', 'Fufuture.json', 'Rubic.json', 'Nostra.json', 'XL.json',
      'Yap_on_Chain.json', 'ELEPHAPP.json', 'eOracle.json', 'BrahmaFi.json',
      'Monadata_AI.json', 'Flap.json', 'Stork.json', 'Fortytwo.json',
      'SynFutures.json', 'Lendhub.json', 'Clober.json', 'Chainlink.json'
    ];

    const protocols = [];
    
    for (const fileName of protocolFiles) {
      try {
        // In a real environment, you would fetch from the actual file path
        const response = await fetch(`/testnet/${fileName}`);
        if (response.ok) {
          const protocolData = await response.json();
          protocols.push(protocolData);
        }
      } catch (error) {
        console.warn(`Failed to load ${fileName}:`, error);
      }
    }
    
    return protocols;
  } catch (error) {
    console.error('Error loading protocols:', error);
    // Fallback to demo data if file loading fails
    return getDemoProtocols();
  }
};

// Demo data for development/testing
const getDemoProtocols = () => [
  {
    "name": "NadSmith",
    "description": "AI Agent OS on Monad | Tokenizing Agents & Automating Markets - built exclusively on Monad",
    "live": false,
    "categories": ["AI::Compute"],
    "addresses": {},
    "links": {
      "project": "https://x.com/NadSmith_",
      "twitter": "https://x.com/NadSmith_"
    }
  },
  {
    "name": "Zona",
    "description": "Zona is building scalable infra for composable RWA tokens. We let users mint, speculate, and earn yield on real estate Index Tokens.",
    "live": true,
    "categories": ["DeFi::RWA"],
    "addresses": {
      "Master": "0xCF91CD9f22889F1E8631a51B6115B46B51548202",
      "ZonaOracle": "0x0Fed9873f364bD49cB4D7039567f69C59aE6Eb2B"
    },
    "links": {
      "project": "https://www.zona.finance/",
      "twitter": "https://x.com/zona_io",
      "github": "https://github.com/zona-hk"
    }
  },
  {
    "name": "FUKU",
    "description": "FUKU: A DefiSaving protocol on Monad, blending savings with the excitement of betting and winning prizes without risking your deposit.",
    "live": true,
    "categories": ["DeFi::Other"],
    "addresses": {
      "PrizePoolManager": "0x2e1fd6ec0923de849D6876599f214D2366d5e401",
      "PrizePool0": "0x0168c03df4c67e4ea8bb0bd1c5459a4b719be16a"
    },
    "links": {
      "project": "https://testnet.fukunad.xyz/",
      "twitter": "https://x.com/Fuku_nad",
      "docs": "https://fuku-1.gitbook.io/fuku-on-monad"
    }
  },
  {
    "name": "Uniswap",
    "description": "The largest onchain marketplace. Buy and sell crypto on Ethereum and 11+ other chains.",
    "live": true,
    "categories": ["DeFi::DEX"],
    "addresses": {
      "UniswapV2Router": "0xfB8e1C3b833f9E67a71C859a132cf783b645e436",
      "UniswapV2Factory": "0x733e88f248b742db6c14c0b1713af5ad7fdd59d0"
    },
    "links": {
      "project": "https://app.uniswap.org/",
      "twitter": "https://x.com/Uniswap"
    }
  },
  {
    "name": "Ambient",
    "description": "Spot AMM with combining multiple liquidity types with modular hooks, dynamic fees and MEV protection",
    "live": true,
    "categories": ["DeFi::DEX"],
    "addresses": {
      "Dex": "0x88B96aF200c8a9c35442C8AC6cd3D22695AaE4F0",
      "Query": "0x1C74Dd2DF010657510715244DA10ba19D1F3D2B7"
    },
    "links": {
      "project": "https://monad.ambient.finance",
      "twitter": "https://x.com/ambient_finance",
      "github": "https://github.com/CrocSwap",
      "docs": "https://docs.ambient.finance"
    }
  },
  {
    "name": "Chainlink",
    "description": "Chainlink is the standard for onchain finance, verifiable data, and cross-chain interoperability.",
    "live": true,
    "categories": ["Infra::Oracle"],
    "addresses": {
      "Router": "0x5f16e51e3Dcb255480F090157DD01bA962a53E54"
    },
    "links": {
      "project": "https://chain.link/",
      "twitter": "https://x.com/chainlink",
      "github": "https://github.com/smartcontractkit/chainlink",
      "docs": "https://docs.chain.link/"
    }
  }
];

const ProtocolCard = ({ protocol }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categoryInfo = protocol.categories[0]?.split('::') || ['Unknown', ''];
  const mainCategory = categoryInfo[0];
  const subCategory = categoryInfo[1];
  
  const getCategoryColor = (category) => {
    const colors = {
      'AI': 'bg-purple-100 text-purple-800 border-purple-200',
      'DeFi': 'bg-blue-100 text-blue-800 border-blue-200',
      'Gaming': 'bg-green-100 text-green-800 border-green-200',
      'Infra': 'bg-orange-100 text-orange-800 border-orange-200',
      'NFT': 'bg-pink-100 text-pink-800 border-pink-200',
      'Consumer': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                {protocol.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(mainCategory)}`}>
                  {mainCategory}
                </span>
                {subCategory && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {subCategory}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${protocol.live ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={`text-sm font-medium ${protocol.live ? 'text-green-600' : 'text-gray-500'}`}>
                {protocol.live ? 'Live' : 'Coming Soon'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {protocol.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {protocol.links?.project && (
              <a href={protocol.links.project} target="_blank" rel="noopener noreferrer" 
                className="text-purple-600 hover:text-purple-800 transition-colors">
                <Globe size={18} />
              </a>
            )}
            {protocol.links?.twitter && (
              <a href={protocol.links.twitter} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors">
                <Twitter size={18} />
              </a>
            )}
            {protocol.links?.github && (
              <a href={protocol.links.github} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors">
                <Github size={18} />
              </a>
            )}
            {protocol.links?.docs && (
              <a href={protocol.links.docs} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors">
                <FileText size={18} />
              </a>
            )}
          </div>
          
          {Object.keys(protocol.addresses || {}).length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
            >
              {Object.keys(protocol.addresses).length} Contract{Object.keys(protocol.addresses).length !== 1 ? 's' : ''}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        
        {isExpanded && Object.keys(protocol.addresses || {}).length > 0 && (
          <div className="mt-4 pt-4 border-t border-purple-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Contract Addresses</h4>
            <div className="space-y-2">
              {Object.entries(protocol.addresses).map(([name, address]) => (
                <div key={name} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-gray-700">{name}</span>
                  <code className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-mono">
                    {address}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, selected, onChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
      >
        <Filter size={16} />
        <span className="text-sm font-medium">{label}</span>
        {selected.length > 0 && (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
            {selected.length}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-purple-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            <div className="p-3 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{label}</span>
                {selected.length > 0 && (
                  <button
                    onClick={onClear}
                    className="text-purple-600 hover:text-purple-800 text-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="p-2">
              {options.map(option => (
                <label key={option} className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...selected, option]);
                      } else {
                        onChange(selected.filter(item => item !== option));
                      }
                    }}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [protocolsData, setProtocolsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  // Load protocols on component mount
  useEffect(() => {
    const initializeProtocols = async () => {
      try {
        setLoading(true);
        setError(null);
        const protocols = await loadProtocolsFromFolder();
        setProtocolsData(protocols);
      } catch (err) {
        setError('Failed to load protocols');
        console.error('Error initializing protocols:', err);
        // Fallback to demo data
        setProtocolsData(getDemoProtocols());
      } finally {
        setLoading(false);
      }
    };

    initializeProtocols();
  }, []);
  
  // Extract unique categories and subcategories
  const allCategories = useMemo(() => {
    const categories = new Set();
    const subCategories = new Set();
    
    protocolsData.forEach(protocol => {
      protocol.categories.forEach(category => {
        const [main, sub] = category.split('::');
        categories.add(main);
        if (sub) subCategories.add(sub);
      });
    });
    
    return {
      main: Array.from(categories).sort(),
      sub: Array.from(subCategories).sort()
    };
  }, [protocolsData]);
  
  // Filter protocols
  const filteredProtocols = useMemo(() => {
    return protocolsData.filter(protocol => {
      // Search filter
      const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategories.length === 0 ||
                             protocol.categories.some(category => {
                               const [main] = category.split('::');
                               return selectedCategories.includes(main);
                             });
      
      // Subcategory filter
      const matchesSubCategory = selectedSubCategories.length === 0 ||
                                protocol.categories.some(category => {
                                  const [, sub] = category.split('::');
                                  return sub && selectedSubCategories.includes(sub);
                                });
      
      // Status filter
      const matchesStatus = statusFilter.length === 0 ||
                           (statusFilter.includes('Live') && protocol.live) ||
                           (statusFilter.includes('Coming Soon') && !protocol.live);
      
      return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    });
  }, [protocolsData, searchTerm, selectedCategories, selectedSubCategories, statusFilter]);
  
  const stats = useMemo(() => {
    const total = protocolsData.length;
    const live = protocolsData.filter(p => p.live).length;
    const categoryCounts = {};
    
    protocolsData.forEach(protocol => {
      protocol.categories.forEach(category => {
        const [main] = category.split('::');
        categoryCounts[main] = (categoryCounts[main] || 0) + 1;
      });
    });
    
    return { total, live, categories: categoryCounts };
  }, [protocolsData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Monad Protocol Dashboard
              </h1>
              <p className="text-gray-600">
                Discover and explore protocols building on Monad testnet
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-semibold">{stats.total}</span>
                <span className="text-gray-600">Total Protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold">{stats.live}</span>
                <span className="text-gray-600">Live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="font-semibold">{stats.total - stats.live}</span>
                <span className="text-gray-600">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search protocols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <FilterDropdown
              label="Category"
              options={allCategories.main}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              onClear={() => setSelectedCategories([])}
            />
            <FilterDropdown
              label="Subcategory"
              options={allCategories.sub}
              selected={selectedSubCategories}
              onChange={setSelectedSubCategories}
              onClear={() => setSelectedSubCategories([])}
            />
            <FilterDropdown
              label="Status"
              options={['Live', 'Coming Soon']}
              selected={statusFilter}
              onChange={setStatusFilter}
              onClear={() => setStatusFilter([])}
            />
          </div>
        </div>
        
        {/* Active Filters */}
        {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || statusFilter.length > 0) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategories.map(category => (
              <span key={category} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {category}
                <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}>
                  <X size={14} />
                </button>
              </span>
            ))}
            {selectedSubCategories.map(subCategory => (
              <span key={subCategory} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {subCategory}
                <button onClick={() => setSelectedSubCategories(selectedSubCategories.filter(c => c !== subCategory))}>
                  <X size={14} />
                </button>
              </span>
            ))}
            {statusFilter.map(status => (
              <span key={status} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {status}
                <button onClick={() => setStatusFilter(statusFilter.filter(s => s !== status))}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProtocols.length} of {protocolsData.length} protocols
          </p>
        </div>
        
        {/* Protocol Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading protocols...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Protocols</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Showing demo data instead</p>
          </div>
        ) : filteredProtocols.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProtocols.map((protocol, index) => (
              <ProtocolCard key={index} protocol={protocol} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No protocols found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ExternalLink, Twitter, Github, FileText, Globe, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ProtocolLoader, getDemoProtocols } from '../utils/protocolLoader';

const ProtocolCard = ({ protocol }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categoryInfo = protocol.categories?.[0]?.split('::') || ['Unknown', ''];
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
      'DePIN': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Payments': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                {protocol.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(mainCategory)} whitespace-nowrap`}>
                  {mainCategory}
                </span>
                {subCategory && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs whitespace-nowrap">
                    {subCategory}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${protocol.live ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={`text-sm font-medium ${protocol.live ? 'text-green-600' : 'text-gray-500'}`}>
                {protocol.live ? 'Live' : 'Coming Soon'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 break-words">
          {protocol.description}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            {protocol.links?.project && (
              <a href={protocol.links.project} target="_blank" rel="noopener noreferrer" 
                className="text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0">
                <Globe size={18} />
              </a>
            )}
            {protocol.links?.twitter && (
              <a href={protocol.links.twitter} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0">
                <Twitter size={18} />
              </a>
            )}
            {protocol.links?.github && (
              <a href={protocol.links.github} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0">
                <Github size={18} />
              </a>
            )}
            {protocol.links?.docs && (
              <a href={protocol.links.docs} target="_blank" rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0">
                <FileText size={18} />
              </a>
            )}
          </div>
          
          {Object.keys(protocol.addresses || {}).length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
            >
              {Object.keys(protocol.addresses).length} Contract{Object.keys(protocol.addresses).length !== 1 ? 's' : ''}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        
        {isExpanded && Object.keys(protocol.addresses || {}).length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Contract Addresses:</h4>
            <div className="space-y-2">
              {Object.entries(protocol.addresses).map(([name, address]) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-medium truncate mr-2">{name}:</span>
                  <span className="text-gray-800 font-mono break-all text-right">{address}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
  const [showFilters, setShowFilters] = useState(false);

  // Create protocol loader instance
  const protocolLoader = useMemo(() => new ProtocolLoader(), []);

  // Load protocols on component mount
  useEffect(() => {
    const loadProtocols = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting protocol loading...');
        const protocols = await protocolLoader.loadAllProtocols();
        
        if (protocols && protocols.length > 0) {
          setProtocolsData(protocols);
          console.log(`Successfully loaded ${protocols.length} protocols`);
        } else {
          console.warn('No protocols loaded, falling back to demo data');
          setProtocolsData(getDemoProtocols());
          setError('Failed to load protocols from server, showing demo data');
        }
      } catch (err) {
        console.error('Error loading protocols:', err);
        setError(`Failed to load protocols: ${err.message}`);
        // Fallback to demo data
        setProtocolsData(getDemoProtocols());
      } finally {
        setLoading(false);
      }
    };

    loadProtocols();
  }, [protocolLoader]);

  // Manual refresh function
  const refreshProtocols = async () => {
    protocolLoader.clearCache();
    setLoading(true);
    setError(null);
    
    try {
      const protocols = await protocolLoader.loadAllProtocols();
      if (protocols && protocols.length > 0) {
        setProtocolsData(protocols);
        setError(null);
      } else {
        setProtocolsData(getDemoProtocols());
        setError('Failed to load protocols from server, showing demo data');
      }
    } catch (err) {
      console.error('Error refreshing protocols:', err);
      setError(`Failed to refresh protocols: ${err.message}`);
      setProtocolsData(getDemoProtocols());
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories and subcategories
  const allCategories = useMemo(() => {
    const categories = new Set();
    const subCategories = new Set();
    
    protocolsData.forEach(protocol => {
      if (protocol.categories && Array.isArray(protocol.categories)) {
        protocol.categories.forEach(category => {
          if (typeof category === 'string') {
            const [main, sub] = category.split('::');
            if (main) categories.add(main);
            if (sub) subCategories.add(sub);
          }
        });
      }
    });
    
    return {
      main: Array.from(categories).sort(),
      sub: Array.from(subCategories).sort()
    };
  }, [protocolsData]);
  
  // Filter protocols
  const filteredProtocols = useMemo(() => {
    return protocolsData.filter(protocol => {
      // Ensure protocol has required fields
      if (!protocol || !protocol.name || !protocol.categories) {
        return false;
      }

      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        protocol.name.toLowerCase().includes(searchLower) ||
        (protocol.description && protocol.description.toLowerCase().includes(searchLower));
      
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

  // Calculate stats
  const stats = useMemo(() => {
    const total = protocolsData.length;
    const live = protocolsData.filter(p => p.live).length;
    const categoryCounts = {};
    
    protocolsData.forEach(protocol => {
      if (protocol.categories && Array.isArray(protocol.categories)) {
        protocol.categories.forEach(category => {
          const [main] = category.split('::');
          if (main) {
            categoryCounts[main] = (categoryCounts[main] || 0) + 1;
          }
        });
      }
    });
    
    return { total, live, categories: categoryCounts };
  }, [protocolsData]);

  // Filter handlers
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubCategoryToggle = (subCategory) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategory) 
        ? prev.filter(c => c !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleStatusToggle = (status) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setStatusFilter([]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Protocols</h2>
          <p className="text-gray-600">Fetching the latest protocol data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Monad Protocol Dashboard
                </h1>
                <p className="text-gray-600">
                  Discover and explore protocols building on Monad testnet
                </p>
              </div>
              
              {/* Refresh button */}
              <button
                onClick={refreshProtocols}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 text-sm flex-wrap">
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

            {/* Error display */}
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <p className="text-yellow-800 text-sm flex-1">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-yellow-600 hover:text-yellow-800 flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex gap-4 items-center mb-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search protocols..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || statusFilter.length > 0) && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.main.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {category} ({stats.categories[category] || 0})
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {allCategories.sub.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Subcategories</h3>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.sub.map(subCategory => (
                      <button
                        key={subCategory}
                        onClick={() => handleSubCategoryToggle(subCategory)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                          selectedSubCategories.includes(subCategory)
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {subCategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle('Live')}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                      statusFilter.includes('Live')
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Live ({stats.live})
                  </button>
                  <button
                    onClick={() => handleStatusToggle('Coming Soon')}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                      statusFilter.includes('Coming Soon')
                        ? 'bg-orange-100 text-orange-800 border-orange-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    Coming Soon ({stats.total - stats.live})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || statusFilter.length > 0) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {selectedCategories.map(category => (
                <span key={category} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  {category}
                  <button
                    onClick={() => handleCategoryToggle(category)}
                    className="hover:text-purple-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {selectedSubCategories.map(subCategory => (
                <span key={subCategory} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {subCategory}
                  <button
                    onClick={() => handleSubCategoryToggle(subCategory)}
                    className="hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {statusFilter.map(status => (
                <span key={status} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {status}
                  <button
                    onClick={() => handleStatusToggle(status)}
                    className="hover:text-green-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProtocols.length} of {protocolsData.length} protocols
          </p>
        </div>

        {/* Main content */}
        {filteredProtocols.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProtocols.map((protocol, index) => (
              <ProtocolCard key={protocol.name || index} protocol={protocol} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No protocols found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || statusFilter.length > 0 || searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
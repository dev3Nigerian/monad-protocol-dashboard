// src/hooks/useProtocols.js
import { useState, useEffect } from 'react';
import { ProtocolLoader } from '../utils/protocolLoader';

export const useProtocols = () => {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loader = new ProtocolLoader();

  const loadProtocols = async (forceReload = false) => {
    try {
      setLoading(true);
      setError(null);

      if (forceReload) {
        loader.clearCache();
      }

      const protocolData = await loader.loadAllProtocols();
      setProtocols(protocolData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Failed to load protocols:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProtocols();
  }, []);

  return {
    protocols,
    loading,
    error,
    lastUpdated,
    reload: () => loadProtocols(true),
  };
};

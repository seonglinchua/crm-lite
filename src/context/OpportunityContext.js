import React, { createContext, useContext, useState, useEffect } from 'react';

const OpportunityContext = createContext();

export const useOpportunity = () => {
  const context = useContext(OpportunityContext);
  if (!context) {
    throw new Error('useOpportunity must be used within an OpportunityProvider');
  }
  return context;
};

export const OpportunityProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  // Load opportunities from localStorage on mount
  useEffect(() => {
    const savedOpportunities = localStorage.getItem('crm_opportunities');
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    } else {
      // Initialize with sample data
      const sampleOpportunities = [
        {
          id: '1',
          name: 'Acme Corp - Digital Transformation',
          client: 'Acme Corporation',
          value: 150000,
          stage: 'proposal',
          probability: 60,
          expectedCloseDate: '2025-12-15',
          owner: 'John Smith',
          source: 'Referral',
          description: 'Complete digital transformation project including cloud migration and process automation',
          createdAt: '2025-09-15',
          lastUpdated: '2025-10-20',
          tags: ['enterprise', 'technology']
        },
        {
          id: '2',
          name: 'Beta LLC - Financial Advisory',
          client: 'Beta LLC',
          value: 75000,
          stage: 'negotiation',
          probability: 80,
          expectedCloseDate: '2025-11-30',
          owner: 'Sarah Johnson',
          source: 'Direct',
          description: 'Ongoing financial advisory and investment management services',
          createdAt: '2025-08-01',
          lastUpdated: '2025-10-25',
          tags: ['finance', 'sme']
        },
        {
          id: '3',
          name: 'Globex Inc - Marketing Campaign',
          client: 'Globex Inc',
          value: 45000,
          stage: 'qualification',
          probability: 40,
          expectedCloseDate: '2026-01-20',
          owner: 'Michael Chen',
          source: 'Website',
          description: 'Comprehensive marketing campaign for Q1 2026 product launch',
          createdAt: '2025-10-01',
          lastUpdated: '2025-10-26',
          tags: ['marketing', 'campaign']
        },
        {
          id: '4',
          name: 'Delta Systems - Software License',
          client: 'Delta Systems',
          value: 200000,
          stage: 'prospecting',
          probability: 20,
          expectedCloseDate: '2026-03-01',
          owner: 'Emily Wong',
          source: 'Event',
          description: 'Enterprise software licensing and implementation services',
          createdAt: '2025-10-10',
          lastUpdated: '2025-10-22',
          tags: ['software', 'enterprise']
        },
        {
          id: '5',
          name: 'Omega Partners - Consulting Services',
          client: 'Omega Partners',
          value: 95000,
          stage: 'closed-won',
          probability: 100,
          expectedCloseDate: '2025-10-15',
          owner: 'David Lee',
          source: 'Referral',
          description: 'Strategic consulting services for business expansion',
          createdAt: '2025-07-20',
          lastUpdated: '2025-10-15',
          tags: ['consulting', 'strategy']
        }
      ];
      setOpportunities(sampleOpportunities);
      localStorage.setItem('crm_opportunities', JSON.stringify(sampleOpportunities));
    }
  }, []);

  // Save to localStorage whenever opportunities change
  useEffect(() => {
    if (opportunities.length > 0) {
      localStorage.setItem('crm_opportunities', JSON.stringify(opportunities));
    }
  }, [opportunities]);

  const addOpportunity = (opportunity) => {
    const newOpportunity = {
      ...opportunity,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setOpportunities([...opportunities, newOpportunity]);
    return newOpportunity;
  };

  const updateOpportunity = (id, updatedData) => {
    setOpportunities(opportunities.map(opp =>
      opp.id === id
        ? { ...opp, ...updatedData, lastUpdated: new Date().toISOString().split('T')[0] }
        : opp
    ));
  };

  const deleteOpportunity = (id) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
  };

  const getOpportunityById = (id) => {
    return opportunities.find(opp => opp.id === id);
  };

  // Pipeline statistics
  const getPipelineStats = () => {
    const stats = {
      total: opportunities.length,
      totalValue: opportunities.reduce((sum, opp) => sum + opp.value, 0),
      weightedValue: opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0),
      byStage: {},
      won: opportunities.filter(opp => opp.stage === 'closed-won').length,
      lost: opportunities.filter(opp => opp.stage === 'closed-lost').length
    };

    const stages = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
    stages.forEach(stage => {
      const stageOpps = opportunities.filter(opp => opp.stage === stage);
      stats.byStage[stage] = {
        count: stageOpps.length,
        value: stageOpps.reduce((sum, opp) => sum + opp.value, 0)
      };
    });

    return stats;
  };

  const getOpportunitiesByStage = (stage) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  const value = {
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getOpportunityById,
    getPipelineStats,
    getOpportunitiesByStage
  };

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
};

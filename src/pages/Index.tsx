
import React, { useState } from 'react';
import Search from './Search';
import Downloads from './Downloads';
import Settings from './Settings';
import AppBar from '@/components/AppBar';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState('search');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'search':
        return <Search />;
      case 'downloads':
        return <Downloads />;
      case 'settings':
        return <Settings />;
      default:
        return <Search />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <AppBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

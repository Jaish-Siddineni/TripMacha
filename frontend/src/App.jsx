import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import HybridPlanner from './pages/HybridPlanner';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState(false);

  return activeWorkspace ? (
    <HybridPlanner />
  ) : (
    <LandingPage onStart={() => setActiveWorkspace(true)} />
  );
}
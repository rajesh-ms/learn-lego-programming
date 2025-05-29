'use client';

import { useEffect } from 'react';
import AppInsightsService from '@/lib/appInsights';

export default function AppInsightsInitializer() {
  useEffect(() => {
    // Initialize Application Insights on client-side
    // Connection string will be read from environment variables
    AppInsightsService.getInstance().initialize();
  }, []);

  return null; // This component doesn't render anything
}

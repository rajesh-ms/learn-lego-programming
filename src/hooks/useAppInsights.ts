'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import AppInsightsService from '@/lib/appInsights';

export function useAppInsights() {
  const pathname = usePathname();
  const appInsights = AppInsightsService.getInstance();
  // Track page views automatically
  useEffect(() => {
    if (pathname) {
      appInsights.trackPageView(pathname, window.location.href);
    }
  }, [pathname, appInsights]);

  // Educational tracking methods
  const trackLessonStart = useCallback((unitId: string, lessonTitle: string) => {
    appInsights.trackLessonStart(unitId, lessonTitle);
  }, [appInsights]);

  const trackLessonComplete = useCallback((unitId: string, lessonTitle: string, timeSpent: number) => {
    appInsights.trackLessonComplete(unitId, lessonTitle, timeSpent);
  }, [appInsights]);

  const trackCodeExampleViewed = useCallback((codeExample: string, unitId: string) => {
    appInsights.trackCodeExampleViewed(codeExample, unitId);
  }, [appInsights]);

  const trackProjectAccessed = useCallback((projectId: string, projectTitle: string) => {
    appInsights.trackProjectAccessed(projectId, projectTitle);
  }, [appInsights]);

  const trackUserProgress = useCallback((unitId: string, progressPercentage: number) => {
    appInsights.trackUserProgress(unitId, progressPercentage);
  }, [appInsights]);  const trackEvent = useCallback((name: string, properties?: Record<string, string>, measurements?: Record<string, number>) => {
    appInsights.trackEvent(name, properties, measurements);
  }, [appInsights]);

  const trackException = useCallback((exception: Error, properties?: Record<string, string>) => {
    appInsights.trackException(exception, properties);
  }, [appInsights]);

  return {
    trackLessonStart,
    trackLessonComplete,
    trackCodeExampleViewed,
    trackProjectAccessed,
    trackUserProgress,
    trackEvent,
    trackException,
  };
}

export default useAppInsights;

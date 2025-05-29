// Application Insights Service for LEGO Learning Platform
// Client-side implementation using Web SDK

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

interface AppInsightsConfig {
  connectionString?: string;
}

declare global {
  interface Window {
    appInsights?: ApplicationInsights;
  }
}

class AppInsightsService {
  private static instance: AppInsightsService;
  private isInitialized = false;
  private connectionString?: string;
  private isClientSide = false;

  private constructor() {
    this.isClientSide = typeof window !== 'undefined';
  }

  public static getInstance(): AppInsightsService {
    if (!AppInsightsService.instance) {
      AppInsightsService.instance = new AppInsightsService();
    }
    return AppInsightsService.instance;
  }

  public async initialize(config: AppInsightsConfig): Promise<void> {
    if (this.isInitialized || !config.connectionString || !this.isClientSide) {
      return;
    }

    this.connectionString = config.connectionString;

    try {
      const appInsights = new ApplicationInsights({
        config: {
          connectionString: config.connectionString,
          enableAutoRouteTracking: true,
          autoTrackPageVisitTime: true,
          enableCorsCorrelation: true,
          enableRequestHeaderTracking: true,
          enableResponseHeaderTracking: true,
        }
      });

      appInsights.loadAppInsights();
      appInsights.trackPageView();
      
      // Store the instance globally for access
      window.appInsights = appInsights;
      
      this.isInitialized = true;
      console.log('Application Insights (Web) initialized successfully');
    } catch (error: unknown) {
      console.error('Failed to initialize Application Insights:', error);
    }
  }

  private getClientInstance(): ApplicationInsights | null {
    if (this.isClientSide && window.appInsights) {
      return window.appInsights;
    }
    return null;
  }

  public trackEvent(name: string, properties?: Record<string, string>, measurements?: Record<string, number>): void {
    if (!this.isInitialized) return;

    const clientInstance = this.getClientInstance();
    if (clientInstance) {
      clientInstance.trackEvent({ name, properties, measurements });
    } else {
      // Fallback: log to console for development
      console.log('Track Event:', { name, properties, measurements });
    }
  }

  public trackPageView(name: string, url?: string): void {
    if (!this.isInitialized) return;

    const clientInstance = this.getClientInstance();
    if (clientInstance) {
      clientInstance.trackPageView({
        name,
        uri: url || (this.isClientSide ? window.location.href : undefined)
      });
    } else {
      console.log('Track Page View:', { name, url });
    }
  }

  public trackException(exception: Error, properties?: Record<string, string>): void {
    if (!this.isInitialized) return;

    const clientInstance = this.getClientInstance();
    if (clientInstance) {
      clientInstance.trackException({ exception, properties });
    } else {
      console.error('Track Exception:', exception, properties);
    }
  }

  public trackTrace(message: string, properties?: Record<string, string>): void {
    if (!this.isInitialized) return;

    const clientInstance = this.getClientInstance();
    if (clientInstance) {
      clientInstance.trackTrace({ message, properties });
    } else {
      console.log('Track Trace:', { message, properties });
    }
  }

  public trackMetric(name: string, value: number, properties?: Record<string, string>): void {
    if (!this.isInitialized) return;

    const clientInstance = this.getClientInstance();
    if (clientInstance) {
      clientInstance.trackMetric({ 
        name, 
        average: value,
        properties 
      });
    } else {
      console.log('Track Metric:', { name, value, properties });
    }
  }

  // Educational-specific tracking methods
  public trackLessonStart(unitId: string, lessonTitle: string): void {
    this.trackEvent('LessonStart', {
      unitId,
      lessonTitle,
      timestamp: new Date().toISOString(),
    });
  }

  public trackLessonComplete(unitId: string, lessonTitle: string, timeSpent: number): void {
    this.trackEvent('LessonComplete', {
      unitId,
      lessonTitle,
      timestamp: new Date().toISOString(),
    }, {
      timeSpentSeconds: timeSpent,
    });
  }

  public trackCodeExampleViewed(codeExample: string, unitId: string): void {
    this.trackEvent('CodeExampleViewed', {
      codeExample: codeExample.substring(0, 100), // Truncate for telemetry
      unitId,
      timestamp: new Date().toISOString(),
    });
  }

  public trackProjectAccessed(projectId: string, projectTitle: string): void {
    this.trackEvent('ProjectAccessed', {
      projectId,
      projectTitle,
      timestamp: new Date().toISOString(),
    });
  }

  public trackUserProgress(unitId: string, progressPercentage: number): void {
    this.trackEvent('UserProgress', {
      unitId,
      timestamp: new Date().toISOString(),
    }, {
      progressPercentage,
    });
  }
}

export default AppInsightsService;

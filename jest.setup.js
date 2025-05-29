// Jest setup file for testing environment configuration

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Application Insights (web version)
jest.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
    trackException: jest.fn(),
    trackTrace: jest.fn(),
    trackMetric: jest.fn(),
    addTelemetryInitializer: jest.fn(),
  })),
}));

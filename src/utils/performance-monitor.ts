import * as Sentry from "@sentry/nextjs";

export class PerformanceMonitor {
  static init() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      release: process.env.npm_package_version
    });
  }

  static trackTransaction(name: string, attributes: Record<string, any>) {
    Sentry.startTransaction({ name });
    Sentry.configureScope(scope => {
      Object.entries(attributes).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    });
  }

  static measurePerformance(callback: () => void, metricName: string) {
    const start = performance.now();
    callback();
    const duration = performance.now() - start;
    
    Sentry.metrics.addMetric(metricName, duration);
  }
}

import * as Sentry from "@sentry/nextjs";

export class PerformanceMonitor {
  // Measure and log performance metrics
  static measurePerformance(callback: () => void, metricName: string) {
    const start = performance.now();
    callback();
    const duration = performance.now() - start;
    
    // Log performance metric
    Sentry.metrics.addMetric(metricName, duration);
    console.log(`Performance Metric [${metricName}]: ${duration}ms`);
  }

  // Track slow operations
  static trackSlowOperation(threshold: number = 100) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const duration = performance.now() - start;

        if (duration > threshold) {
          console.warn(`Slow Operation: ${propertyKey} took ${duration}ms`);
          Sentry.captureMessage(`Slow Operation: ${propertyKey}`, {
            extra: {
              duration,
              args
            }
          });
        }

        return result;
      };

      return descriptor;
    };
  }
}

import * as Sentry from "@sentry/nextjs";

export class ErrorHandler {
  static init() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development'
    });
  }

  static captureException(error: Error, context?: any) {
    Sentry.captureException(error, { extra: context });
  }

  static logError(message: string, error?: Error) {
    console.error(message, error);
    if (error) {
      this.captureException(error);
    }
  }
}

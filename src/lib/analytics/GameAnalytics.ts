import amplitude from 'amplitude-js';
import * as Sentry from "@sentry/react";

export class GameAnalytics {
  private static instance: GameAnalytics;

  private constructor() {
    // Initialize Amplitude
    amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY || '');

    // Initialize Sentry
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }

  public static getInstance(): GameAnalytics {
    if (!GameAnalytics.instance) {
      GameAnalytics.instance = new GameAnalytics();
    }
    return GameAnalytics.instance;
  }

  trackGamePlay(gameId: string, betAmount: number, result: string) {
    amplitude.getInstance().logEvent('Game Played', {
      gameId,
      betAmount,
      result
    });
  }

  trackError(error: Error, context?: any) {
    Sentry.captureException(error, { extra: context });
  }

  trackPerformance(metric: string, value: number) {
    amplitude.getInstance().logEvent('Performance Metric', {
      metric,
      value
    });
  }
}

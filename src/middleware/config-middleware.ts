import { NextApiRequest, NextApiResponse } from 'next';
import { ConfigurationService } from '../services/ConfigurationService';

export function configMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Load current configuration
    const config = ConfigurationService.getConfiguration();

    // Attach configuration to request
    (req as any).platformConfig = config;

    // Continue to route handler
    return handler(req, res);
  };
}

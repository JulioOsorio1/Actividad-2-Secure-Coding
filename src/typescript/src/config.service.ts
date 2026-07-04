

import { Injectable } from '@nestjs/common';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {throw new Error(`Variable de entorno requerida no esta definida: ${name}`);
  }
  return value;
}

@Injectable()
export class ConfigService {
  readonly jwtSecret: string = requireEnv('JWT_SECRET');
  readonly dbPassword: string = requireEnv('DB_PASSWORD');
  readonly stripeKey: string = requireEnv('STRIPE_API_KEY');
}



import { Injectable, Logger } from '@nestjs/common';


const SENSITIVE_FIELDS = new Set([
  'password', 'passwd', 'secret', 'token', 'apiKey', 'api_key',
  'authorization', 'creditCard', 'cardNumber', 'cvv', 'ssn',
  'pin', 'otp', 'privateKey', 'accessToken', 'refreshToken',
]);


@Injectable()
export class LogsService {
  private readonly logger = new Logger(LogsService.name);

  
  private redact(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(item => this.redact(item));

    
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (SENSITIVE_FIELDS.has(key.toLowerCase())) {
        result[key] = '[REDACTED]';
      } else {
        result[key] = this.redact(value);
      }
    }
    return result;
  }

  logRequest(body: unknown): void {
    this.logger.log(JSON.stringify(this.redact(body)));  // body redactado
  }
}

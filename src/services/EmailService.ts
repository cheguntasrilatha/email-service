import { MockProviderA } from "../providers/MockProviderA";
import { MockProviderB } from "../providers/MockProviderB";
import { RateLimiter } from "../utils/RateLimiter";
import { CircuitBreaker } from "../utils/CircuitBreaker";
import { sleep } from "../utils/sleep";

interface EmailData {
  to: string;
  subject: string;
  body: string;
  idempotencyKey: string;
}

export class EmailService {
  private providers: any[] = [];
  private attempts: Map<string, any> = new Map();
  private rateLimiter = new RateLimiter(5, 10000); // 5 requests / 10s
  private sentCache: Set<string> = new Set();

  constructor() {
    this.providers = [
      { service: new MockProviderA(), breaker: new CircuitBreaker() },
      { service: new MockProviderB(), breaker: new CircuitBreaker() }
    ];
  }

  async sendEmail(data: EmailData): Promise<boolean> {
    if (!this.rateLimiter.allow()) throw new Error("Rate limit exceeded");
    if (this.sentCache.has(data.idempotencyKey)) return true;

    for (let i = 0; i < this.providers.length; i++) {
      const { service, breaker } = this.providers[i];
      if (!breaker.isAvailable()) continue;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await sleep(Math.pow(2, attempt) * 100); // Exponential backoff
          const result = await service.send(data);
          if (result) {
            this.sentCache.add(data.idempotencyKey);
            this.attempts.set(data.idempotencyKey, { provider: service.name, attempts: attempt + 1 });
            return true;
          }
        } catch (err) {
          breaker.recordFailure();
        }
      }
    }
    throw new Error("All providers failed");
  }
}
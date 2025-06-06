export class CircuitBreaker {
  private failures = 0;
  private threshold = 3;
  private cooldown = 10000;
  private lastFailureTime = 0;

  recordFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
  }

  isAvailable(): boolean {
    if (this.failures >= this.threshold) {
      if (Date.now() - this.lastFailureTime > this.cooldown) {
        this.failures = 0;
        return true;
      }
      return false;
    }
    return true;
  }
}

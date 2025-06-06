export class RateLimiter {
  private max: number;
  private window: number;
  private timestamps: number[] = [];

  constructor(max: number, window: number) {
    this.max = max;
    this.window = window;
  }

  allow(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.window);
    if (this.timestamps.length >= this.max) return false;
    this.timestamps.push(now);
    return true;
  }
}

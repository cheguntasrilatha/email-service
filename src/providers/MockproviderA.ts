export class MockProviderA {
  name = "ProviderA";

  async send(data: any): Promise<boolean> {
    if (Math.random() < 0.7) throw new Error("ProviderA failed");
    console.log("ProviderA sent:", data);
    return true;
  }
}

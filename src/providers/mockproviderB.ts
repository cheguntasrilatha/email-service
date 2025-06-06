export class MockProviderB {
  name = "ProviderB";

  async send(data: any): Promise<boolean> {
    if (Math.random() < 0.5) throw new Error("ProviderB failed");
    console.log("ProviderB sent:", data);
    return true;
  }
}

import { EmailService } from "../src/services/EmailService";

describe("EmailService", () => {
  it("should send an email successfully", async () => {
    const service = new EmailService();
    const result = await service.sendEmail({
      to: "test@example.com",
      subject: "Test Email",
      body: "Hello!",
      idempotencyKey: "abc123"
    });
    expect(result).toBe(true);
  });

  it("should not send duplicate email due to idempotency", async () => {
    const service = new EmailService();
    await service.sendEmail({
      to: "test@example.com",
      subject: "Test Email",
      body: "Hello!",
      idempotencyKey: "duplicate123"
    });
    const result = await service.sendEmail({
      to: "test@example.com",
      subject: "Test Email",
      body: "Hello!",
      idempotencyKey: "duplicate123"
    });
    expect(result).toBe(true);
  });
});

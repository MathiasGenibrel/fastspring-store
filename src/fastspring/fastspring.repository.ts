export class FastspringRepository {
  constructor() {}

  public static async buildCheckout(storeContent: Record<string, number>) {
    try {
      // const builder = await this.getBuilder();
      // builder.push({ products: storeContent });
    } catch (error) {
      console.error("Unknown error", error);
    }
  }

  private static async getBuilder(): Promise<any> {
    const response = await fetch(
      "https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.8.9/fastspring-builder.min.js",
      {
        method: "GET",
      },
    );

    console.log(response);

    return await response.text();
  }
}

interface FastspringProduct {
  path: string;
  quantity: number;
}

interface FastspringPush {
  reset: boolean;
  products: FastspringProduct[];
}

interface Builder {
  push: (data: FastspringPush) => void;
  checkout: () => void;
}

interface FastSpring {
  builder: Builder;
}

export class FastspringRepository {
  constructor() {}

  public static async buildCheckout(storeContent: Record<string, number>) {
    if (!("fastspring" in window)) {
      throw new Error("Fastspring SDK, not loaded fastspring object in window");
    }

    try {
      const products = Object.entries(storeContent).map(([path, quantity]) => ({
        path,
        quantity,
      }));

      const fastspring = window.fastspring as FastSpring;

      // Add product to fastspring store
      fastspring.builder.push({
        reset: true,
        products,
      });

      // Open checkout
      fastspring.builder.checkout();
    } catch (error) {
      console.error("Unknown error", error);
    }
  }
}

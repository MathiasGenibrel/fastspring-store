import { useEffect } from "react";
import "./App.css";
import { SessionStorageService } from "@/src/services/storage/session.storage-service.ts";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_KEY } from "@/src/storefront/constants.ts";
import { Spinner } from "@chakra-ui/react";
import { StorefrontTable } from "@/entrypoints/popup/storefront/StorefrontTable.tsx";
import { StorefrontPayload } from "@/src/storefront/storefront.type.ts";

const sessionStorageService = new SessionStorageService(storage);

function App() {
  const storefront = useQuery({
    queryKey: [STOREFRONT_KEY],
    queryFn: () => sessionStorageService.get(STOREFRONT_KEY),
  });

  useEffect(() => {
    const unwatch = sessionStorageService.watch(
      STOREFRONT_KEY,
      (storefront) => {
        console.log("storefront changed", storefront);
      },
    );

    return () => {
      unwatch();
    };
  }, []);

  if (storefront.isLoading) {
    return <Spinner />;
  }

  if (storefront.isError) {
    return <div>Error</div>;
  }

  if (!storefront.data) {
    return <div>No data</div>;
  }

  return (
    <StorefrontTable
      title={["Product", "Price", "Discount"]}
      data={storefront.data as StorefrontPayload}
    />
  );
}

export default App;

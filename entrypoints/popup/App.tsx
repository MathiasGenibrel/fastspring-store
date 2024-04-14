import { useEffect, useState } from "react";
import "./App.css";
import { SessionStorageService } from "@/src/services/storage/session.storage-service.ts";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_KEY } from "@/src/storefront/constants.ts";

const sessionStorageService = new SessionStorageService(storage);

function App() {
  const sessionStorage = useQuery({
    queryKey: [STOREFRONT_KEY],
    queryFn: () => sessionStorageService.get(STOREFRONT_KEY),
  });
  const [count, setCount] = useState(0);

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

  if (sessionStorage.isLoading) {
    return <div>Loading...</div>;
  }

  if (sessionStorage.isError) {
    return <div>Error</div>;
  }

  return <section>DATA: {JSON.stringify(sessionStorage.data)}</section>;
}

export default App;

import { Spinner } from "@chakra-ui/react";
import { StorefrontTable } from "@/entrypoints/popup/storefront/StorefrontTable.tsx";
import { useStorefrontTable } from "@/entrypoints/popup/storefront/hooks/useStorefrontTable.tsx";
import { useStorefrontTableHeaders } from "@/entrypoints/popup/storefront/hooks/useStorefrontTableHeaders.tsx";

function App() {
  const {
    data,
    isError,
    isLoading,
    handleSortReset,
    handleSortDesc,
    handleSortAsc,
  } = useStorefrontTable();
  const headers = useStorefrontTableHeaders(
    handleSortAsc,
    handleSortDesc,
    handleSortReset,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <StorefrontTable headers={headers} data={data} />;
}

export default App;

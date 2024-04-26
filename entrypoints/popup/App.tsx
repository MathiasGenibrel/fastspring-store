import { StorefrontTable } from "@/entrypoints/popup/storefront/StorefrontTable.tsx";
import { useStorefrontTable } from "@/entrypoints/popup/storefront/hooks/useStorefrontTable.tsx";
import { useStorefrontTableHeaders } from "@/entrypoints/popup/storefront/hooks/useStorefrontTableHeaders.tsx";
import { Header } from "@/entrypoints/popup/header/Header.tsx";
import { NoData } from "@/entrypoints/popup/no-data/NoData.tsx";
import { Loader } from "@/entrypoints/popup/loader/Loader.tsx";

function App() {
  const {
    data,
    isError,
    isLoading,
    reload,
    handleSortReset,
    handleSortDesc,
    handleSortAsc,
    handleSearch,
  } = useStorefrontTable();
  const headers = useStorefrontTableHeaders(
    handleSortAsc,
    handleSortDesc,
    handleSortReset,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <NoData reloadStore={reload} />;
  }

  return (
    <>
      <Header
        currency={data.currency}
        handleSearch={handleSearch}
        existingProducts={data.products}
      />
      <StorefrontTable headers={headers} data={data} />
    </>
  );
}

export default App;

import React from "react";
import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";
import { StorefrontPayload } from "@/src/storefront/storefront.type.ts";
import { Product } from "@/entrypoints/popup/storefront/components/Product.tsx";
import {
  Header,
  HeaderProps,
} from "@/entrypoints/popup/storefront/components/Header.tsx";

interface StorefrontTableProps {
  headers: HeaderProps[];
  data: StorefrontPayload;
}

export const StorefrontTable: React.FC<StorefrontTableProps> = ({
  headers,
  data,
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Header
                key={header.title}
                title={header.title}
                sortFunction={header.sortFunction}
              />
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.products.map((d) => (
            <Product
              key={d.path}
              image={d.image}
              currency={data.currency}
              display={d.display}
              discount={{
                percent: d.discountPercentValue,
                total: d.discountTotalValue,
              }}
              price={d.priceValue}
              path={d.path}
              subscription={d.subscription}
              description={d.description}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

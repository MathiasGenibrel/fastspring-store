import React from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { StorefrontPayload } from "@/src/storefront/storefront.type.ts";
import { Product } from "@/entrypoints/popup/storefront/components/Product.tsx";

interface StorefrontTableProps {
  title: string[];
  data: StorefrontPayload;
}

export const StorefrontTable: React.FC<StorefrontTableProps> = ({
  title,
  data,
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {title.map((t) => (
              <Th>{t}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.products.map((d) => (
            <Product
              image={d.image}
              currency={data.currency}
              display={d.display}
              discount={{
                percent: d.discountPercentValue,
                total: d.discountTotalValue,
              }}
              price={d.priceValue}
              sku={d.sku}
              subscription={d.subscription}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

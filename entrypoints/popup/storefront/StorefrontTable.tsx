import React from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { StorefrontPayload } from "@/src/storefront/storefront.type.ts";
import { Product } from "@/entrypoints/popup/storefront/components/Product.tsx";
import { Sort } from "@/src/helpers/sorter.helper.ts";

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
              <Th key={t}>{t}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Sort.byDescending(data.products, "discountPercentValue").map((d) => (
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
              sku={d.sku}
              subscription={d.subscription}
              description={d.description}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

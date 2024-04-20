import React from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Product } from "@/src/storefront/storefront.type.ts";
import { StringHelper } from "@/src/helpers/string.helper.ts";

interface ComplementaryInformationProps {
  description: Product["description"];
}

export const ComplementaryInformation: React.FC<
  ComplementaryInformationProps
> = ({ description }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon cursor={"pointer"} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Description</PopoverHeader>

        <PopoverBody style={{ textWrap: "wrap" }}>
          {StringHelper.removeHtmlTags(
            description.full ?? description.summary ?? "",
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

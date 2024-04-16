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

interface ComplementaryInformationProps {
  description: Product["description"];
}

const removeHtmlTags = (text: string) => {
  // Define the HTML tag pattern
  const htmlTagsPattern = /<[^>]+>/g;

  // Remove HTML tags from the text using the pattern
  const cleanText = text.replace(htmlTagsPattern, "");

  return cleanText;
};

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
        <PopoverHeader>Complementary information</PopoverHeader>

        <PopoverBody style={{ textWrap: "wrap" }}>
          {removeHtmlTags(description.full || description.summary || "")}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

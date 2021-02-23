import React from "react";
import { BlockWrapper } from "@/components/BlockWrapper";
import { CollectionsListModule } from "@/modules/CollectionsListModule";
import { ThreeColumnsLayout } from "./components";

export const CollectionsPage = () => (
  <ThreeColumnsLayout>
    <BlockWrapper>
      <CollectionsListModule />
    </BlockWrapper>
  </ThreeColumnsLayout>
);

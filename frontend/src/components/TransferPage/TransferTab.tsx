import React, { useState } from 'react';
import { TransferBoltImage, TransferImageGrid, TransferImageGridContainer } from "./TransferImageComponents";
import {
  TransferContainer,
  TransferMenuContainer,
  TransferImageContainer,
  TransferImagesDetailWrapper, TransferImageDetailContainer
} from "./TransferTabComponents"
import { Button, RedButton, SemesButton } from "../ButtonComponents";
import { TransferLoaderType } from "../../_utils/Types";
import {Form, useRouteLoaderData} from "react-router-dom";
import TransferImage from "./TransferImage";


const TransferTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  let BoltImageLists = useRouteLoaderData("transfer") as TransferLoaderType[];
  console.log(BoltImageLists)

  const TabMenuList = ['양호', '유실', '풀림', '모호'];




  return (
    <TransferContainer>

      <TransferMenuContainer>
        { TabMenuList.map((menu, idx) =>
          <li
            key={`transfer-tab-menu-${idx}`}
            className={idx === tabIndex ? "isActive" : "" }
            onClick={ () => setTabIndex(idx) }
          >
            {TabMenuList[idx]}<span>{BoltImageLists[idx].images.length}</span>
          </li>
        ) }
      </TransferMenuContainer>

      <TransferImageContainer>
        <TransferImage tabIndex={tabIndex} BoltImageLists={BoltImageLists} />
      </TransferImageContainer>
    </TransferContainer>
  );
}

export default TransferTab;
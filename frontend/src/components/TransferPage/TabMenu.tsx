import React from 'react';

import { useAppDispatch, useAppSelector } from "../../_hooks/hooks";
import { setStatus, setIsDetailOpen } from "../../_store/slices/transferPageSlice";

import { TabMenuLi, TransferMenuContainer, LengthSpan } from "./styledComponents/TabMenuComponents";

function TabMenu({imageLengthList}: { imageLengthList: number[] }) {

  const dispatch = useAppDispatch();
  const { status, statusNameList } = useAppSelector(state => state.transferPage);

  return (
    <TransferMenuContainer>
      { statusNameList.map((statusName, idx) =>
        <TabMenuLi
          key={`transfer-tab-menu_${idx}`}
          className={idx === status ? "isActive" : "" }
          onClick={ () => {
            dispatch(setStatus(idx));
            dispatch(setIsDetailOpen(false));
          }}
        >
          { statusNameList[idx] } <LengthSpan>{ imageLengthList[idx] }</LengthSpan>
        </TabMenuLi>
      ) }
    </TransferMenuContainer>
  );
}

export default TabMenu;
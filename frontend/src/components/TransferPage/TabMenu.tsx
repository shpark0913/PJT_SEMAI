import React from 'react';
import {TabMenuLi, TransferMenuContainer, LengthSpan} from "./TabMenuComponents";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import {setTabIndex, setIsDetailOpen} from "../../_store/slices/transferPageSlice";

function TabMenu({imageLengthList}: { imageLengthList: number[] }) {

  const dispatch = useAppDispatch();
  const { tabIndex, tabMenuList } = useAppSelector(state => state.transferPage);

  return (
    <TransferMenuContainer>
      { tabMenuList.map((menu, idx) =>
        <TabMenuLi
          key={`transfer-tab-menu_${idx}`}
          className={idx === tabIndex ? "isActive" : "" }
          onClick={ () => {
            dispatch(setTabIndex(idx));
            dispatch(setIsDetailOpen(false));
          } }
        >
          { tabMenuList[idx] } <LengthSpan>{ imageLengthList[idx] }</LengthSpan>
        </TabMenuLi>
      ) }
    </TransferMenuContainer>
  );
}

export default TabMenu;
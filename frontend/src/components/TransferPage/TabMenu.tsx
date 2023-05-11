import React from 'react';
import {TabMenuLi, TransferMenuContainer, TabMenuImageLengthSpan} from "./TabMenuComponents";
import {useAppDispatch} from "../../_hooks/hooks";
import {setTabIndex, setIsDetailOpen} from "../../_store/slices/transferPageSlice";

function TabMenu({TabMenuList, tabIndex, imageLengthList}: {
  TabMenuList: string[],
  imageLengthList: number[],
  tabIndex: number,
}) {

  const dispatch = useAppDispatch();

  return (
    <TransferMenuContainer>
      { TabMenuList.map((menu, idx) =>
        <TabMenuLi
          key={`transfer-tab-menu_${idx}`}
          className={idx === tabIndex ? "isActive" : "" }
          onClick={ () => {
            dispatch(setTabIndex(idx));
            dispatch(setIsDetailOpen(false));
          } }
        >
          { TabMenuList[idx] } <TabMenuImageLengthSpan>{ imageLengthList[idx] }</TabMenuImageLengthSpan>
        </TabMenuLi>
      ) }
    </TransferMenuContainer>
  );
}

export default TabMenu;
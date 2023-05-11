import React from 'react';
import {TransferMenuContainer} from "./TabMenuComponents";
import {useAppDispatch} from "../../_hooks/hooks";
import {setTabIndex} from "../../_store/slices/transferPageSlice";

function TabMenu({TabMenuList, tabIndex, imageLengthList, setIsDetailOpen}: {
  TabMenuList: string[],
  imageLengthList: number[],
  tabIndex: number,
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const dispatch = useAppDispatch();

  return (
    <TransferMenuContainer>
      { TabMenuList.map((menu, idx) =>
        <li
          key={`transfer-tab-menu_${idx}`}
          className={idx === tabIndex ? "isActive" : "" }
          onClick={ () => {
            dispatch(setTabIndex(idx));
            setIsDetailOpen(false);
          } }
        >
          { TabMenuList[idx] } <span>{ imageLengthList[idx] }</span>
        </li>
      ) }
    </TransferMenuContainer>
  );
}

export default TabMenu;
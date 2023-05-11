import React from 'react';
import {TransferMenuContainer} from "./TabMenuComponents";

function TabMenu({TabMenuList, tabIndex, setTabIndex, imageLengthList, setIsDetailOpen}: {
  TabMenuList: string[],
  imageLengthList: number[],
  tabIndex: number,
  setTabIndex: React.Dispatch<React.SetStateAction<number>>
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <TransferMenuContainer>
      { TabMenuList.map((menu, idx) =>
        <li
          key={`transfer-tab-menu_${idx}`}
          className={idx === tabIndex ? "isActive" : "" }
          onClick={ () => {
            setTabIndex(idx);
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
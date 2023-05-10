import {Button} from "../ButtonComponents";
import React from "react";
import useTransferBoltImages from "../../_hooks/useTransferBoltImages";


function TransferButtons() {
  const { TransferClass } = useTransferBoltImages()
  // 제출 버튼
  // 0: 양호 , 1: 유실, 2: 파단
  /** 다른 클래스로 이동하기  */
  const TransferClassButton = (preType: number, nextType: number, fileIds: number[]) => {
    switch (nextType) {
      case 0:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>양호로 이동</Button>
      case 1:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>유실로 이동</Button>
      case 2:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>파단으로 이동</Button>

    }

  }
  return { TransferClassButton }
}

export default TransferButtons;
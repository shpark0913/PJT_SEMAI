import React from "react";
import { TransferBoltImageObject } from "../../_utils/Types";
import { CloseButton, Modal, ModalBackground, ModalContainer } from "../Modal/ModalComponents";
// import Title from "../Title";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../_hooks/hooks";
import { setIsConfirmModalOpen } from "../../_store/slices/transferPageSlice";
import ImageUrl from "../../_utils/ImageUrl";
import TransferButtons from "./TransferButtons";
import styled from "styled-components";

const DescriptionDiv = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const BoltImageGridContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
`;

const BoltImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  & > button:first-child {
    margin-right: 10px;
  }
`

function ConfirmModal({ selected, setSelected }: {selected: TransferBoltImageObject[], setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>}) {

  /*
   * preType이 0, 1, 2면 클래스에서 이동, 학습으로 이동, 삭제 3개의 기능
   * 3이면 학습시키기, 삭제 2개의 기능
   */

  const dispatch = useAppDispatch();
  const { type, statusNameList } = useAppSelector(state => state.transferPage);
  const { TransferClassButton, CancelConfirmModalButton, TransferLearningButton, DeleteImagesButton } = TransferButtons();
  const TransferDescription = [
    '"양호"로 이동하겠습니까?',
    '"유실"로 이동하겠습니까?',
    '"파단"으로 이동하겠습니까?',
    '"학습"으로 이동하겠습니까?',
    '삭제하겠습니까?',
  ]
  const LearnDescription = [
    '학습하겠습니까?',
    '삭제하겠습니까?'
  ]

  return (
    <Modal>
      <ModalBackground onClick={() => dispatch(setIsConfirmModalOpen(false))}  />
      <ModalContainer>
        <CloseButton onClick={() => dispatch(setIsConfirmModalOpen(false))} ><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>

        {
          type.preType < 3?   // 클래스에서 -> 클래스, 학습, 삭제
            <>
              <DescriptionDiv>{`${ type.nextType < 4?  `"${statusNameList[type.preType]}"에서 ` : "" }${TransferDescription[type.nextType]} (총 ${selected.length}장)`}</DescriptionDiv>
              <BoltImageGridContainer>
                <BoltImageGrid>
                  { selected.map(data => <img src={ImageUrl(data.imgUrl)} alt='볼트 이미지' width="100%"></img>) }
                </BoltImageGrid>
              </BoltImageGridContainer>
              <ButtonsContainer>
                { CancelConfirmModalButton() }
                { type.nextType < 3 ? TransferClassButton(type.preType, type.nextType, selected, setSelected ) : <></> }
                { type.nextType === 3 ? TransferLearningButton(selected, setSelected) :<></> }
                { type.nextType === 4 ? DeleteImagesButton(type.preType, selected, setSelected) :<></> }
              </ButtonsContainer>
            </>
          :                  // 학습에서 -> 학습, 삭제
            <>
              <DescriptionDiv>{`${ type.nextType < 4?  LearnDescription[0] :  TransferDescription[type.nextType]}`}</DescriptionDiv>
              <BoltImageGridContainer>
                <BoltImageGrid style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "20px"}}>
                  { selected.map(data => <img src={ImageUrl(data.imgUrl)} alt='볼트 이미지' width="100%"></img>) }
                </BoltImageGrid>
              </BoltImageGridContainer>
              <ButtonsContainer>
                { CancelConfirmModalButton() }

                { type.nextType < 3 ? TransferClassButton(type.preType, type.nextType, selected, setSelected ) : <></> }
                { type.nextType === 3 ? TransferLearningButton(selected, setSelected) :<></> }
                { type.nextType === 4 ? DeleteImagesButton(type.preType, selected, setSelected) :<></> }
              </ButtonsContainer>
            </>

        }

      </ModalContainer>
    </Modal>
  );
}

export default ConfirmModal;
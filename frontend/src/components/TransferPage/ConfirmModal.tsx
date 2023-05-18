import React from "react";
import { CloseButton, Modal, ModalBackground, ModalContainer } from "../Modal/ModalComponents";

import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../_hooks/hooks";
import { setIsConfirmModalOpen } from "../../_store/slices/transferPageSlice";
import ImageUrl from "../../_utils/ImageUrl";
import TransferButtons from "./TransferButtons";
import styled from "styled-components";
import {Label} from "../ReportPage/FilterComponents";
import RefreshIcon from '@mui/icons-material/Refresh';

const DescriptionDiv = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
`;

const BoltImageGridContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
`;

const BoltImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
`;

const ButtonsContainer = styled.div`
  & > button:first-child {
    margin-right: 10px;
  }
`

const ParamsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border: none;
  & > * {
    margin-bottom: 10px;
  }
  & > button {
    background: transparent;
  }
`

function ConfirmModal() {

  /*
   * preType이 0, 1, 2면 클래스에서 이동, 학습으로 이동, 삭제 3개의 기능
   * 3이면 학습시키기, 삭제 2개의 기능
   */

  const dispatch = useAppDispatch();
  const { type, status, statusNameList, selectedClass, selectedTrain } = useAppSelector(state => state.transferPage);
  const {theme} = useAppSelector(state => state.theme)
  const { preType, nextType } = type;
  const { CancelConfirmModalButton, TransferClassButton, TransferLearningButton, DeleteImagesButton, TrainButton } = TransferButtons();

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

        { preType <= 2?
            <>
              <DescriptionDiv>
                { `${ nextType < 4?  `"${statusNameList[preType]}"에서 ` : "" }${TransferDescription[nextType]} (총 ${selectedClass[status].length}장)`}
              </DescriptionDiv>
              <BoltImageGridContainer>
                <BoltImageGrid>
                  { selectedClass[status].map(data => <img key={`selected-images-${data.fileId}`} src={ImageUrl(data.imgUrl)} alt='볼트 이미지' width="100%"></img>) }
                </BoltImageGrid>
              </BoltImageGridContainer>
              <ButtonsContainer>
                { CancelConfirmModalButton() }
                { type.nextType <= 2 ? TransferClassButton(preType, nextType, selectedClass[status]) : <></> }
                { type.nextType === 3 ? TransferLearningButton(selectedClass[status]) :<></> }
                { type.nextType === 4 ? DeleteImagesButton(selectedClass[status]) :<></> }
              </ButtonsContainer>
            </>
          :
            <>
              <DescriptionDiv>{`${ type.nextType === 4?  LearnDescription[1] :  LearnDescription[0]}`}</DescriptionDiv>
              <BoltImageGridContainer>
                { selectedTrain.map((selected, idx) => <>
                  <h1>{ statusNameList[idx] }</h1>
                  <BoltImageGrid style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "20px"}}>
                    { selected.map(data => <img key={`selected-train-images-${data.fileId}`} src={ImageUrl(data.imgUrl)} alt='볼트 이미지' width="100%"></img>) }
                  </BoltImageGrid>
                </>) }
              </BoltImageGridContainer>

                <form >
                  <ParamsContainer>
                    <Label>
                      learning rate :
                      <input type="number" name="lr" min={0.0001} max={0.01} defaultValue={0.001} step={0.0001} />
                    </Label>
                    <Label>
                      momentum :
                      <input type="number" name="momentum" min={0} max={1} defaultValue={0.9} step={0.1} />
                    </Label>
                    <Label theme={theme}>
                      batch :
                      <select name="batch" defaultValue={16} >
                        <option value={16}>16</option>
                        <option value={32}>32</option>
                        <option value={64}>64</option>
                        <option value={128}>128</option>
                      </select>
                    </Label>
                    <Label>
                      epoch :
                      <input type="number" name="epoch" min={1} defaultValue={10} step={1} />
                    </Label>
                    <button type="reset"><RefreshIcon sx={{width: "30px", height: "30px", color: "var(--emphasize-color)"}} /></button>
                  </ParamsContainer>
                  <ButtonsContainer>
                    { CancelConfirmModalButton() }
                    { type.nextType === 3 ? TrainButton() :<></> }
                    { type.nextType === 4 ? DeleteImagesButton(selectedTrain.reduce((acc, cur) => [...acc, ...cur], [])) :<></> }
                  </ButtonsContainer>
                </form>

            </> }

      </ModalContainer>
    </Modal>
  );
}

export default ConfirmModal;
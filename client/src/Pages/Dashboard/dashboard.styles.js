import { Paper } from '@mui/material';
import styled from 'styled-components';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding-bottom: 0;
  max-width: 50%;
  column-gap: 50px;
  row-gap: 50px;
  //   padding: 20px;
`;
const LeftContainer = styled.div`
  flex: 0.7;
  flex-direction: column;
  flex: 0.35;
`;
const DashboardTile = styled(Paper)`
  padding: 20px;
  //   margin: 20px;
`;
const DashboardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  top: 70px;
  padding: 50px;
  padding-bottom: 0px;
`;
const RightContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  justify-items: center;
  //   flex-direction: column;
  flex: 1;
  width: 100%;
`;
export {
  DashboardGrid,
  DashboardTile,
  LeftContainer,
  DashboardContainer,
  RightContainer,
};

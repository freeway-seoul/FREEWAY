'use client';

import { useContext } from 'react';
import styled from 'styled-components';

import { useStationInfo } from '@/common/api/stations';
import { SearchContext } from '@/common/context/SearchContext';
import StationContextProvider from '@/common/context/StationContext';

import BottomSheet from './bottomSheet/BottomSheet';
import ContentsView from './ContentsView';
import NaverMapScriptLoader from './map/NaverMapScriptLoader';
import StationSearchBar from './StationSearchBar';

const Subway = () => {
  const { selectedStationId, keyword } = useContext(SearchContext);
  const { data: station } = useStationInfo(selectedStationId);

  return (
    <>
      <StyledContainer>
        <StationSearchBar stationName={(keyword || station?.stationName) ?? '서울'} />
        <NaverMapScriptLoader>
          {station && (
            <StationContextProvider initStation={station}>
              <ContentsView />
              <BottomSheet />
            </StationContextProvider>
          )}
        </NaverMapScriptLoader>
      </StyledContainer>
    </>
  );
};

export default Subway;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

import { useState } from 'react';
import styled from '@emotion/styled';
import Join from '../../components/units/teamMember/Join/join.index';
import SelectTime from '../../components/units/teamMember/SelectTime/selectTime.index';
import Summary from '../../components/units/teamMember/Summary/summary.index';

const SlideWrapper = styled.div<{ currentStep: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentStep }) => `translateX(-${currentStep * 100}%)`};
  width: 300%;
`;

const SlideContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const SlideItem = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

export default function TeamLeaderPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SlideContainer>
      <SlideWrapper currentStep={currentStep}>
        <SlideItem>
          <Join nextStep={nextStep} />
        </SlideItem>
        <SlideItem>
          <SelectTime nextStep={nextStep} prevStep={prevStep} />
        </SlideItem>
        <SlideItem>
          <Summary />
        </SlideItem>
      </SlideWrapper>
    </SlideContainer>
  );
}

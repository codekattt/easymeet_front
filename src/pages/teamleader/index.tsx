import { useState } from 'react';
import styled from '@emotion/styled';
import CreateMeeting from '../../components/units/teamLeader/CreateMeeting/createMeeting.index';
import AdditionalSettings from '../../components/units/teamLeader/AdditionalSettings/additionalSettings.index';
import Complete from '../../components/units/teamLeader/Complete/complete.index';

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
          <CreateMeeting nextStep={nextStep} />
        </SlideItem>
        <SlideItem>
          <AdditionalSettings nextStep={nextStep} prevStep={prevStep} />
        </SlideItem>
        <SlideItem>
          <Complete />
        </SlideItem>
      </SlideWrapper>
    </SlideContainer>
  );
}

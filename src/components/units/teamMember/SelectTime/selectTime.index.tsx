import TimeTable from '../../../commons/timeTable/timeTable.index';
import * as S from './selectTime.styles';

interface SelectTimeProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function SelectTime({ nextStep, prevStep }: SelectTimeProps) {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Section>
          <h2>회의정보</h2>
          <h3>
            <span>2시간 30분</span> 동안
          </h3>
          <h3>
            <span>연세대 경영관</span>에서 진행됩니다.
          </h3>
        </S.Section>
        <img
          src="/images/icon/downOutlined.png"
          alt="아래 화살표"
          style={{ marginBottom: '12px' }}
        />
        <S.H2>회의 가능한 시간을 알려주세요</S.H2>
        <S.H3>가능한 시작 시간과, 끝 시간을 클릭!</S.H3>
        <TimeTable />
        <S.ButtonWrapper>
          <S.Button onClick={nextStep}>가능 시간 제출하기</S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}

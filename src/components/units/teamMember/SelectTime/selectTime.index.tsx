import { useRouter } from 'next/router';
import { useState } from 'react';
import TimeTable from '../../../commons/timeTable/timeTable.index';
import * as S from './selectTime.styles';

export default function SelectTime() {
  const router = useRouter();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onClickButton = () => {
    router.push('/teammember?step=summary');
  };

  const handleSelectionChange = (isSelected: boolean) => {
    setIsButtonEnabled(isSelected); // 선택 상태에 따라 버튼 활성화
  };

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
        <S.Section style={{ marginBottom: '120px' }}>
          <h2>회의 가능한 시간을 알려주세요</h2>
          <h3 style={{ marginBottom: '20px' }}>
            가능한 시작 시간과, 끝 시간을 클릭!
          </h3>
          <TimeTable onSelectionChange={handleSelectionChange} />
        </S.Section>

        <S.ButtonWrapper>
          <S.Button onClick={onClickButton} disabled={!isButtonEnabled}>
            가능 시간 제출하기
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as S from './join.styles';

export default function Join() {
  const router = useRouter();
  const [name, setName] = useState('');

  const onClickButton = () => {
    router.push('/teammember?step=select');
  };

  // 이름이 입력될 때마다 상태 업데이트
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Section style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="/images/icon/calendar_icon.webp" />
          <S.InnerText>
            순식간에 정하는
            <br />
            <span>우리팀 회의 일정</span>
          </S.InnerText>
        </S.Section>
        <S.Section>
          <h2>참여자님의 이름을 적어주세요</h2>
          <h3>팀원들이 알아볼 수 있는 이름이어야 해요!</h3>
          <S.Input
            placeholder="참여자 이름"
            value={name}
            onChange={handleNameChange}
          />
        </S.Section>
        <S.ButtonWrapper>
          <S.SubButton onClick={onClickButton}>
            제출했던 시간을 수정하고 싶어요 ＞
          </S.SubButton>
          <S.Button onClick={onClickButton} disabled={!name}>
            가능한 시간 입력
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}

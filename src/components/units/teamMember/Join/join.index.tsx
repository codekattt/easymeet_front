import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../../commons/libraries/firebase'; // Firebase 초기화 파일
import * as S from './join.styles';

export default function Join() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태

  const { meetingId } = router.query;

  // 이름이 입력될 때마다 상태 업데이트
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorMessage(null); // 이름이 변경될 때마다 에러 메시지 초기화
  };

  // '제출했던 시간을 수정하고 싶어요' 버튼
  const onClickEditButton = async () => {
    if (!name) {
      setErrorMessage('* 이름을 입력해주세요');
      return;
    }

    if (!meetingId) return;

    try {
      // Firestore에서 teamMembers/{name} 문서가 존재하는지 확인
      const teamMemberRef = doc(db, `meetings/${meetingId}/teamMembers`, name);
      const docSnap = await getDoc(teamMemberRef);

      if (!docSnap.exists()) {
        setErrorMessage('* 일치하는 이름이 없습니다.');
        return;
      }

      const teamMemberData = docSnap.data();

      // 수정할 시간 선택 페이지로 이동
      router.push(`/member?step=select&meetingId=${meetingId}&name=${name}`);
    } catch (error) {
      console.error('Error checking team member: ', error);
      setErrorMessage('문서 확인 중 오류가 발생했습니다.');
    }
  };

  // '가능한 시간 입력하기' 버튼
  const onClickAddButton = async () => {
    if (!name) {
      setErrorMessage('이름을 입력해주세요');
      return;
    }

    if (!meetingId) return;

    try {
      // Firestore에서 teamMembers/{name} 문서가 존재하는지 확인
      const teamMemberRef = doc(db, `meetings/${meetingId}/teamMembers`, name);
      const docSnap = await getDoc(teamMemberRef);

      if (docSnap.exists()) {
        setErrorMessage(
          '이미 해당 이름이 존재합니다. 수정 버튼을 클릭해주세요.',
        );
        return;
      }

      // 새로운 팀원 문서 생성
      await setDoc(teamMemberRef, {
        name: name,
        joinedAt: Timestamp.now(),
        selectedTimes: [], // 초기 상태에서 선택된 시간이 없을 때
        status: 'joined',
      });

      // 시간 입력 페이지로 이동
      router.push(`/member?step=select&meetingId=${meetingId}&name=${name}`);
    } catch (error) {
      console.error('Error adding team member: ', error);
      setErrorMessage('문서 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.RowWrapper>
          <img src="/images/icons/animated/account_icon.apng" />
          <S.Title>
            빠르게 정하는 <span>우리팀 일정</span>
          </S.Title>
        </S.RowWrapper>
        <S.Section>
          <h2>참여자님의 이름을 적어주세요</h2>
          <h3>팀원들이 알아볼 수 있는 이름이어야 해요!</h3>
          <S.Input
            placeholder="참여자 이름"
            value={name}
            onChange={handleNameChange}
          />
          {/* 에러 메시지 표시 */}
          {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        </S.Section>

        <S.ButtonWrapper>
          <S.EditButton onClick={onClickEditButton}>
            제출한 시간 수정
          </S.EditButton>
          <S.Button onClick={onClickAddButton} disabled={!name}>
            가능한 시간 입력
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}

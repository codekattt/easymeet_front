import { useState } from 'react';
import { useRouter } from 'next/router';
import * as S from './complete.styles';

export default function Complete() {
  const router = useRouter();
  const { meetingId } = router.query; // URL에서 meetingId를 가져옴
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 팀원용 링크 생성
  const generateTeamMemberLink = () => {
    return `${window.location.origin}/member?step=join&meetingId=${meetingId}`;
  };

  const onClickCopyLink = async () => {
    const link = generateTeamMemberLink();
    try {
      await navigator.clipboard.writeText(link);
      setIsModalVisible(true); // 모달 표시
      setTimeout(() => {
        setIsModalVisible(false); // 3초 후 모달 자동 닫기
      }, 5000);
    } catch (err) {
      alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
      console.error('Failed to copy the link: ', err);
    }
  };

  const onClickButton = () => {
    // 팀원이 가능 시간을 입력하는 페이지로 이동
    router.push(`/member?step=join&meetingId=${meetingId}`);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Section>
          <img
            src="/images/icons/animated/complete_check_icon.apng"
            alt="check icon"
          />
          <h2>
            순식간에 회의페이지 생성 완료!
            <br />
            팀원들에게 공유해보세요
          </h2>
        </S.Section>
        <S.ButtonWrapper>
          <S.Button onClick={onClickCopyLink}>
            <div>
              <img src="/images/icons/common/LinkOutlined.svg" /> 링크복사
            </div>
          </S.Button>
          <S.Button onClick={onClickButton}>내 가능시간 입력</S.Button>
        </S.ButtonWrapper>
      </S.Container>
      {/* Ant Design 모달 */}
      <S.CustomModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null} // 기본 푸터 제거
        width={'480px'}
        centered
        closable={false} // X 버튼 제거
      >
        <S.ModalContentWrapper>
          <S.ModalTitle>링크가 복사되었습니다.</S.ModalTitle>
        </S.ModalContentWrapper>
      </S.CustomModal>
    </S.Wrapper>
  );
}

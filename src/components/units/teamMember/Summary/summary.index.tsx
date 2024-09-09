import TimeTable from '../../../commons/timeTable/timeTable.index';
import * as S from './summary.styles';

export default function Summary() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.RowWrapper>
          <img src="/images/icon/check_icon.apng" />
          <h1>가능 시간 설정 완료</h1>
        </S.RowWrapper>
        <S.Section>
          <h2>지금까지 유력한 회의 정보</h2>
          <S.RowWrapper>
            <img src="/images/icon/CalendarOutlined.png" />
            <h2>9월 24일 수요일 오후 9시</h2>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icon/ClockCircleOutlined.png" />
            <h2>1시간 30분 동안</h2>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icon/PushpinOutlined.png" />
            <h2>연세대 경영관 B501에서</h2>
          </S.RowWrapper>
        </S.Section>
        <S.Section>
          <TimeTable />
        </S.Section>
      </S.Container>
    </S.Wrapper>
  );
}

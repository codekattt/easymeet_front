import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Join from '../../components/units/teamMember/Join/join.index';
import SelectTime from '../../components/units/teamMember/SelectTime/selectTime.index';
import Summary from '../../components/units/teamMember/Summary/summary.index';

export default function TeamLeaderPage(): JSX.Element {
  const router = useRouter();
  const { step } = router.query;

  const renderStepComponent = () => {
    switch (step) {
      case 'join':
        return <Join />;
      case 'select':
        return <SelectTime />;
      case 'summary':
        return <Summary />;
      default:
        return null;
    }
  };

  const goToStep = (nextStep: string) => {
    router.push(`teammember/?step=${nextStep}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step as string}
          initial={{ opacity: 0, x: 0 }} // 초기 상태 수정: x 축 이동 없음
          animate={{ opacity: 1, x: 0 }} // 애니메이션 효과: x 축 이동 없음
          exit={{ opacity: 0, x: 0 }} // 페이지 나갈 때 효과: x 축 이동 없음
          transition={{ duration: 0.1 }} // 전환 시간
        >
          {renderStepComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

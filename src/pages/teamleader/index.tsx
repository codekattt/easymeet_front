import { useRouter } from 'next/router';
import CreateMeeting from '../../components/units/teamLeader/CreateMeeting/createMeeting.index';
import AdditionalSettings from '../../components/units/teamLeader/AdditionalSettings/additionalSettings.index';
import Complete from '../../components/units/teamLeader/Complete/complete.index';
import { AnimatePresence, motion } from 'framer-motion';

export default function TeamLeaderPage(): JSX.Element {
  const router = useRouter();
  const { step } = router.query;

  const renderStepComponent = () => {
    switch (step) {
      case 'create':
        return <CreateMeeting />;
      case 'add':
        return <AdditionalSettings />;
      case 'complete':
        return <Complete />;
      default:
        return null;
    }
  };

  const goToStep = (nextStep: string) => {
    router.push(`teamleader/?step=${nextStep}`, undefined, {
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

import { useRouter } from 'next/router';
import CreateMeeting from '../../components/units/teamLeader/CreateMeeting/createMeeting.index';
import AdditionalSettings from '../../components/units/teamLeader/AdditionalSettings/additionalSettings.index';
import Complete from '../../components/units/teamLeader/Complete/complete.index';
import { AnimatePresence, motion } from 'framer-motion';

export default function TeamLeaderPage(): JSX.Element {
  const router = useRouter();
  const { step } = router.query;

  if (!router.isReady || !step) {
    return <div>Loading...</div>;
  }

  const renderStepComponent = () => {
    switch (step) {
      case 'create':
        return <CreateMeeting />;
      case 'add':
        return <AdditionalSettings />;
      case 'complete':
        return <Complete />;
      default:
        return <div>잘못된 경로입니다.</div>;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step as string}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.1 }}
        >
          {renderStepComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  const { step } = query;

  if (!step) {
    return {
      redirect: {
        destination: '/teamleader?step=create',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

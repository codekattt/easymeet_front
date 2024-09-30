import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Join from '../../components/units/teamMember/Join/join.index';
import SelectTime from '../../components/units/teamMember/SelectTime/selectTime.index';
import Summary from '../../components/units/teamMember/Summary/summary.index';

export default function TeamMemberPage(): JSX.Element {
  const router = useRouter();
  const { step } = router.query;

  if (!router.isReady || !step) {
    return <div>Loading...</div>;
  }

  const renderStepComponent = () => {
    switch (step) {
      case 'join':
        return <Join />;
      case 'select':
        return <SelectTime />;
      case 'summary':
        return <Summary />;
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
        destination: '/teammember?step=join',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

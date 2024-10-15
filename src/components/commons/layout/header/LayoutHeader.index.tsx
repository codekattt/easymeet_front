import { useRouter } from 'next/router';
import * as S from './LayoutHeader.styles';

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  // const onClickLogo = () => {
  //   const currentPath = router.pathname;

  //   if (currentPath.startsWith('/leader')) {
  //     router.push('/leader?step=create');
  //   } else if (currentPath.startsWith('/member')) {
  //     router.push('/member?step=join');
  //   }
  // };

  return (
    <>
      <S.Wrapper>
        <S.InnerWrapper>
          <S.InnerLogo>
            <img src="/images/logos/easymeet_logo.png" />
          </S.InnerLogo>
        </S.InnerWrapper>
      </S.Wrapper>
    </>
  );
}

import styled from '@emotion/styled';
import LayoutHeader from './header/LayoutHeader.index';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <Body>{props.children}</Body>
    </>
  );
}

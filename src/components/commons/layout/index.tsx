import styled from '@emotion/styled';
import LayoutHeader from './header/LayoutHeader.index';
import LayoutFooter from './footer/LayoutFooter.index';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <Body>{props.children}</Body>
      {/* <LayoutFooter /> */}
    </>
  );
}

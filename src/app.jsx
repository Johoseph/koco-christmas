import { h } from "preact";
import { setup, styled } from "goober";
import { Koco } from "./Koco";

const Background = styled("div")`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

setup(h);

export const App = () => {
  return (
    <Background>
      <Koco />
    </Background>
  );
};

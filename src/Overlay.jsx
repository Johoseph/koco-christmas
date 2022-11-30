import { styled } from "goober";

const Wrapper = styled("div")`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isOpaque ? 0 : 1)};

  transition: opacity 1000ms;
`;

const TextWrap = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 20px;
`;

const Heading = styled("h1")`
  font-size: 100px;
  font-weight: bold;
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
`;

const Text = styled("span")`
  font-size: 30px;
  color: #333;
`;

export const Overlay = ({ showOverlay }) => {
  return (
    <Wrapper isOpaque={!showOverlay}>
      <TextWrap>
        <Heading>🎅 Advent 2022 🎄</Heading>
        <Text>Use the arrow keys to get started...</Text>
      </TextWrap>
    </Wrapper>
  );
};

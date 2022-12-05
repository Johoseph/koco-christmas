import { useMemo } from "preact/hooks";
import { styled } from "goober";

const Wrapper = styled("div")`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isOpaque ? 1 : 0)};

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
  max-width: 80vw;
`;

const HeadingWrap = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 1000px) {
    font-size: 70px;
  }

  @media (max-width: 600px) {
    font-size: 50px;
  }
`;

const Heading = styled("h1")`
  color: #333;
  font-size: inherit;
  text-align: center;
  margin: 10px;
  margin-bottom: 0px;

  @media (max-width: 800px) {
    width: min-content;
  }
`;

const Text = styled("span")`
  font-size: 30px;
  color: #333;

  @media (max-width: 1000px) {
    font-size: 24px;
  }

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Overlay = ({ showOverlay }) => {
  const isTouchEnabled = useMemo(() => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return (
    <Wrapper isOpaque={showOverlay}>
      <TextWrap>
        <HeadingWrap>
          <span>🎅</span>
          <Heading>Advent 2022</Heading>
          <span>🎄</span>
        </HeadingWrap>
        <Text>
          {isTouchEnabled
            ? "Swipe to get started..."
            : "Use the arrow keys to get started..."}
        </Text>
      </TextWrap>
    </Wrapper>
  );
};

import { h } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { setup, styled } from "goober";
import { DateChecker } from "./DateChecker";
import { Overlay } from "./Overlay";

const Background = styled("div")`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Container = styled("div")`
  width: 100%;
  height: 100%;
`;

setup(h);

const OFFSET_DIVISOR = 60;

export const App = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const transformRef = useRef();

  const handleMouseMove = useCallback((event) => {
    const pageMiddle = {
      width: document.body.clientWidth / 2,
      height: document.body.clientHeight / 2,
    };

    const translateOffset = {
      left: (pageMiddle.width - event.clientX) / OFFSET_DIVISOR,
      top: (pageMiddle.height - event.clientY) / OFFSET_DIVISOR,
    };

    if (transformRef.current.base)
      transformRef.current.base.style.transform = `translate(${translateOffset.left}px, ${translateOffset.top}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Background>
      <Container ref={transformRef}>
        <DateChecker setShowOverlay={setShowOverlay} />
      </Container>
      <Overlay showOverlay={showOverlay} />
    </Background>
  );
};

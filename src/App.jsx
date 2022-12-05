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
  touch-action: pan-y !important;
`;

const Container = styled("div")`
  width: 100%;
  height: 100%;
`;

setup(h);

const OFFSET_DIVISOR = 60;
const GRYO_DIVISOR_HORIZONTAL = 4;
const GRYO_DIVISOR_VERTICAL = 2;

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

  const handlePhoneRotate = useCallback((event) => {
    const gyroMiddle = {
      gamma: 0,
      beta: 90,
    };

    console.log({ beta: event.beta, gamma: event.gamma });

    const translateOffset = {
      left: gyroMiddle.gamma + event.gamma, //  / GRYO_DIVISOR_HORIZONTAL,
      top: gyroMiddle.beta - event.beta, // / GRYO_DIVISOR_VERTICAL,
    };

    if (transformRef.current.base)
      transformRef.current.base.style.transform = `translate(${translateOffset.left}px, ${translateOffset.top}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handlePhoneRotate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handlePhoneRotate);
    };
  }, []);

  return (
    <Background>
      <Container ref={transformRef}>
        <DateChecker setShowOverlay={setShowOverlay} />
      </Container>
      <div id="currentDay" />
      <Overlay showOverlay={showOverlay} />
    </Background>
  );
};

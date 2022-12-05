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
const GRYO_DIVISOR_HORIZONTAL = 20;
const GRYO_DIVISOR_VERTICAL = 40;

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
      alpha: 0,
      beta: 90,
    };

    const translateOffset = {
      left:
        (gyroMiddle.alpha + Math.max(Math.min(event.alpha, 90), -90)) /
        GRYO_DIVISOR_HORIZONTAL,
      top:
        (gyroMiddle.beta - Math.max(Math.min(event.beta, 180), 0)) /
        GRYO_DIVISOR_VERTICAL,
    };

    console.log(translateOffset);

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

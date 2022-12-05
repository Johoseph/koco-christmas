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

    const currentTranslate = {
      left: 0,
      top: 0,
    };

    // Get current transform
    if (transformRef.current.base) {
      const transformArray = transformRef.current.base.style.transform
        .replace("translate(", "")
        .replace(")", "")
        .split(", ")
        .map((num) => parseInt(num.replace("px", ""), 10));

      currentTranslate.left = transformArray[0];
      currentTranslate.top = transformArray[1];
    }

    const translate = {
      left: gyroMiddle.gamma + event.gamma,
      top: gyroMiddle.beta - event.beta,
    };

    // Don't update transform for large jumps
    if (Math.abs(translate.left - currentTranslate.left) > 8)
      translate.left = currentTranslate.left;
    if (Math.abs(translate.top - currentTranslate.top) > 8)
      translate.top = currentTranslate.top;

    if (transformRef.current.base)
      transformRef.current.base.style.transform = `translate(${translate.left}px, ${translate.top}px)`;
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

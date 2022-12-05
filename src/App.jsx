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

    const currentTransform = {
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

      currentTransform.left = transformArray[0];
      currentTransform.top = transformArray[1];
    }

    const translateOffset = {
      left: gyroMiddle.gamma + event.gamma,
      top: gyroMiddle.beta - event.beta,
    };

    // Don't update transform for large jumps
    if (Math.abs(translateOffset.left - currentTransform.left) > 50)
      translateOffset.left = currentTransform.left;
    if (Math.abs(translateOffset.top - currentTransform.top) > 50)
      translateOffset.top = currentTransform.top;

    if (transformRef.current.base)
      transformRef.current.base.style.transform = `translate(${translateOffset.left}px, 0px)`;
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

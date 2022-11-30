import { h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
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

const OFFSET_DIVISOR = 60;

export const App = () => {
  const [kocoOffset, setKocoOffset] = useState({ left: 0, top: 0 });

  const handleMouseMove = useCallback((event) => {
    const pageMiddle = {
      width: document.body.clientWidth / 2,
      height: document.body.clientHeight / 2,
    };

    const translateOffset = {
      left: (pageMiddle.width - event.clientX) / OFFSET_DIVISOR,
      top: (pageMiddle.height - event.clientY) / OFFSET_DIVISOR,
    };

    setKocoOffset(translateOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Background>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translate(${kocoOffset.left}px, ${kocoOffset.top}px)`,
        }}
      >
        <Koco />
      </div>
    </Background>
  );
};

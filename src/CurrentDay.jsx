import { styled } from "goober";

const Wrapper = styled("div")`
  position: fixed;
  top: 60px;
  left: 115px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 9999px;
  background: ${(props) => props.backgroundColor};

  ${(props) => props.isHidden && `display: none;`}

  transition: background 300ms;

  @media (max-width: 600px) {
    top: 40px;
    left: 50vw;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    padding: 16px;
  }
`;

const Text = styled("div")`
  font-size: 30px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Day = styled("div")`
  font-size: 50px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const getBackgroundColor = (day) => {
  const val = day % 3;

  if (val === 2) return "#b5c759";
  if (val === 1) return "#0f577d";
  return "#3c4c4d";
};

export const CurrentDay = ({ viewDay }) => {
  return (
    <Wrapper
      isHidden={viewDay === 0}
      backgroundColor={getBackgroundColor(viewDay)}
    >
      <Text>Day</Text>
      <Day>{viewDay}</Day>
    </Wrapper>
  );
};

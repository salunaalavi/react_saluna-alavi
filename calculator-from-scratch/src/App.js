import Container from "./components/Container.js";
import Screen from "./components/Screen.js";
import ButtonWrapper from "./components/ButtonWrapper.js";
import Button from "./components/Button.js";
import "./App.css";

import { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const removeSpaces = (num) => num.toString().replace(/\./g, "");

function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? Number(removeSpaces(calc.num + value)).toLocaleString("de-DE")
            : (calc.num + value).toLocaleString("de-DE"),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = (e) => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Syntax Error"
            : math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              ).toLocaleString("de-DE"),
        sign: "",
        num: 0,
      });
    }
  };

  const percentClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const invertClickHandler = (e) => {
    setCalc({
      ...calc,
      num: calc.num ? (removeSpaces(calc.num) * -1).toLocaleString("de-DE") : 0,
      res: calc.res ? (removeSpaces(calc.res) * -1).toLocaleString("de-DE") : 0,
    });
  };

  const resetClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Container>
      <Screen value={calc.num ? calc.num : calc.res}></Screen>
      <ButtonWrapper>
        {btnValues.map((array) => {
          return array.map((value, i) => {
            return (
              <Button
                key={i}
                value={value}
                onClick={
                  value === "C"
                    ? resetClickHandler
                    : value === "+-"
                    ? invertClickHandler
                    : value === "%"
                    ? percentClickHandler
                    : value === "="
                    ? equalsClickHandler
                    : value === "/" ||
                      value === "X" ||
                      value === "-" ||
                      value === "+"
                    ? signClickHandler
                    : value === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          });
        })}
      </ButtonWrapper>
    </Container>
  );
}

export default App;

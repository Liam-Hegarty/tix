import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import colors from "../Palette";
import { Box } from "@mui/material";

const Button = ({
  text,
  onClick,
  highlighted,
  setHighlighted,
}: {
  text: string;
  onClick?: () => void | undefined;
  highlighted: string;
  setHighlighted: () => void;
}) => {
  const isHighlighted = text === highlighted;

  const bgColor = isHighlighted ? colors.darkBlue : colors.lightBlue;
  const fgColor = isHighlighted ? colors.lightBlue : colors.darkBlue;

  return (
    <Box
      className="pixel-border"
      sx={{
        backgroundColor: bgColor,
        width: "30vw",
        padding: "10px",
        margin: "10px",
        justifyContent: "center",
        display: "flex",
        color: fgColor,
        boxShadow: `-4px 0 0 0 ${fgColor}, 4px 0 0 0 ${fgColor},  0 -4px 0 0 ${fgColor}, 0 4px 0 0 ${fgColor};`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHighlighted()}
    >
      {text}
    </Box>
  );
};

export const Menu = ({
  buttons,
}: {
  buttons: Array<{ text: string; action: () => void }>;
}) => {
  const [highlighted, setHighlighted] = useState<number>(0);
  const buttonRef = useRef(0);
  buttonRef.current = highlighted;

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          setHighlighted(
            (buttonRef.current + (buttons.length - 1)) % buttons.length
          );
          break;
        case "s":
        case "ArrowDown":
          setHighlighted((buttonRef.current + 1) % buttons.length);
          break;
        case " ":
        case "Enter":
          buttons[buttonRef.current].action();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [buttonRef, setHighlighted]);

  return (
    <>
      {buttons.map((b, i) => (
        <Button
          key={`mmb-${b.text}`}
          text={b.text}
          onClick={b.action}
          highlighted={buttons[highlighted].text}
          setHighlighted={() => setHighlighted(i)}
        />
      ))}
    </>
  );
};

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import colors from "../Palette";

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

export const MainMenu = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const buttons = [
    { text: "Start Game", action: () => setStage("game") },
    { text: "Load Game", action: () => {} },
    { text: "Options Game", action: () => {} },
    { text: "Exit", action: () => window.close() },
  ];

  const [highlighted, setHighlighted] = useState<number>(0);
  const buttonRef = useRef(0);
  buttonRef.current = highlighted;

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        color: colors.darkBlue,
      }}
    >
      <Box
        sx={{
          padding: "50px",
          fontSize: "50px",
        }}
      >
        Tix
      </Box>
      {buttons.map((b, i) => (
        <Button
          text={b.text}
          onClick={b.action}
          highlighted={buttons[highlighted].text}
          setHighlighted={() => setHighlighted(i)}
        />
      ))}
    </Box>
  );
};

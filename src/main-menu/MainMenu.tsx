import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import colors from "../Palette";
import { Menu } from "./Menu";

export const MainMenu = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const [highlighted, setHighlighted] = useState<number>(0);
  const buttonRef = useRef(0);
  buttonRef.current = highlighted;

  const buttons = [
    { text: "Start Game", action: () => setStage("game") },
    { text: "Load Game", action: () => {} },
    { text: "Credits", action: () => setStage("credits") },
    { text: "Options", action: () => {} },
    { text: "Exit", action: () => window.close() },
  ];

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
      <Menu {...{ buttons, highlighted, setHighlighted }} />
    </Box>
  );
};

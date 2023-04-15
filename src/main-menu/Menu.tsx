import React, { Dispatch, SetStateAction } from "react";
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
  highlighted,
  setHighlighted,
}: {
  buttons: Array<{ text: string; action: () => void }>;
  highlighted: number;
  setHighlighted: Dispatch<SetStateAction<number>>;
}) => {
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

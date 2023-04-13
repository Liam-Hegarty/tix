import { Text } from "@pixi/react"
import React, { useEffect } from "react"

export const Ticker = ({ rhythm }: { rhythm: Array<{ tock: boolean, time: number }> }) => {

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    const intervals: NodeJS.Timer[]  = []
    const loopLength = rhythm.map(b => b.time).reduce((a, b) => a + b, 0)
    var loopTime = 0

    rhythm.forEach(beat => {
      timeouts.push(setTimeout(() => {
        intervals.push(setInterval(() => {
          if (beat.tock) {
            new Audio(`${process.env.PUBLIC_URL}/audio/tock.mp3`).play()
          } else {
            new Audio(`${process.env.PUBLIC_URL}/audio/tick.mp3`).play()
          }
        }, loopLength))
      }, loopTime));
      loopTime += beat.time;
    })

    return () => {
      intervals.forEach(i => clearInterval(i));
      timeouts.forEach(t => clearTimeout(t))
    }
  }, rhythm)

  return (
    <Text 
      text="ticker"
      anchor={1}
      x={window.innerWidth}
      y={window.innerHeight}
    />
  )

}
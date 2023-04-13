import React, { useState } from "react";
import { SplashScreens } from "./SplashScreens";

function App() {
  const [splashScreen, setSplashScreen] = useState<string | undefined>("cool");

  if (splashScreen) {
    return <SplashScreens {...{ splashScreen, setSplashScreen }} />;
  } else {
    return <>Menu</>;
  }
}

export default App;

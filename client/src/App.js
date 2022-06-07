import * as React from "react";
import { VechaiProvider, Button } from "@vechaiui/react";

function App() {
  return (
    <VechaiProvider>
      <Button>Hello Vechai</Button>
    </VechaiProvider>
  );
}

export default App;

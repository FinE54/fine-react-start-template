import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <StrictMode>
      <div>Basic React Template by FinE54</div>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

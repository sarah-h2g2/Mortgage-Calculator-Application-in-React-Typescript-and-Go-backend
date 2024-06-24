import { ErrorBoundary } from "react-error-boundary";
import Calculator from "./components/Calculator";
import "./App.css";

function App() {
  return (
    <main>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Calculator />
      </ErrorBoundary>
    </main>
  );
}

export default App;

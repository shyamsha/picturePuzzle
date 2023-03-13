import GameScreen from "./screens/GameScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import FoundationLayout from "./components/layout/FoundationLayout";

function App() {
  return (
    <FoundationLayout>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* default URL */}
      </Routes>
    </FoundationLayout>
  );
}

export default App;

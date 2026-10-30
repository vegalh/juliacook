import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { ActivityDetail } from "./pages/ActivityDetail";
import { Home } from "./pages/Home";
import { Learn } from "./pages/Learn";
import { Library } from "./pages/Library";
import { Practice } from "./pages/Practice";
import { Profile } from "./pages/Profile";
import { ResourceDetailPage } from "./pages/ResourceDetailPage";
import { SavedPage } from "./pages/SavedPage";
import { SituationPage } from "./pages/SituationPage";

/** Preserves the old `/moment/:topic` deep links by forwarding to the new route. */
function RedirectToSituation() {
  const { topic = "" } = useParams();
  return <Navigate to={`/situation/${topic}`} replace />;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:id" element={<ActivityDetail />} />
          <Route path="/situation/:topic" element={<SituationPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* Backward-compatible redirects from the previous route names. */}
          <Route path="/moment/:topic" element={<RedirectToSituation />} />
          <Route path="/moment/:topic/resources" element={<RedirectToSituation />} />
          <Route path="/explore" element={<Navigate to="/library" replace />} />
          <Route path="/explore/results" element={<Navigate to="/library" replace />} />
          <Route path="/more" element={<Navigate to="/profile" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;

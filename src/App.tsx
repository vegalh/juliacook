import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { ActivityDetail } from "./pages/ActivityDetail";
import { Activities } from "./pages/Activities";
import { BookDetail } from "./pages/BookDetail";
import { Discover } from "./pages/Discover";
import { Home } from "./pages/Home";
import { LanguageLab } from "./pages/LanguageLab";
import { MySpace } from "./pages/MySpace";
import { ResourceDetailPage } from "./pages/ResourceDetailPage";
import { SituationPage } from "./pages/SituationPage";

/** Preserves the old `/moment/:topic` deep links by forwarding to the new route. */
function RedirectToSituation() {
  const { topic = "" } = useParams();
  return <Navigate to={`/situation/${topic}`} replace />;
}

/** Preserves old `/practice/:id` activity-detail links by forwarding to the new route. */
function RedirectToActivity() {
  const { id = "" } = useParams();
  return <Navigate to={`/activities/${id}`} replace />;
}

/** Forwards to a new path while preserving the current query string (e.g. shared/bookmarked `?q=` search links). */
function RedirectPreservingQuery({ to }: { to: string }) {
  const { search } = useLocation();
  return <Navigate to={`${to}${search}`} replace />;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/situation/:topic" element={<SituationPage />} />
          <Route path="/language-lab" element={<LanguageLab />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/my" element={<MySpace />} />

          {/* Backward-compatible redirects from previous route names/IA. */}
          <Route path="/moment/:topic" element={<RedirectToSituation />} />
          <Route path="/moment/:topic/resources" element={<RedirectToSituation />} />
          <Route path="/practice" element={<Navigate to="/activities" replace />} />
          <Route path="/practice/:id" element={<RedirectToActivity />} />
          <Route path="/learn" element={<Navigate to="/discover?mode=topics" replace />} />
          <Route path="/library" element={<RedirectPreservingQuery to="/discover" />} />
          <Route path="/explore" element={<Navigate to="/discover" replace />} />
          <Route path="/explore/results" element={<Navigate to="/discover" replace />} />
          <Route path="/saved" element={<Navigate to="/my?tab=saved" replace />} />
          <Route path="/profile" element={<Navigate to="/my" replace />} />
          <Route path="/more" element={<Navigate to="/my" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;

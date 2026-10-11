import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { Explore } from "./pages/Explore";
import { ExploreAndPractice } from "./pages/ExploreAndPractice";
import { Home } from "./pages/Home";
import { MorePage } from "./pages/MorePage";
import { ParentingMoment } from "./pages/ParentingMoment";
import { ResourceDetailPage } from "./pages/ResourceDetailPage";
import { SavedPage } from "./pages/SavedPage";
import { SearchResults } from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moment/:topic" element={<ParentingMoment />} />
          <Route path="/moment/:topic/resources" element={<ExploreAndPractice />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/results" element={<SearchResults />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;

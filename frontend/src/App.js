import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.scss";
import ProtectedRoute from "./services/ProtectedRoute";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import DashboardLayout from "./dashboardLayout.js";
import {
  About,
  Categories,
  CategoriesDetails,
  Contact,
  Dashboard,
  Featured,
  Home,
  Latest,
  Login,
  NotFound,
  Register,
  SearchArticles,
  SingleArticle,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/account/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />

            <Route path="/not-found" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchArticles />} />
            <Route path="/article-detail/:id" element={<SingleArticle />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories/:slug" element={<CategoriesDetails />} />
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

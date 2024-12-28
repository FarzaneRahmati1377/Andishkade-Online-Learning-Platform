import HomePage from "./pages/homePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { CoursesProvider } from "./context/CoursesContext";
import CoursesPage from "./pages/coursesPage/CoursesPage";
import { CategoriesProvider } from "./context/CategoryContext";
import CourseDetailsPage from "./pages/courseDetailsPage/CourseDetailsPage";
import { TeachersProvider } from "./context/TeachersContext";
import TeachersPage from "./pages/teachersPage/TachersPage";
import AboutTeacherPage from "./pages/aboutTeacherPage/AboutTeacherPage";
import { BlogsProvider } from "./context/BlogsContext";
import BlogsPage from "./pages/blogsPage/BlogsPage";
import BlogDetailsPage from "./pages/blogDetailsPage/BlogDetailsPage";
import MemberShipPage from "./pages/memberShipPage/MemberShipPage";
import { LoginProvider } from "./context/LoginContext";
import MyAccountPage from "./pages/myAccountPage/MyAccountPage";
import ShoppingCartPage from "./pages/shoppingCartPage/ShoppingCartPage";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import AboutUsPage from "./pages/aboutUsPage/AboutUsPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import PrivateRouteMyAccountPage from "./components/privateRouteMyAccountPage/PrivateRouteMyAccountPage";
import PrivateRouteMemberShipPage from "./components/privateRouteMemberShipPage/PrivateRouteMemberShipPage";

function App() {
  return (
    <CategoriesProvider>
      <CoursesProvider>
        <TeachersProvider>
          <BlogsProvider>
            <LoginProvider>
              <ShoppingCartProvider>
                <Layout>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route
                      path="/courses/:en_title"
                      element={<CoursesPage />}
                    />
                    <Route
                      path="/courses/course/:courseInfo"
                      element={<CourseDetailsPage />}
                    />
                    <Route path="/teachers" element={<TeachersPage />} />
                    <Route
                      path="/teachers/teacher/:teacherInfo"
                      element={<AboutTeacherPage />}
                    />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:blogInfo" element={<BlogDetailsPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route element={<PrivateRouteMemberShipPage />}>
                      <Route path="/member-ship" element={<MemberShipPage />} />
                    </Route>

                    <Route element={<PrivateRouteMyAccountPage />}>
                      <Route path="/my-account/*" element={<MyAccountPage />} />
                    </Route>
                    <Route
                      path="/shopping-cart"
                      element={<ShoppingCartPage />}
                    />
                  </Routes>
                </Layout>
              </ShoppingCartProvider>
            </LoginProvider>
          </BlogsProvider>
        </TeachersProvider>
      </CoursesProvider>
    </CategoriesProvider>
  );
}

export default App;

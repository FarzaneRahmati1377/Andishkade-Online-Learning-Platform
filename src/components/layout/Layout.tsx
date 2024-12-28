import Footer from "../Footer/Footer";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "../scrollToTop/ScrollToTop";

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Navbar />
      <div className="flex-1 pb-10  ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

import { Link } from "react-router-dom";
import Container from "../container/Container";
import Tooltip from "../tooltip/Tooltip";

const Navbar = () => {
  return (
    <div className="h-14 flex bg-white text-sm relative md:sticky md:z-10 top-0 right-0 left-0  shadow-sm">
      <Container>
        <ul className="flex text-sm md:text-base text-gray-500 items-center justify-around  md:justify-start md:gap-12 h-full ">
          <li className="h-full ">
            <Tooltip />
          </li>
          <li className="shrink-0">
            <Link to={"/"}>خانه</Link>
          </li>
          <li className="shrink-0">
            <Link to={"/courses"}>دوره ها</Link>
          </li>
          <li className="shrink-0">
            <Link to={"/teachers"}>اساتید</Link>
          </li>

          <li className="shrink-0">
            <Link to={"/about-us"}>درباره ما</Link>
          </li>
          <li className="shrink-0">
            <Link to={"/blogs"}>بلاگ</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;

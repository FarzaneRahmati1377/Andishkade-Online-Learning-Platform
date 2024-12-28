import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoriesContext } from "../../context/CategoryContext";
import AppsIcon from "@mui/icons-material/Apps";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ISubCategory } from "../../types/server";

const Tooltip = () => {
  const { categories } = useCategoriesContext();
  const { subCategories } = useCategoriesContext();
  const [activeSubCategories, setActiveSubCategories] = useState<
    ISubCategory[]
  >([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (activeSubCategories.length === 0) {
      setIsSubCategoryVisible(false);
    } else {
      setIsSubCategoryVisible(true);
    }
  }, [activeSubCategories]);

  const handleCategoryHover = (categoryId: number) => {
    setIsHoveredCategory(categoryId);
    const filteredSubCategories = subCategories.filter(
      (subCategory) => subCategory.categoryId == categoryId
    );
    setActiveSubCategories(filteredSubCategories);

    if (filteredSubCategories.length > 0) {
      setIsSubCategoryVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setActiveSubCategories([]);
    setIsSubCategoryVisible(false);
    setIsTooltipVisible(false);
    setIsHoveredCategory(null);
  };

  return (
    <div className="relative h-full flex items-center"   onMouseLeave={handleMouseLeave}>
    
      <button
        className="flex items-center gap-1 cursor-pointer"
        onMouseEnter={() => setIsTooltipVisible(true)}
      
      >
        <AppsIcon />
        <span className="shrink-0">دسته بندی</span>
      </button>
       <div
        className={`bg-white z-10 shadow-lg border rounded-lg overflow-hidden absolute top-[70px]  transition-opacity duration-700 ease-in-out ${
          isTooltipVisible ? " opacity-100" : " opacity-0 "
        }  origin-top-right  `}
        onMouseLeave={handleMouseLeave}
        style={{
         minWidth:"250px",
         maxWidth:"500px",
          height: isTooltipVisible ? "500px" : "0", 
          transition: "height 0.3s ease-in-out, opacity 0.3s ease-in-out",
          
        }}
      >
        
 
        <div
          id="child"
          className={` flex gap-1 py-2 transition-all duration-700 ease-in-out
           `}
          style={{
            width: isSubCategoryVisible ? "500px" : "250px",
            minWidth: "250px",
            maxWidth: "500px",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <ul className=" w-[250px] shrink-0 h-[500px]  px-1  ">
            {categories?.map((category) => (
              <Link
                key={category.id}
                to={`/courses/${category.enTitle}`}
                onClick={handleMouseLeave}
              >
                <li
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  className="h-10 rounded px-2  w-full hover:bg-blue-50 hover:text-blue-500 mb-2 flex justify-between pr-2 items-center cursor-pointer"
                >
                  <div className="flex gap-3 w-full items-center">
                    <img src={category.icon} alt={category.title} />
                    <span>{category.title}</span>
                  </div>

                  <ChevronLeftIcon
                    fontSize="small"
                    className={`transition-colors ${
                      isHoveredCategory === category.id
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                </li>
              </Link>
            ))}
          </ul>

          {activeSubCategories.length > 0 && (
            <div className="w-[250px] overflow-hidden  border-r-2 px-2">
              <ul className="">
                {activeSubCategories.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    to={`/courses/${subCategory.enTitle}`}
                    onClick={handleMouseLeave}
                  >
                    <li className="h-10 flex rounded hover:bg-blue-50 hover:text-blue-500 w-full mb-2 pr-2 items-center cursor-pointer">
                      <span className="shrink-0">{subCategory.title}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;

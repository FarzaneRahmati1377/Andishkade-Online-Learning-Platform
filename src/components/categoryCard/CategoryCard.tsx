import { ICategory } from "../../types/server";
const CategoryCard = ({ image, title}: ICategory) => {
  return (
    <div className="flex flex-col items-center  h-56 mx-2 gap-2 border bg-white border-gray-300 shadow rounded p-3 hover:shadow-md ">
      <div className=" w-full h-40 rounded overflow-hidden">
        <img
          src={image}
          className="w-full h-40 rounded transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>

      <h3 >{title}</h3>
    </div>
  );
};

export default CategoryCard;

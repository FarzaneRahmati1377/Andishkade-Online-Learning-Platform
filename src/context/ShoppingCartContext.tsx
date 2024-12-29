import { createContext, useContext, useEffect, useState } from "react";
import { ICourse, IId } from "../types/server";
import {
  client,
  getCoursesById,

} from "../services/api";

interface IShoppingCartContextProvider {
  children: React.ReactNode;
}

interface IShoppingCartContext {
  shoppingCartItems: ICourse[];
  shoppingCartItemsId:IId[];
  shoppingCartItemsLength: number;
  registeredCourses: ICourse[];
  registeredCoursesId:IId[];
  registeredCoursesLength: number;
  addCourseIdToShoppingCart: (id: string) => Promise<void>;
  addRegisteredCourseId : (id:string) => Promise<void>;
  deleteShoppingCartItem: (id:string) =>  Promise<void>;
}

export const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({
  children,
}: IShoppingCartContextProvider) {
  const [shoppingCartItems, setShoppingCartItems] = useState<ICourse[]>([]);
  const [shoppingCartItemsId, setShoppingCartItemsId] = useState<IId[]>([]);
  const [registeredCoursesId, setRegisteredCoursesId] = useState<IId[]>([]);
  const [registeredCourses, setRegisteredCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    getShoppingCartItemsId();
    getRegisteredCoursesId();
  },[]);
    

  useEffect(() => {
    getCoursesById(shoppingCartItemsId).then((result) => {
      setShoppingCartItems(result);
    });
  }, [shoppingCartItemsId]);

  useEffect(() => {
    getCoursesById(registeredCoursesId).then((result) => {
      setRegisteredCourses(result);
    });
  }, [registeredCoursesId]);

  const getShoppingCartItemsId = async () => {
    try {
      const { data } = await client("/shoppingCartItemsId");

      setShoppingCartItemsId(data);
    } catch (error) {
      console.error("Failed to fetch shoppingCartItemsId: ",error);
      throw new Error('Error fetching shoppingCartItemsId');
    }
  };
  const getRegisteredCoursesId = async () => {
    try {
      const {data} = await client(`/registeredCoursesId`);
      setRegisteredCoursesId(data)
    } catch (error) {
      console.error("Failed to fetch registeredCourseId: ",error);
      throw new Error('Error fetching registeredCourseId');
    }
  }

  const addCourseIdToShoppingCart = async (id: string) => {
    try {
      await client.post("/shoppingCartItemsId", { id });
      await getShoppingCartItemsId();
    } catch (error) {
      console.error("Error AddCourse To ShoppingCart:", error);
      throw new Error("Error AddCourse To ShoppingCart");
    }
  };

  const addRegisteredCourseId = async (id: string) => {
    try {
      await client.post('/registeredCoursesId', { id });
      await getRegisteredCoursesId();
    } catch (error) {
      console.error('Error registered in course:', error);
      throw new Error("Error registered in course");
    }
  }

   const deleteShoppingCartItem = async (id:string) => {
    try{
      await client.delete(`/shoppingCartItemsId/${id}`);
      await getShoppingCartItemsId();
  
    } catch (error) {
      console.error('Error deleting shoppingCartItem:', error);
      throw new Error("Error deleting shoppingCartItem");
    }
   
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartItems,
        shoppingCartItemsId,
        shoppingCartItemsLength: shoppingCartItems.length,
        registeredCourses,
        registeredCoursesId,
        registeredCoursesLength: registeredCourses.length,
        addCourseIdToShoppingCart,
        addRegisteredCourseId,
        deleteShoppingCartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

import axios from "axios";
import { IUser, IId, ICurriculumInfo, IVideo, ITeacher } from "../types/server";

export const client = axios.create({
     baseURL:'http://localhost:3000',
     
});

export async function getCategories(){
  try{
    const {data} = await client('/categories');
    return data;
  }catch(error){
    console.error('Failed to fetch categories:', error);
    throw new Error('Error fetching categories');
  }
}

export async function getSubCategories(){
  try{
  const {data} = await client('/subCategories');
  return data;
  }catch(error){
    console.error('Failed to fetch subCategories:', error);
    throw new Error('Error fetching subCategories');
  } 
 
}

export async function getSubCategory(id:number | string){
  try{
    const {data} = await client(`/subCategories/?id=${id}`);
    return data[0];

  }catch(error){
    console.error('Failed to fetch subCategory:', error);
    throw new Error('Error fetching subCategory');
  }
 
}

export async function getCourses(){
  try{
    const {data} = await client('/courses');
    return data;
  }catch(error){
    console.error('Failed to fetch courses:', error);
    throw new Error('Error fetching courses');
  }
 
}

export async function getCoursesBySubCategoryId(subCategoryId:number|string){
  try{
    const {data} = await client(`/courses?subCategoryId=${subCategoryId}`);
    return data;

  }catch(error){
    console.error('Failed to fetch courses by subCategoryId:', error);
    throw new Error('Error fetching courses by subCategoryId');
  }
 
}
export async function getCoursesByCategoryId(categoryId:number|string){
  try{
    const {data} = await client(`/courses?categoryId=${categoryId}`);
    return data;

  }catch(error){
    console.error('Failed to fetch courses by categoryId:', error);
    throw new Error('Error fetching courses by categoryId');
  }
  
}

export async function getCourse(id:number | string) {
  try{
    const {data} = await client(`/courses/?id=${id}`);
    return data[0];

  }catch(error){
    console.error('Failed to fetch course:', error);
    throw new Error('Error fetching course');
  }

} 

export async function getCurriculum(courseId:number | string) {
  try{
    const {data} = await client(`/curriculum/?courseId=${courseId}`);
    return data[0];

  }catch(error){
    console.error('Failed to fetch curriculum:', error);
    throw new Error('Error fetching curriculum');
  }
  
} 
export async function getTeachers() {
  try{
    const {data} = await client(`/teachers`);
    return data;

  }catch(error){
    console.error('Failed to fetch teachers:', error);
    throw new Error('Error fetching teachers');
  }
 
} 

export async function getTeacher(teacherId:number | string) {
  try{
    const {data} = await client(`/teachers/?id=${teacherId}`);
    return data;

  }catch(error){
    console.error('Failed to fetch teacher:', error);
    throw new Error('Error fetching teacher');
  }
 
} 

export async function getPopularTeachers() {
  try{
    const teachers:ITeacher[] = await getTeachers();
    const popularTeachers = teachers.filter(teacher => teacher.rating > 4);
    return popularTeachers;
  }catch(error){
    console.error("Failed to fetch popularTeachers : ",error);
    throw new Error('Error fetching popularTeachers');
  }
  
}

export async function getTeacherByCourseId(courseId:number | string) {
  try{
    const result = await client(`/courses/?id=${courseId}`);
    const {data} = await client(`/teachers/?id=${result.data[0].teacherId}`);
    return data[0];

  }catch(error){
    console.error("Failed to fetch teacher by courseId : ",error);
    throw new Error('Error fetching teacher by courseId ');
  }
  
}

export async function getGeneralQuestions() {
  try{
    const {data} = await client(`/generalQuestions`);
    return data;

  }catch(error){
    console.error("Failed to fetch generalQuestions : ",error);
    throw new Error('Error fetching generalQuestions');

  }
 
}

export async function getBlogs() {
  try{
    const {data} = await client(`/blogs`);
    return data;

  }catch(error){
    console.error("Failed to fetch blogs: ",error);
    throw new Error('Error fetching blogs');
  }
 
}

export async function getBlog(id:string) {
  try{ 
    const {data} = await client(`/blogs/?id=${id}`);
    return data[0];
  }catch(error){
    console.error("Failed to fetch blog: ",error);
    throw new Error('Error fetching blog');
    
  }
 
} 

export async function getNotifications() {
  try{
    const {data} = await client(`/notifications`);
    return data;

  }catch(error){
    console.error("Failed to fetch notifications: ",error);
    throw new Error('Error fetching notifications');
  }
  
}

export async function getUser(email:string) {
  try{
    const {data} = await client(`/users/?email=${email}`);
    return data[0];

  }catch(error){
    console.error("Failed to fetch user by email: ",error);
    throw new Error('Error fetching user by email');

  }
  
} 

export async function getUserById(id:string) {
 try{
  const {data} = await client(`/users/?id=${id}`);
  return data[0];

 }catch(error){
  console.error("Failed to fetch user by id: ",error);
  throw new Error('Error fetching user by id');
 }
  
} 


export async function SignUpUser({ name, lastname, email, password }: IUser) {
  try {
    const response = await client.post('/users', {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw new Error('Error signing up user');
  }
}

export async function updateUser(id:string,updatedData:IUser) {
  try{
  
    const user =  getUserById(id);
   if (!user) {
    throw new Error("User not found");
  }
  const updatedUser = { ...user, ...updatedData };
  const response = await client.put(`/users/${id}`, updatedUser);
  console.log("User updated successfully:", response.data);
  }catch(error){
    console.error("Error updating user:", error);
    throw new Error('Error updating user');
  }
   
  
}


export async function AddCourseIdToShoppingCart(id: string){
  try{
  const response = await client.post("/shoppingCartItemsId", { id });

  return response.data;
} catch (error) {

  console.error('Error AddCourse To ShoppingCart:', error);
  throw new Error('Error AddCourse To ShoppingCart ');
}


 

}

export async function getShoppingCartItem(id:string) {
  try{
    const {data} = await client(`/shoppingCartItemsId/?id=${id}`);
    return data;

  }catch(error){
    console.error("Failed to fetch shoppingCartItem: ",error);
    throw new Error('Error fetching shoppingCartItem');
  }

}

export  async function getCoursesById (ids:IId[]){
  try{
    const coursePromises = ids.map(async (objectId) => {
      const result = await getCourse(objectId.id); 
      return result;  
    });
    const results = await Promise.all(coursePromises);
    return results; 

  }catch(error){
    console.error("Failed to fetch courses by Ids: ",error);
    throw new Error('Error fetching courses by Ids');

  }
 
 

}


export async function updateAllLocks(id:string,curriculumInfo:ICurriculumInfo[],newLockValue: boolean){
  try {
    const courseId = +id;
    console.log('curri',curriculumInfo)
    const updatedCurriculumInfo = curriculumInfo.map((chapter:ICurriculumInfo) => ({
      ...chapter,
      videos: chapter.videos.map((video: IVideo) => ({
        ...video,
        lock: newLockValue, 
      })),
    }));
    console.log('update',updatedCurriculumInfo);
    if(updatedCurriculumInfo.length !== 0){
      await client.put(`/curriculum/${courseId}`,{
        id,
        courseId,
        curriculumInfo: updatedCurriculumInfo,
      });
      console.log("Locks updated successfully!");
    }
  

   
  } catch (error) {
    console.error("Error updating locks:", error);
    throw new Error("Error updating locks")
  }
};


export async function getRegisteredCourseId(id:string) {
  try {
    const {data} = await client(`/registeredCoursesId/?id=${id}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch registeredCourseId: ",error);
    throw new Error('Error fetching registeredCourseId');
  }
}






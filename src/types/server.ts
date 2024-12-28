
export interface ICategory{
    id:number
    enTitle:string,
    image:string,
    title:string,
    icon?:string
   
}
export interface ISubCategory{
  categoryId:number,
  id:number
  enTitle:string
  image:string,
  title:string,
  
}
export interface IId{
  id:string
}

export interface ICourse {
    categoryId: number
    subCategoryId:number
    id: string
    teacherId:number
    title: string
    image: string
    caption: string
    price:number
    discount:number
    degree: string
    rating: number
    creationDate:string
    times:number
    studentsCount: number
    target: string[]
  }

  export interface ICurriculum {
    courseId: number
    curriculumInfo: ICurriculumInfo[]
    id:number
  }
  
  export interface ICurriculumInfo {
    id: number
    title: string
    videos: IVideo[]
  }
  
  export interface IVideo {
    id: number
    title: string
    lock:boolean
    vedioURL: string
  }
  
  
  export interface ITeacher {
    id:number
    image:string
    fullName: string
    expertise:string
    rating: number,
    caption:string
  }
 
  export interface IGeneralQuestions {
    id:number,
    question:string,
    answer:string
  }

  export interface IBlog{
    id:number,
    image:string,
    title:string,
    introduction:string,
    body:IBodyBlog[],
    conclusion:string,
    rating:number,
    creationDate:string,
  }
  interface IBodyBlog{
    title:string,
    caption:string,
    subTitle:ISubTitleBodyBlog[]
  }
  interface ISubTitleBodyBlog{
    title:string,
    caption:string
  }

  export interface INotifications{
    title:string,
    creationDate:string
}

export interface IUser{
  id:string,
  name:string,
  lastname:string,
  email:string,
  password:string,
}

export interface IUpdateUser{
  id:string,
  name:string,
  lastname:string,
  email:string,
  password:string
}

export interface IShoppingCartItem{
  id:string,
  title:string,
  image:string,
  finalPrice:number
}
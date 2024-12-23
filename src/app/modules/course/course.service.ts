import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
  };

  const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
      Course.find()
      .populate('preRequisiteCourses.course'),
      query,
    )
      .search(CourseSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await courseQuery.modelQuery;
    return result;
  };
  
  const updateCourseIntoDB = async(id: string, payload)=>{
   
  }

const getSingleCourseFromDB = async(id:string)=>{
    const result = await Course.findById(id).populate('preRequisiteCourse.course')
    return result 
}





export const CourseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB
}
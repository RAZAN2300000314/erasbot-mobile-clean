import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Course = {
  id: string;
  name: string;
  courseCode: string;
};

type BookedCoursesContextType = {
  bookedCourses: Course[];
  addBookedCourse: (course: Course) => void;
  removeBookedCourse: (id: string) => void;
};

const BookedCoursesContext = createContext<BookedCoursesContextType | undefined>(undefined);

export const BookedCoursesProvider = ({ children }: { children: ReactNode }) => {
  const [bookedCourses, setBookedCourses] = useState<Course[]>([]);

  const addBookedCourse = (course: Course) => {
    setBookedCourses((prevCourses) => {
      const alreadyBooked = prevCourses.some((c) => c.id === course.id);
      return alreadyBooked ? prevCourses : [...prevCourses, course];
    });
  };

  const removeBookedCourse = (id: string) => {
    setBookedCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  return (
    <BookedCoursesContext.Provider value={{ bookedCourses, addBookedCourse, removeBookedCourse }}>
      {children}
    </BookedCoursesContext.Provider>
  );
};

export const useBookedCourses = (): BookedCoursesContextType => {
  const context = useContext(BookedCoursesContext);
  if (!context) {
    throw new Error('useBookedCourses must be used within a BookedCoursesProvider');
  }
  return context;
};

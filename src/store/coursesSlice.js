import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseData: [],
  },
  reducers: {
    setCourseDatas: (state, action) => {
      state.courseData = action.payload;
    },
    restCourseData: (state, action) => {
      state.courseData = [];
    },
  },
});

export const { setCourseDatas  , restCourseData} = coursesSlice.actions;
export default coursesSlice.reducer;

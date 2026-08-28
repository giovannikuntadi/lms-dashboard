import * as studentService from './student';
import * as courseService from './course';
import * as mentorService from './mentor';
import * as organizationService from './organization';

export const HttpService = {
  ...studentService,
  ...courseService,
  ...mentorService,
  ...organizationService,
};

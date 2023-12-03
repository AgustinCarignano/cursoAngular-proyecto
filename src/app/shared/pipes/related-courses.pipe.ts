import { Pipe, PipeTransform } from '@angular/core';
import { CourseEdition } from 'src/app/dashboard/pages/courses/models';

@Pipe({
  name: 'relatedCourses',
})
export class RelatedCoursesPipe implements PipeTransform {
  transform(edition: CourseEdition): string {
    return `${
      edition.course?.title
    } - from ${edition.startDate.toLocaleDateString()} to ${edition.endDate.toLocaleDateString()}`;
  }
}

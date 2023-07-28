import { search } from '../wrapfunctions/helpers';
import { rightToEndPoints, availableSectionForRole } from '../setting';
import createHttpError from 'http-errors';
export async function rightChecker(userId: number, endPoint: string) {
  endPoint = endPoint.split('?')[0];
  if (rightToEndPoints.publicEndPoints.includes(endPoint)) {
    return {};
  }
  const result = await search('users', ['role'], ['ID'], [userId]);
  const availableEndPoints = rightToEndPoints[result[0].role];
  console.log(endPoint);
  console.log(availableEndPoints);
  if (availableEndPoints.includes(endPoint)) {
    console.log('positve');
    return {};
  } else throw createHttpError(400, '你没有合适的权限');
}

export async function PageIsAvailable(userId: number, section: string) {
  const result = await search('users', ['role'], ['ID'], [userId]);
  const availablePages = availableSectionForRole[result[0].role];
  if (availablePages.includes(section)) {
    return { availablePages: availablePages };
  } else {
    return { availablePages: availablePages };
  }
}

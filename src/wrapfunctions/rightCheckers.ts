import { search } from '../wrapfunctions/helpers';
import { rightToEndPoints, availableSectionForRole } from '../setting';
import { errorSender } from '../errors';
export async function rightChecker(userId: number, endPoint: string) {
  endPoint = endPoint.split('?')[0];
  if (rightToEndPoints.publicEndPoints.includes(endPoint)) {
    return {};
  }
  const result = await search('users', ['role'], ['ID'], [userId]);
  const availableEndPoints = rightToEndPoints[result[0].role];
  if (availableEndPoints.includes(endPoint)) {
    return {};
  } else {
    errorSender('userErrors', 'DENY_PERMISSION');
  }
}

export async function PageIsAvailable(userId: number, section: string) {
  const result = await search('users', ['role'], ['ID'], [userId]);
  const availablePages = availableSectionForRole[result[0].role];
  return { availablePages: availablePages };
}

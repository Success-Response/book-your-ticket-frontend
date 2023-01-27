export default async function jestTestFunction(param) {
  if (typeof param !== 'string' || param === '') {
    throw new Error('param must be a string');
  }
  // test
  return true;
}

import '@testing-library/jest-dom';
import jestTestFunction from 'libs/jestTestFunction';

describe('jestTestFunctionError', () => {
  it('To throw an error if param is not a string', async () => {
    expect(jestTestFunction(null)).rejects.toThrow('param must be a string');
  });

  it('To return true if param is a string', async () => {
    expect(await jestTestFunction('test string')).toEqual(true);
  });
});

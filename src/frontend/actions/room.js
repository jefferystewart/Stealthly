export const GENERATE_CODE = 'GENERATE_CODE';
export const RECEIVE_CODE = 'RECEIVE_CODE';

export const generateCode = () => ({
  type: GENERATE_CODE
});

export const receiveCode = (code) => ({
  type: RECEIVE_CODE,
  code: code
});

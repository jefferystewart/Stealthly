export const POST_SIGNATURE = 'POST_SIGNATURE';
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';

export const postSignature = (key, hash) => ({
  type: POST_SIGNATURE,
  key,
  hash
});

export const receiveResponse = (response) => ({
  type: RECEIVE_RESPONSE,
  response
});

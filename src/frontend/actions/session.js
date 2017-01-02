export const POST_SIGNATURE = 'POST_SIGNATURE';
export const RECEIVER_USER = 'RECEIVER_USER';

export const receiveUser = (response) => ({
  type: RECEIVER_USER,
  response
});

export const GENERATE_CODE = 'GENERATE_CODE';
export const GET_ROOM = 'GET_ROOM';
export const RECEIVE_CODE = 'RECEIVE_CODE';
export const RECEIVE_ROOM_ERROR = 'RECEIVE_ROOM_ERROR';

export const generateCode = (host) => ({
  type: GENERATE_CODE,
  host: host
});

export const receiveCode = (code) => ({
  type: RECEIVE_CODE,
  code: code
});

export const receiveRoomError = (error) => ({
  type: RECEIVE_ROOM_ERROR,
  error: error
});

export const getRoom = (code) => ({
  type: GET_ROOM,
  code: code
});

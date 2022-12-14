export const GENERATE_CODE = 'GENERATE_CODE';
export const GET_ROOM = 'GET_ROOM';
export const RECEIVE_CODE = 'RECEIVE_CODE';
export const RECEIVE_ROOM_ERROR = 'RECEIVE_ROOM_ERROR';
export const GET_GIFS = 'GET_GIFS';
export const RECEIVE_GIFS = 'RECEIVE_GIFS';

export const generateCode = (host, callback) => ({
  type: GENERATE_CODE,
  host: host,
  callback: callback
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

export const getGifs = (query, callback) => ({
  type: GET_GIFS,
  query: query,
  callback: callback
});

export const receiveGifs = (gifs) => ({
  type: RECEIVE_GIFS,
  gifs: gifs
});

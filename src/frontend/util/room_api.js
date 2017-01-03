import $ from 'jquery';

export const generateCode = (host, success, error) => {
  $.ajax({
    method: "POST",
    url: `/api/room/new`,
    data: { host },
    success,
    error
  });
};

export const getRoom = (roomCode, success, error) => {
  $.ajax({
    method: "GET",
    url: `/api/room/${roomCode}`,
    success,
    error
  });
};

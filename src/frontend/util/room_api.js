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

export const getGifs = (query, success, error) => {
  $.ajax({
    method: "GET",
    url: `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`,
    success,
    error
  });
};

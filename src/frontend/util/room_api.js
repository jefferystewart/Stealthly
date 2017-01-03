import $ from 'jquery';

export const generateCode = (success, error) => {
  $.ajax({
    method: "GET",
    url: `/api/room/new`,
    success,
    error
  });
};

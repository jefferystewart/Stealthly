import $ from 'jquery';

export const postSignature = (key, hash, success, error) => {
  // debugger
  $.ajax({
    method: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("x-key-hash", hash);
    },
    data: { key: key},
    dataType: "json",
    url: `/api/1.0/verify-signature`,
    success,
    error
  });
};

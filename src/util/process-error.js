function processError(error, res) {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  console.warn(`[${formatted_date}]\t[ERROR]`, error.message);
  return res.status(parseInt(error.code)).send({
    statusCode: error.code,
    message: error.message,
    error: getHttpStatusCode(error),
  });
}

function getHttpStatusCode(error) {
  switch (error.code) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 202:
      return "Accepted";
    case 204:
      return "No Content";
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized ";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 418:
      return "I'm a Teapot";
    default:
      return "Internal Server Error";
  }
}

export { processError };

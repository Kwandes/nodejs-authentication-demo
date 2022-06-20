let logger = (req, res, next) => {
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
  let method = req.method;
  let url = req.url;
  const start = process.hrtime();
  next();
  res.on("finish", () => {
    const durationInMilliseconds =
      getActualRequestDurationInMilliseconds(start);
    let status = res.statusCode;
    let log = `[${formatted_date}]\t[DEBUG] ${method} '${url}' ${status} ${durationInMilliseconds.toLocaleString()} ms`;
    console.debug(log);
  });
};

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export { logger };

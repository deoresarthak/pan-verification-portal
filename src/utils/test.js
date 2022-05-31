const request = require("request");

const options = {
  method: "POST",
  url: "https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Host": "pan-card-verification1.p.rapidapi.com",
    "X-RapidAPI-Key": "2fe554f732mshc092a3d90ae332ap11848ejsn905aa1dff8a9",
    useQueryString: true,
  },
  body: {
    task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
    group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
    data: { id_number: "GMYPD4058K" },
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body.result);
});

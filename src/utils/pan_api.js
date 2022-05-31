const request = require("request");

const verify = (pan_number, callback) => {
  const options = {
    method: "POST",
    url: "https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "pan-card-verification1.p.rapidapi.com",
      "X-RapidAPI-Key": "Your Key Here",
      useQueryString: true,
    },
    body: {
      task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
      group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
      data: { id_number: pan_number },
    },
    json: true,
  };

  request(options, function (error, response) {
    if (response.body.status == "failed") {
      error = true;
      callback("Invalid PAN", undefined);
    } else {
      callback(undefined, {
        seed_status: response.body.result.source_output.aadhaar_seeding_status,
        f_name: response.body.result.source_output.first_name,
        l_name: response.body.result.source_output.last_name,
        m_name: response.body.result.source_output.middle_name,
        card_name: response.body.result.source_output.name_on_card,
        p_number: response.body.result.source_output.id_number,
      });
    }
  });
};

module.exports = verify;

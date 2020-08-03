const unirest = require('unirest');

const sendConfirmation = (contacts, orderID, amount, callback) => {
  const req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
  const total = amount >= 150 ? amount : amount+20;
  req.headers({
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "authorization": process.env.MESSAGE
  });
  req.form({
    "sender_id": "FSTSMS",
    "language": "english",
    "route": "qt",
    "numbers": `${contacts}`, //${process.env.CONTACT},
    "message": process.env.TEMPLATE,
    "variables": "{#EE#}|{#AA#}",
    "variables_values": `${orderID}|${total}`
  });

  req.end(function (res) {
    callback(res.error, res.body);
  });
}

module.exports = { sendConfirmation };

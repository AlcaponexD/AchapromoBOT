var tmi = require('tmi.js');
const fetch = require('node-fetch');

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "Promo_BOT",
    password: "oauth:0avuv05a51h6t2cerdnk8ejdleqi7y"
  },
  channels: ["achapromo"]
};

var client = new tmi.client(options);

client.connect();

client.on('connected', function (address, port) {

  setInterval(function () {
    fetch('http://localhost:8000/api/offers/publish')
      .then(res => res.json())
      .then(function (response) {
        for (var i in response) {
          if (response[i].created_at != response[i].updated_at) {
            client.action('achapromo', `${response[i].product} - ${response[i].link}`)
          }
        }
      }).catch(function (err) {
        return err
      })
  }, 5000)

})
const asanaRequire = require('asana');

const PERSONAL_ACCESS_TOKEN = ""; // TODO : FILL

// Create Asana client using deprecation headers and PAT.
const asana = asanaRequire.Client.create({}).useAccessToken(PERSONAL_ACCESS_TOKEN);

const whoAmI = function() {
  asana.users.me().then(console.log);
};

whoAmI();

const isUsername = (username) => {
  return /^[A-Za-z]([A-Za-z0-9]+)+$/.test(username);
}


const isObjectID = (id) => {
  return /^[0-9a-f]{24}$/i.test(id);
}

module.exports = { isUsername, isObjectID };

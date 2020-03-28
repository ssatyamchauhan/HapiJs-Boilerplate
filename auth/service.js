const users = {
  jagan: {
    username: 'jagan',
    password: 'changeme',
    name: 'jagan swarnkar',
    id: '2133d32a'
  },
  satyam: {
    username: 'satyam',
    password: 'itsme',
    name: 'satyam singh',
    id: '1234'
  }
};

module.exports.validate = async (request, username, password, h) => {

  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = password === user.password;
  const credentials = { id: user.id, username: user.username };

  return { isValid, credentials };
};
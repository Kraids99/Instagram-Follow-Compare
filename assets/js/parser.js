// ambil data usernamenya aja

function parseFollowers(data) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    result.push(data[i].string_list_data[0].value);
  }

  return result;
}

function parseFollowing(data) {
  const result = [];

  for (let i = 0; i < data.relationships_following.length; i++) {
    result.push(data.relationships_following[i].title);
  }

  return result;
}

export {
  parseFollowers,
  parseFollowing
};
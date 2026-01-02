function isInstagramFiles(followersData, followingData) {

  // cek file followers
  if (!Array.isArray(followersData)) {
    alert("File followers tidak valid");
    return false;
  }

  const follower = followersData[0];
  if (!follower || !Array.isArray(follower.string_list_data) || follower.string_list_data.length === 0 || typeof follower.string_list_data[0].value !== "string") {
    alert("File followers JSON tidak sesuai format Instagram");
    return false;
  }

  // cek file following
  if (!followingData || typeof followingData !== "object" || !Array.isArray(followingData.relationships_following)) {
    alert("File following JSON tidak sesuai format Instagram");
    return false;
  }

  const following = followingData.relationships_following[0];
  if (!following || typeof following.title !== "string") {
    alert("File following JSON tidak sesuai format Instagram");
    return false;
  }

  return true;
}

// ambil data usernamenya aja

function parseFollowers(data) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!item.string_list_data || item.string_list_data.length === 0 || !item.string_list_data[0].value) {
      alert("File followers JSON tidak sesuai format Instagram");
      return [];
    }

    result.push(item.string_list_data[0].value);
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
  isInstagramFiles,
  parseFollowers,
  parseFollowing
};
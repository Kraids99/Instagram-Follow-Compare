// followers  = ["a", "b", "c"]
// following  = ["b", "c", "d"]

// Not Following You Back = following - followers = ["d"]
// You Are Not Following Back = followers - following = ["a"]

function notFollowingYouBack(followers, following) {
    const result = [];

    for (let i = 0; i < following.length; i++) {
        const user = following[i];

        if (!followers.includes(user)) {
            result.push(user);
        }
    }

    return result;
}

function youAreNotFollowingBack(followers, following) {
    const result = [];

    for (let i = 0; i < followers.length; i++) {
        const user = followers[i];

        if (!following.includes(user)) {
            result.push(user);
        }
    }

    return result;
}

export {
    notFollowingYouBack,
    youAreNotFollowingBack
};



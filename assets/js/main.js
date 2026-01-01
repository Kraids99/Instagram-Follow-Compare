import { parseFollowers, parseFollowing } from "./parser.js";
import { notFollowingYouBack, youAreNotFollowingBack } from "./comparator.js";

const followersFile = document.getElementById("followersFile");
const followingFile = document.getElementById("followingFile");
const compareBtn = document.getElementById("compareBtn");

function readFile(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            try {
                resolve(JSON.parse(reader.result));
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = function () {
            reject(reader.error);
        };

        reader.readAsText(file);
    });
}

async function main() {
    if (!followersFile.files[0] || !followingFile.files[0]) {
        alert("Upload kedua file dulu");
        return;
    }

    try {
        const followersJson = await readFile(followersFile.files[0]);
        const followingJson = await readFile(followingFile.files[0]);

        const followers = parseFollowers(followersJson);
        const following = parseFollowing(followingJson);

        const notFollowBack = notFollowingYouBack(followers, following);
        const youNotFollowBack = youAreNotFollowingBack(followers, following);

        console.log("Not Following You Back:", notFollowBack);
        console.log("You Are Not Following Back:", youNotFollowBack);

    } catch (err) {
        console.error("Gagal proses file:", err);
    }
}

compareBtn.addEventListener("click", function () {
    main();
});
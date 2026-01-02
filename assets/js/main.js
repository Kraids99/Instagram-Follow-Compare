import { isInstagramFiles, parseFollowers, parseFollowing } from "./parser.js";
import { notFollowingYouBack, youAreNotFollowingBack } from "./comparator.js";
import { loadPartial } from "./pageLoad.js"
import { getTable } from "./table.js";

const followersFile = document.getElementById("followersFile");
const followingFile = document.getElementById("followingFile");

const followersText = document.getElementById("followersText");
const followingText = document.getElementById("followingText");

const compareBtn = document.getElementById("compareBtn");

const uploadPage = document.getElementById("uploadPage");
const tablePage  = document.getElementById("tablePage");

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

        const isValid = isInstagramFiles(followersJson, followingJson);

        if (!isValid) {
            return;
        }

        const followers = parseFollowers(followersJson);
        const following = parseFollowing(followingJson);

        const notFollowBack = notFollowingYouBack(followers, following);
        const youNotFollowBack = youAreNotFollowingBack(followers, following);

        console.log("Not Following You Back:", notFollowBack);
        console.log("You Are Not Following Back:", youNotFollowBack);

        getTable("notFollowBackTable", notFollowBack);
        getTable("youNotFollowBackTable", youNotFollowBack);

        uploadPage.hidden = true;
        tablePage.hidden = false;

    } catch (err) {
        console.error("Gagal proses file!, coba ulangin lagi", err);
    }
}

followersFile.addEventListener("change", function () {
    if (followersFile.files.length > 0) {
        followersText.textContent = followersFile.files[0].name;
        followersText.parentElement.classList.add("filled");
    }
});

followingFile.addEventListener("change", function () {
    if (followingFile.files.length > 0) {
        followingText.textContent = followingFile.files[0].name;
        followingText.parentElement.classList.add("filled");
    }
});

compareBtn.addEventListener("click", function () {
    main();
});

loadPartial("footer-section", "assets/partials/footer.html");
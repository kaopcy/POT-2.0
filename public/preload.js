const fs = require("fs");
var path = require("path");
const homeDir = require("os").homedir();

window.saveBlob = async (blob, filename, category , saveFolder) => {
    const arrayBuffer = await blob.arrayBuffer();
    // console.log(desktopDir);
    const buffer = Buffer.from(arrayBuffer);
    const desktopDirPg = path.join(homeDir, `/Desktop/POT`);

    const desktopDirName = path.join(homeDir, `/Desktop/POT/${saveFolder}`);
    const desktopCategoryDirname = path.join(homeDir, `/Desktop/POT/${saveFolder}/category${category}`);

    const desktopDir = path.join(desktopCategoryDirname, `/${filename}.mp3`);
    if (!fs.existsSync(desktopDirPg)) {
        fs.mkdirSync(desktopDirPg);
    }
    if (!fs.existsSync(desktopDirName)) {
        fs.mkdirSync(desktopDirName);
    }
    if (!fs.existsSync(desktopCategoryDirname)) {
        fs.mkdirSync(desktopCategoryDirname);
    }
    fs.writeFile(desktopDir, buffer, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("save complete");
    });
};

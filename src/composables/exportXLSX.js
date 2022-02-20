import XLSX from "xlsx";

const makeBlobFromSheet = (aoa) => {
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
        Title: "Student Data",
    };

    aoa.forEach((element, index) => {
        workbook.SheetNames.push(`category${index+1}`);
        const worksheet = XLSX.utils.aoa_to_sheet(element);
        workbook.Sheets[`category${index}`] = worksheet;
    });

    const workbookOut = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
    });

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);

        for (let i = 0; i < s.length; i++) {
            // make sure that s not more than 8 bit (255)
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };

    const myblob = new Blob(
        [s2ab(workbookOut)],
        { type: "application/octet-stream" },
        "test.xlsx"
    );
    return myblob;
};

export { makeBlobFromSheet };

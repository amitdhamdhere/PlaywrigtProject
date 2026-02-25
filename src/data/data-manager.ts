import fs from "fs";
import path from "path";

export class DataManager {

    static getStaticData<T>(fileName: string): T {
        const filePath = path.join(
            process.cwd(),
            "src",
            "data",
            "static",
            `${fileName}.json`
        );

        const rawData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(rawData) as T;
    }
}
import { getMonocartReporterOptions } from "playwright.monocart-reporter-options";
import { reportersOutputDir } from "playwright.shared-vars";

const options = getMonocartReporterOptions(reportersOutputDir);
export default options;

// If I comment the above and uncomment below it works. What doesn't seem to work
// is importing from other files in the project...
//
// import type { MonocartReporterOptions } from "monocart-reporter";
// import path from "node:path";
// const reportersOutputDir = path.resolve("./test-reporters/playwright");
// const monocartReporterOutputDir = path.resolve(reportersOutputDir, "monocart-reporter");
// const options: MonocartReporterOptions = {
//   name: "Playground app for @ln/ngx-module-federation-tools",
//   outputFile: path.resolve(monocartReporterOutputDir, "monocart-report.html"),
// }
// export default options;
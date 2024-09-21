
import { getMonocartReporterOptions } from "playwright.monocart-reporter-options";
import { reportersOutputDir } from "playwright.shared-vars";

const options = getMonocartReporterOptions(reportersOutputDir);
export default options;
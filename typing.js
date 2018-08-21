const dts = require("dts-bundle");
const { join } = require("path");
const cwd = process.cwd();
const pkgJSON = require(join(cwd, "package.json"));
const main = join(__dirname, "typings/index.d.ts");
dts.bundle({
	main,
	name: pkgJSON.name,
	out: join(cwd, "dist/index.d.ts")
});

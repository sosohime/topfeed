const dts = require("dts-bundle");
const { join } = require("path");
const cwd = process.cwd();
const pkgJSON = require(join(cwd, "package.json"));
dts.bundle({
	main: join(__dirname, "typings/index.d.ts"),
	name: pkgJSON.name,
	out: join(cwd, "dist/index.d.ts")
});

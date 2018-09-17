import { Application, nunjuck_view } from "..";
import * as path from "path";

const app = new Application({
	root: __dirname
});
app.use(
	nunjuck_view({
		path: path.join(__dirname, "view")
	})
);
export async function startServer() {
	app.listen(process.env.PORT, () => {
		console.log("start server at port:", process.env.PORT);
	});
}

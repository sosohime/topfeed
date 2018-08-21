import * as rndm from "rndm";
import * as crypto from "crypto";

export default function generate_csrf(salt: string) {
	const hash = crypto.createHash("sha1");
	const secret = rndm(64);
	hash.update(salt);
	hash.update(secret);
	const token = hash.digest("hex");
	return {
		secret,
		token
	};
}

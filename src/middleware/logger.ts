//import { clientLogger } from '../helper/logger';

export default () => async (_: any, next: any) => {
	//clientLogger.info(ctx);
	await next();
};

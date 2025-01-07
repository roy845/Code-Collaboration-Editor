import env from "./config";

export let BASE_URL: string = "";
const IS_PROD: boolean = true;

if (IS_PROD) {
  BASE_URL = env.PROD_URL;
} else {
  BASE_URL = env.DEV_URL;
}

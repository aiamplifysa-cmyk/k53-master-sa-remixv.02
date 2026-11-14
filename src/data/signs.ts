export const SIGN_BY_CODE = new Map(SIGNS.map((sign) => [sign.code, sign]));
export const signByCode = (code: string) => SIGN_BY_CODE.get(code);








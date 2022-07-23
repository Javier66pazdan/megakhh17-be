import * as bcrypt from "bcrypt";

export const comparePwd = async (p: string, hash: string): Promise<boolean> => {

  const isValid = await bcrypt.compare(p, hash);

  return isValid;
}

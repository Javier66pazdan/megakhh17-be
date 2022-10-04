import * as bcrypt from 'bcrypt';

export const hashPwd = async (p: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(p, salt);
};

import { hashSync, compare } from 'bcryptjs';

const Encrypt = (text: string): string => {
  return hashSync(text, 8);
}

const Compare = async (obj1: string, obj2: string ): Promise<boolean> => {
  return await compare(obj1, obj2);
}

export { Encrypt, Compare };
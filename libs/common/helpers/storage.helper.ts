// This file should exist in `src/common/helpers`
import { promisify } from 'util';
import * as fs from 'fs';


export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

export const getFileBase64 = async (path: string): Promise<string | Buffer> => {
  return fs.readFileSync(path, 'base64')
};

export const createFile = async (
    path: string, 
    fileName: string,
    data: Buffer): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  return fs.writeFileSync(`${path}/${fileName}`, data)
};

export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};
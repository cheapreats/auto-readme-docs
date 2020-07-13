import { expect } from 'chai';
import 'mocha';
import { getFileIconFromFileType } from './getFileIconFromFileType';
import { FileType } from '../tree/types';

describe('Given a file type, the function returns an emoji passed into a string matching the type of file', () => {
  // Test for config file
  it('should return 📜  since fileType is a CONFIG_FILE', () => {
    expect(getFileIconFromFileType(FileType.CONFIG_FILE)).to.equal('📜 ');
  });
  // Test for file
  it('should return 📄  since fileType is a FILE', () => {
    expect(getFileIconFromFileType(FileType.FILE)).to.equal('📄 ');
  });
  // Test for folder
  it('should return 📂  since fileType is a FOLDER', () => {
    expect(getFileIconFromFileType(FileType.FOLDER)).to.equal('📂 ');
  });
  it('should return ⚖️  since fileType is a LICENSE', () => {
    expect(getFileIconFromFileType(FileType.LICENSE)).to.equal('⚖️ ');
  });
  });

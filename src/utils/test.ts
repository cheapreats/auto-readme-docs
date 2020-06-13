import { expect } from 'chai';
import { getFileTypeFromPath } from './getFileTypeFromPath';
import 'mocha';

describe('Finds file type of path', () =>{
    it('should return FILE, CONFIG_FILE, or FOLDER', () => {
        const result = getFileTypeFromPath('./src/tree/index.ts');
        expect(result).to.equal('FILE');
    });
});
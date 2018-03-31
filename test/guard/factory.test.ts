import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { GuardOptions } from '../../src/guard/schema';

describe('Guard Factory', () => {
  describe('Schematic definition', () => {
    context('Manage name only', () => {
      it('should generate a new guard file', () => {
        const options: GuardOptions = {
          name: 'foo'
        };
        const runner: SchematicTestRunner = new SchematicTestRunner(
          '.',
          path.join(process.cwd(), 'src/collection.json')
        );
        const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
        const files: string[] = tree.files;
        expect(files.find((filename) => filename === '/src/foo/foo.guard.ts'))
          .to.not.be.undefined;
      });
    });
    context('Manage name as a path', () => {
      it('should generate a new guard file', () => {
        const options: GuardOptions = {
          name: 'bar/foo'
        };
        const runner: SchematicTestRunner = new SchematicTestRunner(
          '.',
          path.join(process.cwd(), 'src/collection.json')
        );
        const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
        const files: string[] = tree.files;
        expect(files.find((filename) => filename === '/src/bar/foo/foo.guard.ts'))
          .to.not.be.undefined;
      });
    });
    context('Manage name and path', () => {
      it('should generate a new guard file', () => {
        const options: GuardOptions = {
          name: 'foo',
          path: 'bar'
        };
        const runner: SchematicTestRunner = new SchematicTestRunner(
          '.',
          path.join(process.cwd(), 'src/collection.json')
        );
        const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
        const files: string[] = tree.files;
        expect(files.find((filename) => filename === '/src/bar/foo/foo.guard.ts'))
          .to.not.be.undefined;
      });
    });
  });
});

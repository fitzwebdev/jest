/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {makeGlobalConfig} from '../../../../TestUtils';
import getResultHeader from '../get_result_header';
const terminalLink = require('terminal-link');

jest.mock('terminal-link', () => jest.fn(() => 'wannabehyperlink'));

const testResult = {
  testFilePath: '/foo',
};

const globalConfig = makeGlobalConfig();

beforeEach(() => {
  terminalLink.mockClear();
});

test('should call `terminal-link` correctly', () => {
  getResultHeader(testResult, globalConfig);

  expect(terminalLink).toBeCalledWith(
    expect.stringContaining('foo'),
    'file:///foo',
    expect.objectContaining({fallback: expect.any(Function)}),
  );
});

test('should render the terminal link', () => {
  const result = getResultHeader(testResult, globalConfig);

  expect(result).toContain('wannabehyperlink');
});

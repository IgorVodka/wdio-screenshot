import _ from 'lodash';
import makeDocumentScreenshot from '../modules/makeDocumentScreenshot';
import saveBase64Image from '../utils/saveBase64Image';

/**
 * @alias browser.saveDocumentScreenshot
 * @param {string=} fileName
 * @param {Object=} options
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
export default async function async(fileName, options) {

  if (_.isPlainObject(fileName) && _.isUndefined(options)) {
    options = fileName;
    fileName = undefined;
  }

  // make screenshot of area
  const base64Image = await makeDocumentScreenshot(this, options);

  if (typeof fileName !== 'undefined') {
    // store base64 image as real png
    await saveBase64Image(fileName, base64Image);
  }

  this.emit('screenshot', { data: base64Image, filename: fileName });

  return base64Image;
}

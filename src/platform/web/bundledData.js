import defaultImagesZipUrl from '../../../images.zip?url';
import defaultShipCsvUrl from '../../../ship.csv?url';

import { loadBundledDatabaseStateFromFiles } from '../../domain/importExport/bundledData.js';
import { createImportError } from '../../domain/importExport/shared.js';

export const DEFAULT_BUNDLED_FILES = {
  ship: { url: defaultShipCsvUrl, name: 'ship.csv', type: 'text/csv' },
  images: { url: defaultImagesZipUrl, name: 'images.zip', type: 'application/zip' },
};

async function fetchBundledFile({ url, name, type }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw createImportError(`${name} 기본 파일을 불러오지 못했어요.`);
  }

  const blob = await response.blob();
  return new File([blob], name, { type: blob.type || type });
}

export async function loadBundledDatabaseState(files = DEFAULT_BUNDLED_FILES) {
  const [shipFile, imagesFile] = await Promise.all([
    fetchBundledFile(files.ship),
    fetchBundledFile(files.images),
  ]);

  return loadBundledDatabaseStateFromFiles({ imagesFile, shipFile });
}

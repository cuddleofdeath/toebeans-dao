import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const editionDrop = sdk.getEditionDrop(
  '0x5eE0a746F841BcdD6A7DcaCb12494B1F8969Ecff'
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'Toebeans DAO Membership Card',
        description: 'This NFT will give you access to ToebeansDAO!',
        image: readFileSync('scripts/assets/ToebeansDAO.gif'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();

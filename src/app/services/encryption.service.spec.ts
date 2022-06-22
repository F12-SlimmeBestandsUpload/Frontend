import { EncryptionService } from "./encryption.service";

describe('EncryptionService', () => {
  const encryptionService: EncryptionService = new EncryptionService();

  beforeEach(() => {
  });

  it("Should encrypt and decrypt", async() => {
    const blobArray: Blob[] = [new Blob(['blob1']), new Blob(['blob2'])];
    const iv = encryptionService.generateIv();
    const key = await encryptionService.generateKey();
    const encryptedBlob = await encryptionService.encryptEachBlob(iv, key, blobArray);
    const result: any[] = [];

    for (let i = 0; i < blobArray.length; i++) {
      const blob = encryptedBlob[i];
      const buffer = await blob.arrayBuffer();

      const res = await encryptionService.decrypt(iv, key, buffer);
      const newBlob = new Blob([res]);
      result.push(newBlob);
    }

    expect(blobArray).toEqual(result);
  });
});

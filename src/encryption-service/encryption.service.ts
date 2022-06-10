import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {

  async encrypt(iv: Uint8Array, key: CryptoKey, buffer: ArrayBuffer) {
    let arrayBuffer = await window.crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: iv
    }, key, buffer)
    return new Blob([new Uint8Array(arrayBuffer)]);
  }

  encryptEachBlob(iv: Uint8Array, key: CryptoKey, blobs: Blob[]): Promise<Blob[]> {
    let count = 0;
    let result: Blob[] = [];

    return new Promise(async (resolve) => {
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const buffer = await blob.arrayBuffer();

        let encrypted = await this.encrypt(iv, key, buffer);

        result.push(encrypted);
        count++;

        if (count == blobs.length) {
          resolve(result);
        }
      }
    })
  }

  // niet functioneel
  decrypt(key: any, buffer: ArrayBuffer) {
    return window.crypto.subtle.decrypt({
      name: "AES-GCM"
    }, key, buffer)
  }

  async generateKey() {
    let key = await window.crypto.subtle.generateKey({
      name: "AES-GCM",
      length: 256
    }, true, ["encrypt", "decrypt"]);
    return key;
  }

  generateIv(): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(12));
  }

  async keyToJwkJson(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey(
      "jwk",
      key
    );
    return JSON.stringify(exported);
  }

  ivToJsonArray(iv: Uint8Array): string {
    let arrayIv = Array.from(iv)
    return JSON.stringify(arrayIv);
  }
}

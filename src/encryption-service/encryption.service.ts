import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {

  encrypt(key: CryptoKey, buffer: ArrayBuffer) {
    let iv = window.crypto.getRandomValues(new Uint8Array(buffer));

    return window.crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: iv
    }, key, buffer)
  }

  eachBlobInArray(key: CryptoKey, blobs: Blob[]): Promise<ArrayBuffer[]> {
    let count = 0;
    let result: ArrayBuffer[] = [];

    return new Promise(async (resolve) => {
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const buffer = await blob.arrayBuffer();

        const encrypted: ArrayBuffer = await this.encrypt(key, buffer);

        result.push(encrypted);
        count++;

        if (count == blobs.length) {
          resolve(result);
        }
      }
    })
  }

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
}

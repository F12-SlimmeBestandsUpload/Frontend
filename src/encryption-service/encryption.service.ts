import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {

  async encrypt(key: CryptoKey, buffer: ArrayBuffer) {
    const arr = [255,255,255,255,40,92,143,2,1,1,1,1]
    const iv = new Uint8Array(arr)
    console.log(iv.length)

    let arrayBuffer = await window.crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: iv
    }, key, buffer)
    return new Blob([new Uint8Array(arrayBuffer)]);
  }

  encryptEachBlob(key: CryptoKey, blobs: Blob[]): Promise<Blob[]> {
    let count = 0;
    let result: Blob[] = [];

    return new Promise(async (resolve) => {
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const buffer = await blob.arrayBuffer();

        let encrypted = await this.encrypt(key, buffer);

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

  async keyToBase64(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey(
      "raw",
      key
    );
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }
}

export class ImageAndIndex {
    index: number;
    imageBlob: Blob;

    constructor(index: number, imageBlob: Blob) {
        this.index = index;
        this.imageBlob = imageBlob;

    }
}
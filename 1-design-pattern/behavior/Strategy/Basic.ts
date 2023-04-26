interface Compression {
  execute(): void;
}

interface Filter {
  apply(): void;
}

class ImageStorage {
  store(compression: Compression, filter: Filter) {
    compression.execute();
    filter.apply();
  }
}

class JPGCompression implements Compression {
  constructor(image: string) {}

  execute(): void {
    console.log("running jpg compression");
  }
}

class PNGCompression implements Compression {
  constructor(image: string) {}

  execute(): void {
    console.log("running png compression");
  }
}

class BGFilter implements Filter {
  constructor(image: string) {}

  apply(): void {
    console.log("applied bg filter");
  }
}

const imageStorage = new ImageStorage();

imageStorage.store(new PNGCompression("image"), new BGFilter("image"));

imageStorage.store(new JPGCompression("image2"), new BGFilter("image2"));

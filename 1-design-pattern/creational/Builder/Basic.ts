enum PresentationType {
  MOVIE,
  PDF,
  HTML,
}

interface PresentationBuilder {
  addSlide(slide: Slide): void;
}

class Slide {
  constructor(private text: string) {}

  getText() {
    return this.text;
  }
}

class Presentation {
  #slides: Slide[] = [];

  addSlide(slide: Slide) {
    this.#slides.push(slide);
  }

  export(builder: PresentationBuilder) {
    for (const slide of this.#slides) builder.addSlide(slide);
  }
}

class PdfDocument {
  addPage(text: string) {
    console.log("Added page in pdf.", text);
  }
}

class MovieDocument {
  addFrame(text: string, duration: number) {
    console.log("Added frame in movie.", text, duration);
  }
}

class PdfDocumentBuilder implements PresentationBuilder {
  #document = new PdfDocument();

  addSlide(slide: Slide): void {
    this.#document.addPage(slide.getText());
  }

  getPdf() {
    return this.#document;
  }
}

class MovieDocumentBuilder implements PresentationBuilder {
  #document = new MovieDocument();

  addSlide(slide: Slide): void {
    this.#document.addFrame(slide.getText(), 3);
  }

  getMovie() {
    return this.#document;
  }
}

const presentation = new Presentation();
presentation.addSlide(new Slide("Text 1"));
presentation.addSlide(new Slide("Text 2"));
presentation.addSlide(new Slide("Text 3"));

const pdfDocument = new PdfDocumentBuilder();
const movieDocument = new MovieDocumentBuilder();

presentation.export(pdfDocument);
presentation.export(movieDocument);

const pdf = pdfDocument.getPdf();
const movie = movieDocument.getMovie();
console.log();

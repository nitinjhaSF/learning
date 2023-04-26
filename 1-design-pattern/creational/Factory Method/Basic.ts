interface ViewEngine {
  render(viewName: string, context: Map<string, object>): string;
}

class Controller {
  render(viewName: string, context: Map<string, object>) {
    const viewEngine = this.createViewEngine();
    const html = viewEngine.render(viewName, context);
    console.log(html);
  }

  protected createViewEngine(): ViewEngine {
    return new HandlerBarsViewEngine();
  }
}

class HandlerBarsViewEngine implements ViewEngine {
  render(viewName: string, context: Map<string, object>) {
    return "Rendering template using HandlerBar ViewEngine";
  }
}

class EJSViewEngine implements ViewEngine {
  render(viewName: string, context: Map<string, object>) {
    return "Rendering template using EJS ViewEngine";
  }
}

class EJSController extends Controller {
  protected createViewEngine(): ViewEngine {
    return new EJSViewEngine();
  }
}

class ProductController extends EJSController {
  listProducts() {
    this.render("product.html", new Map());
  }
}

const products = new ProductController();
products.listProducts();

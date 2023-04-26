interface Decorator {
  send(message: string): void;
}

class Notifier implements Decorator {
  send(message: string) {
    console.log("email sent", message);
  }
}

abstract class BaseNotifier implements Decorator {
  constructor(public notifier: Decorator) {}

  abstract send(message: string): void;
}

class SmsNotifier extends BaseNotifier {
  send(message: string): void {
    console.log("sms sent", message);
    this.notifier.send(message);
  }
}

class FacebookNotifier extends BaseNotifier {
  send(message: string): void {
    console.log("facebook notification sent: ", message);
    this.notifier.send(message);
  }
}

new FacebookNotifier(new SmsNotifier(new Notifier())).send("fire!!!!");

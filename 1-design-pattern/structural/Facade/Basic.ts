class Connect {
  disconnect() {
    console.log("disconnected");
  }
}

class Authenticate {
  constructor(appId: string, key: string) {}
}

class Message {
  constructor(public message: string) {}
}

class NotificationServer {
  constructor() {}

  connect(ip: string) {
    return new Connect();
  }

  authenticate(appId: string, key: string) {
    return new Authenticate(appId, key);
  }

  send(authToken: Authenticate, message: Message, target: string) {
    console.log("sended");
  }
}

//Facade class
class NotificationService {
  send(message: string, target: string) {
    const server = new NotificationServer();
    const connect = server.connect("192.161.1.1");
    const authToken = server.authenticate("app", "key");
    server.send(authToken, new Message(message), target);
  }
}

const service = new NotificationService();
service.send("message", "target");

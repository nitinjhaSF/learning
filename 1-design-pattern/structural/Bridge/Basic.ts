interface Device {
  turnOn(): void;
  turnOff(): void;
  setChannel(channelId: number): void;
}

class RemoteControl {
  constructor(protected device: Device) {}

  turnOn() {
    this.device.turnOn();
  }

  turnOff() {
    this.device.turnOff();
  }
}

class AdvanceRemoteControl extends RemoteControl {
  setChannel(channelId: number) {
    this.device.setChannel(channelId);
  }
}

class SonyTv implements Device {
  turnOn(): void {
    console.log("SonyTv On");
  }

  turnOff(): void {
    console.log("SonyTv Off");
  }

  setChannel(channelId: number): void {
    console.log("Channel Change to: ", channelId);
  }
}

class SamsungTv implements Device {
  turnOn(): void {
    console.log("SamsungTv On");
  }

  turnOff(): void {
    console.log("SamsungTv Off");
  }

  setChannel(channelId: number): void {
    console.log("Channel Change to:", channelId);
  }
}

const remote = new RemoteControl(new SonyTv());

remote.turnOn();
remote.turnOff();

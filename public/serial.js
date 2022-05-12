
window.addEventListener("load", initiate, false);

const serial = {};
let port;

'use strict';

(function() {
    serial.getPorts = function() {
        return navigator.usb.getDevices().then(devices => {
            return devices.map(device => new serial.Port(device));
        });
    };

    serial.requestPort = function() {
        const filters = [{}];
        return navigator.usb.requestDevice({ 'filters': filters }).then(
            device => new serial.Port(device)
        );
    }

    serial.Port = function(device) {
        this.device_ = device;
    };

    serial.Port.prototype.connect = function() {
        let readLoop = () => {
            this.device_.transferIn(this.endpointIn_, 64).then(result => {
                this.onReceive(result.data);
                readLoop();
            }, error => {
                this.onReceiveError(error);
            });
        };

        return this.device_.open()
            .then(() => {
                if (this.device_.configuration === null) {
                    return this.device_.selectConfiguration(1);
                }
            })
            .then(() => {
                let configInterfaces = this.device_.configuration.interfaces;
                configInterfaces.forEach(element => {
                    element.alternates.forEach(elementalt => {
                        if (elementalt.interfaceClass === 0xff) {
                            this.interfaceNumber_ = element.interfaceNumber;
                            elementalt.endpoints.forEach(elementendpoint => {
                                if (elementendpoint.direction === "out" && elementendpoint.type === "bulk") {
                                    this.endpointOut_ = elementendpoint.endpointNumber;
                                }
                                if (elementendpoint.direction === "in" && elementendpoint.type === "bulk") {
                                    this.endpointIn_ = elementendpoint.endpointNumber;
                                }
                            })
                        }
                    })
                })
            })
            .then(() => this.device_.claimInterface(this.interfaceNumber_))
            .then(() => this.device_.selectAlternateInterface(this.interfaceNumber_, 0))
            .then(() => {
                const buffer = new ArrayBuffer(7);
                const view = new DataView(buffer);
                view.setUint32(0, 9600, true); // true for little-endian
                view.setUint8(4, 0); // 1 stop bit
                view.setUint8(5, 0); // no parity
                view.setUint8(6, 8); // 8 data bits
                this.device_.controlTransferOut({
                    'requestType': 'class',
                    'recipient': 'interface',
                    'request': 0x9a,
                    'value': 0x0f2c,
                    'index': this.interfaceNumber_,
                }, buffer)
            })
           /* .then(() => this.device_.controlTransferOut({
                'requestType': 'class',
                'recipient': 'interface',
                'request': 0x22,
                'value': 0x01,
                'index': this.interfaceNumber_})
            )*/
            .then(() => {
                readLoop();
            })
    };

    serial.Port.prototype.disconnect = async function() {
        const result = await this.device_.controlTransferOut({
            'requestType': 'class',
            'recipient': 'interface',
            'request': 0x22,
            'value': 0x00,
            'index': this.interfaceNumber_})
            .then(() => this.device_.close());
        console.log(result.status);
    };

    serial.Port.prototype.send = function(data) {
        return this.device_.transferOut(this.endpointOut_, data);
    };
})();

function connect() {
    port.connect().then(() => {
     document.getElementById('editor').value = "connected to: " + port.device_.productName;
       document.getElementById('editor').value += " VID: " + port.device_.vendorId;
 //document.getElementById('editor').value += " Mass: " + port.onReceive ;
  
      document.getElementById('editor').value += " PID: " + port.device_.productId;
        port.onReceive = nass => {
        
            console.log(nass);
            let phrase = new TextDecoder().decode(nass);
            let reg = /\d+\.*\d*/g;
            
          
            let result = phrase.match(reg)
         //  let reg = /\d+\.*\d*/g;
         //  let result = data.match(reg)
          
          document.getElementById('output').value += new TextDecoder().decode(nass);
         document.getElementById('mass').value = Number(result)
   
     

            /*
            $.ajax({
                dataType: 'json',
                data: {
                    data1:new TextDecoder().decode(nass) ,
                    
                },
                type: 'POST',
                url: "./serial",
                success: function(data) {
              
                 $("#mass").val(data)
               

              
             
                }
               
            });*/
        }

        
        port.onReceiveError = error => {
            console.error(error);
            port.disconnect();
        };
    });
}

function disconnect() {
    port.disconnect();
}

function send(string) {
    console.log("sending to serial:" + string.length);
    if (string.length === 0)
        return;
    console.log("sending to serial: [" + string +"]\n");

    let data = new TextEncoder('utf-8').encode(string);
    console.log(data);
    if (port) {
        port.send(data);
    }
}

function initiate(){
    serial.getPorts().then(ports => {
        //these are devices already paired, let's try the first one...
        if (ports.length > 0) {
            port = ports[0];
            connect();
        }
    })

    document.querySelector("#connect").onclick = async function () {
        await serial.requestPort().then(selectedPort => {
            port = selectedPort;
            connect();
        });
    }

    document.querySelector("#disconnect").onclick = function() {
        disconnect()
    }

    document.querySelector("#submit").onclick = () => {
        let source = document.querySelector("#editor").value;
        send(source);
    }
}
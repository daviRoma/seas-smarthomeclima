# seas-smarthomeclima
The SmartHomeClima is application which represents an autonomous system of a generic Smart Home.

This autonomous system has as its main objective that of guaranteeing an optimal temperature for all
the rooms. Often there are unused rooms at certain times of the day in a house, for this reason it makes no sense, for example, to keep a high temperature (winter) in all the rooms, but it would be enough to keep it on a certain threshold that is easy to reach in case someone is inside or when that room will be used at a certain time.
We want to ensure that the optimal temperature chosen by the user is always maintained in all rooms and we think that this type of management can also help save energy.
For each smart room there is a:
● Optimal value
● Predictive margin
● Danger margin
in such a way as to immediately identify the situation in which the room is located and, if necessary, activate a plan.

## Characteristics
The software has been completely implemented through Java and Angular2+. The following technologies
are used to complete the entire system functionality:
● Mosquitto: Message broker implementing the MQTT protocol.
● Eclipse Paho: Eclipse module that provides an open-source client implementation of MQTT
messaging protocols.
● Spring framework
● H2: SQL in memory database.

The Java project was developed using the module dependency pattern using Maven. The root project has the pom.xml containing all the project module, while each module’s pom.xml contains the dependency to the other module.

## Installation
Download the source code of this project and follow the steps below.

### Step 1
Check your Java version. JDK 8, 11 or 12 are recommended.

### Step 2
Download and install [Apache Maven](https://maven.apache.org/download.cgi).
Setting Maven Environment Variables for your machine.

### Step 3
Download, install and configure [Apache Tomcat](https://tomcat.apache.org/download-90.cgi).

### Step 4
Install [NodeJS](https://nodejs.org/it/) and [npm](https://www.npmjs.com/) with it.

### Step 5
Install [Mosquitto](https://mosquitto.org/download/) Broker for your platform.

#### Step 5.1
The MqttModule of Angular2+ supports only websocket listener, for this purpose we need to configure Mosquitto to publish messages to http port 8081 (the port 8080 is used by the java application).
Configure Mosquitto Broker:
- Open mosquitto.conf file
- Search for the “Listeners” section. In this section, add:
```bash
listener 1883
listener 8081
protocol websockets
allow_anonymous true
```
-Search for the “Logging” section. In this section, add the following:
```bash
connection_messages true
log_timestamp true
```


## Application Start
The SmartHome Clima is composed of 3 main components which works together:
- Angular WebApp,
- Java Application,
- Mosquitto Broker.

If you have installed all the tools and packages described in the previous section, you would be able to run the application. 

### Step 1
Start Mosquitto Broker.

```bash
mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf
```

### Step 2
Run Java application on Apache Tomcat.

### Step 3
Open the terminal on your machine, navigate to seas-smarthomeclima project, open smart-home-clima-control-panel folder and then run the web app using the following commands:

```bash
npm install
ng serve
```

### Step 4
Navigate to localhost:4200/, click the play button on the right corner and see what happen.

## MIT License

Copyright (c) 2020 Davide Romano

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
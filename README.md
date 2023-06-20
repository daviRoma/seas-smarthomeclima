# seas-smarthomeclima
The SmartHomeClima is application which represents an autonomous system of a generic Smart Home.

This autonomous system has as its main objective that of guaranteeing an optimal temperature for all
the rooms in a house. Often there are unused rooms at certain times of the day in a house, for this reason it makes no sense, for example, to keep a high temperature (in winter) in all the rooms, but it would be enough to keep it on a certain threshold that is easy to reach in case someone is inside the room.
We want to ensure that the optimal temperature chosen by the user is always maintained in all rooms and we think that this type of management can also help save energy.
For each smart room we consider the following temperature range:
- Optimal value
- Predictive margin
- Danger margin
in such a way as to immediately identify the situation in which the room is located and, if necessary, activate a plan.

Please note that this is only an example application developed for educational purposes and for a restricted domain.

For a complete description of the application you can refer to the [SHC Documentation](https://github.com/daviRoma/seas-smarthomeclima/blob/main/SmartHomeClima_Documentation.pdf).

## Characteristics
The software has been completely implemented through Java and Angular2+. The following technologies
are used to complete the entire system functionality:
- Mosquitto: Message broker implementing the MQTT protocol.
- Eclipse Paho: Eclipse module that provides an open-source client implementation of MQTT
messaging protocols.
- Spring framework
- H2: SQL in memory database.

The Java project was developed using the module dependency pattern using Maven. The root project has the pom.xml containing all the project module, while each module’s pom.xml contains the dependency to the other module.

In the next section will be explained how to install the software on your own machine.

## Installation
Download the source code of this project and follow the steps below.

### Step 1
Check your Java version: JDK 8, 11 or 12 are recommended.

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
- Search for the “Listeners” section. In this section add the following lines:

```bash
listener 1883
listener 8081
protocol websockets
allow_anonymous true
```
- Search for the “Logging” section. In this section, add the following:
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
Open your development Ide (Eclipse, IntelliJ, ...) and build the application.
Run Java application on Apache Tomcat.

### Step 3
Open the terminal on your machine, navigate to seas-smarthomeclima project, open smart-home-clima-control-panel folder and then run the web app using the following commands:

```bash
npm install
ng serve
```

### Step 4
Navigate to localhost:4200/, click the play button on the right corner and see what happen.

------------------------------------------------------------------------------------------

I hope you enjoyed the idea and the application.
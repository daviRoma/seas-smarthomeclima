package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

public final class MessageChannel {

	// MQTT channels
	public static final String SENSOR_CHANNEL = "smartroom/{srId}/sensor/{snsId}";
	public static final String ACTUATOR_CHANNEL = "smartroom/{srId}/actuator/{actId}";
	public static final String MONITOR_ACTUATOR_CHANNEL = "smartroom/{srId}/monitor/actuator/{actId}";
	public static final String MONITOR_EXECUTOR_CHANNEL = "smartroom/{srId}/monitor/executor/{actId}";
	
	public final static String[] parseMessage(String s) {
		return s.split(",");
	}

	public final static String[] parseTopic(String s) {
		return s.split("/");
	}

	public final static int getSmartRoomIdFromTopic(String topic) {
		return Integer.parseInt(parseTopic(topic)[1]);
	}

}

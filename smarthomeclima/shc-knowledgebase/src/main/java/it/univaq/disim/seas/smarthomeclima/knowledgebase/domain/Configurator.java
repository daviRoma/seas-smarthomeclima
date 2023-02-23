package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.util.ArrayList;
import java.util.HashMap;

public final class Configurator {
 	
	// temperature
	public static final int OPT_TEMP_CODE = 1;
	public static final int LOW_TEMP_CODE = 2;
	public static final int HIGH_TEMP_CODE = 3;
	public static final int DANGER_LOW_TEMP_CODE = 4;
	public static final int DANGER_HIGH_TEMP_CODE = 5;
	public static final int DANGER_PRIORITY_LOW_TEMP_CODE = 6;
	public static final int DANGER_PRIORITY_HIGH_TEMP_CODE = 7;

	// states
	public static final int OFF = 0;
	public static final int ON = 1;
 
	@SuppressWarnings("serial")
	public static final HashMap<Mode, ArrayList<Integer>> MODE_POWER = new HashMap<Mode, ArrayList<Integer>>(){{
		put(Mode.ECO, new ArrayList<Integer>() {{ 
			add(1); 
		}});
		put(Mode.COMFORT, new ArrayList<Integer>() {{ 
			add(1); 
			add(2);
		}});
		put(Mode.POWER, new ArrayList<Integer>() {{ 
			add(2); 
			add(3);
			add(4);
		}});
	}};
	
	@SuppressWarnings("serial")
	public static final HashMap<Mode, Integer> MODE_DURATION = new HashMap<Mode, Integer>() {{
		put(Mode.ECO, 20);
		put(Mode.COMFORT, 35);
		put(Mode.POWER, 60);
	}};
 
}
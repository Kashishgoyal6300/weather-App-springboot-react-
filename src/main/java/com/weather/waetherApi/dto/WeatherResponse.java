package com.weather.waetherApi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WeatherResponse {
	private String city;
	private String region;
	private String country;
	
	private String condition;
	private double temperature;
	
}

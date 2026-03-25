package com.weather.waetherApi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WeatherForeCast {
	private WeatherResponse weatherResponse;
	private List<DayTemp> dayTemp;
}

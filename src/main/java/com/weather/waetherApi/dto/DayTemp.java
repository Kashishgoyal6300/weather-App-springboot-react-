package com.weather.waetherApi.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DayTemp {
	private String date;
	private Double minTemp;
	private double avgTemp;
	private double maxTemp;
	
}

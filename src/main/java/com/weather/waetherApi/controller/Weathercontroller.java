package com.weather.waetherApi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.weather.waetherApi.dto.WeatherForeCast;
import com.weather.waetherApi.dto.WeatherResponse;
import com.weather.waetherApi.service.WeatherService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/weather")
public class Weathercontroller {

    @Autowired
    private WeatherService service;

    // Test API
    @GetMapping("/{city}")
    public String getWeatherData(@PathVariable String city) {
        return service.test();
    }

    // Current Weather
    @GetMapping("/current/{city}")
    public WeatherResponse getWeather(@PathVariable String city) {
        return service.getData(city);
    }

    // Forecast (Recommended: Path Variables)
    @GetMapping("/forecast/{city}/{days}")
    public WeatherForeCast getForecast(@PathVariable String city,
            @PathVariable int days) {
        return service.getForecast(city, days);
    }
}
package com.weather.waetherApi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.weather.waetherApi.dto.*;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.forecast.url}")
    private String apiForecastUrl;

    private RestTemplate template = new RestTemplate();

    public String test() {
        return "good";
    }

    // Current Weather
    public WeatherResponse getData(String city) {

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("key", apiKey)
                .queryParam("q", city)
                .toUriString();

        Root response = template.getForObject(url, Root.class);

        WeatherResponse weatherResponse = new WeatherResponse();

        weatherResponse.setCity(response.getLocation().name);
        weatherResponse.setRegion(response.getLocation().region);
        weatherResponse.setCountry(response.getLocation().country);
        weatherResponse.setCondition(response.getCurrent().getCondition().getText());
        weatherResponse.setTemperature(response.getCurrent().getTemp_c());

        return weatherResponse;
    }

    // Forecast Weather
    public WeatherForeCast getForecast(String city, int days) {

        // Validation
        if (days > 10) {
            throw new IllegalArgumentException("Maximum 10 days allowed");
        }

        WeatherResponse weatherResponse = getData(city);

        List<DayTemp> dayList = new ArrayList<>();

        String url = UriComponentsBuilder.fromHttpUrl(apiForecastUrl)
                .queryParam("key", apiKey)
                .queryParam("q", city)
                .queryParam("days", days)
                .toUriString();

        Root apiResponse = template.getForObject(url, Root.class);

        Forecast forecast = apiResponse.getForecast();

        for (Forecastday day : forecast.getForecastday()) {
            DayTemp d = new DayTemp();
            d.setDate(day.getDate());
            d.setMinTemp(day.getDay().mintemp_c);
            d.setAvgTemp(day.getDay().avgtemp_c);
            d.setMaxTemp(day.getDay().maxtemp_c);
            dayList.add(d);
        }

        WeatherForeCast response = new WeatherForeCast();
        response.setWeatherResponse(weatherResponse);
        response.setDayTemp(dayList);

        return response;
    }
}
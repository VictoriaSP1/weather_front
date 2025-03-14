export interface  WeatherData {
    fecha: string;
    temperatura_actual: number;
    temperatura_maxima: number;
    temperatura_minima: number;
    clima: string;
    icon: string;
}
  
export interface CITIESDATA {
    id:              number;
    slug:            string;
    city_slug:       string;
    display:         string;
    ascii_display:   string;
    city_name:       string;
    city_ascii_name: string;
    state:           string;
    country:         string;
    lat:             string;
    long:            string;
    result_type:     string;
    popularity:      string;
    weather?: WeatherData[];
}


![Intre logo](https://www.afialapis.com/os/intre/logo.png)

[![NPM Version](https://badge.fury.io/js/intre.svg)](https://www.npmjs.com/package/intre)
[![NPM Downloads](https://img.shields.io/npm/dm/intre.svg?style=flat)](https://www.npmjs.com/package/intre)

Working with dates in a simple way: using [Unix Epoch times](https://en.wikipedia.org/wiki/Unix_time). So: numbers.

# Install

```
  npm i intre
```

# Intro

`intre` is a wrap over [day.js](https://day.js.org/) providing an API to work with `int`-typed dates.


# API

## Init locale

### `async intre_locale_init(key)` and `async intre_locale_load(key)`

Preloaded locales are `en` (default) and `es`.

You may want to switch between preloaded locales with `async intre_locale_init(key)`. 

If it is not preloaded, `intre` will load it (requires a network fetch) by calling `async intre_locale_load(key)`.

Must be called once, when loading your app.

## Getters

### `intre_now()`

### `intre_noon(i)`

### `intre_from_date(d)`

### `intre_from_str(s, fmt = 'DD/MM/YYYY')`

### `intre_from_parts(y, m, d)`

## Converters

### `intre_to_date(i)`

### `intre_to_str(i, fmt = 'DD/MM/YYYY')`

### `intre_to_parts(i)`


## Prettiers

### `intre_pretty_from_now(i)`

### `intre_pretty_short(i)`

Format: _"D MMM"_

### `intre_pretty_medium(i)`

Format: _"DD MMM 'YY"_

### `intre_pretty_long(i)`
  
Format: _"DD MMMM YYYY"_

### `intre_pretty_short_with_time(i)`
  
Format: _"D MMM a las HH:MM"

### `intre_pretty_short_with_from_now(i)`
  
Format: _"D MMM (<from Now>)"_

### `intre_pretty_burocratic(i)`
  
Format: _"D de MMMM de YYYY"_


## Extract date parts

### `intre_get_seconds(i)`

### `intre_get_minutes(i)`

### `intre_get_hour(i)`

### `intre_get_day(i)`

### `intre_get_week_day(i)`

### `intre_get_month(i)`

### `intre_get_year(i)`

### `intre_get_month_name(i, long=false)`


## Checks

### `intre_are_same(i1, i2, what= 'seconds')`

`what` can be `milliseconds`, `seconds` (default), `minutes`, `hours`, `day`, `month`, `year`

### `intre_diff(i1, i2, what= 'seconds', decimals= false)`

`what` can be `milliseconds`, `seconds` (default), `minutes`, `hours`, `day`, `month`, `year`

##  Add and subtract

### `intre_add_days(i, n)`

### `intre_add_business_days(i, n, includeSaturdays= false)`

### `intre_add_months(i, n)`

### `intre_add_years(i, n)`

### `intre_sub_days(i, n)`

### `intre_sub_months(i, n)`

### `intre_sub_years(i, n)`

## Search close dates

### `intre_first_of_week(i)`

### `intre_last_of_week(i)`

### `intre_first_of_month(i)`

### `intre_last_of_month(i)`

### `intre_first_of_year(i)`

### `intre_last_of_year(i)`


## Ranges

### `intre_range(iFrom, iTo, includeTo= true)`


## List locale data


### `intre_list_first_day_of_week()`

### `intre_list_months()`

### `intre_list_months_short()`

### `intre_list_weekdays()`

### `intre_list_weekdays_short()`

### `intre_list_weekdays_min()`

### `intre_list_long_date_format(f= 'L')`

![Intre logo](https://intre.afialapis.com/logo.png)

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

### `async intre_locale_init(key)`

Locale loaded by default is `en`.

You may want to change it 

Must be called once, when loading your app.

## Getters

### `intre_now()`

### `intre_noon(e)`

### `intre_from_date(d)`

### `intre_from_str(e, fmt = 'DD/MM/YYYY')`

### `intre_from_parts(y, m, d)`

## Converters

### `intre_to_date(e)`

### `intre_to_str(e, fmt = 'DD/MM/YYYY')`

### `intre_to_parts(e)`


## Prettiers

### `intre_pretty_from_now(e)`

### `intre_pretty_short(e)`

Format: _"D MMM"_

### `intre_pretty_medium(e)`

Format: _"DD MMM 'YY"_

### `intre_pretty_long(e)`
  
Format: _"DD MMMM YYYY"_

### `intre_pretty_short_with_time(e)`
  
Format: _"D MMM a las HH:MM"

### `intre_pretty_short_with_from_now(e)`
  
Format: _"D MMM (<from Now>)"_

### `intre_pretty_burocratic(e)`
  
Format: _"D de MMMM de YYYY"_


## Extract date parts

### `intre_get_seconds(e)`

### `intre_get_minutes(e)`

### `intre_get_hour(e)`

### `intre_get_day(e)`

### `intre_get_week_day(e)`

### `intre_get_month(e)`

### `intre_get_year(e)`

### `intre_get_month_name(month, long=false)`


## Checks

### `intre_are_same(e1, e2, what= 'seconds')`

`what` can be `milliseconds`, `seconds` (default), `minutes`, `hours`, `day`, `month`, `year`

### `intre_diff(e1, e2, what= 'seconds', decimals= false)`

`what` can be `milliseconds`, `seconds` (default), `minutes`, `hours`, `day`, `month`, `year`

##  Add and subtract

### `intre_add_days(e, n)`

### `intre_add_business_days(e, n, includeSaturdays= false)`

### `intre_add_months(e, n)`

### `intre_add_years(e, n)`

### `intre_sub_days(e, n)`

### `intre_sub_months(e, n)`

### `intre_sub_years(e, n)`

## Search close dates

### `intre_first_of_week(e)`

### `intre_last_of_week(e)`

### `intre_first_of_month(e)`

### `intre_last_of_month(e)`

### `intre_first_of_year(e)`

### `intre_last_of_year(e)`


## Ranges

### `intre_range(efrom, eto, includeTo= true)`


## List locale data


### `intre_list_first_day_of_week()`

### `intre_list_months()`

### `intre_list_months_short()`

### `intre_list_weekdays()`

### `intre_list_weekdays_short()`

### `intre_list_weekdays_min()`

### `intre_list_long_date_format(f= 'L')`

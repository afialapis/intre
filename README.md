![Intre logo](https://intre.afialapis.com/logo.png)

[![NPM Version](https://badge.fury.io/js/intre.svg)](https://www.npmjs.com/package/intre)
[![NPM Downloads](https://img.shields.io/npm/dm/intre.svg?style=flat)](https://www.npmjs.com/package/intre)

Working with dates in a simple way: using [Unix Epoch times](https://en.wikipedia.org/wiki/Unix_time). So: numbers.

# Install

```
  npm i intre
```

# Intro

`intre` is a wrap over [moment.js](https://momentjs.com/) providing an API to work with `int`-typed dates.


# API


## Getters

### `epoch_now()`

### `epoch_noon(e)`

### `epoch_from_date(d)`

### `epoch_from_str(e, fmt = 'DD/MM/YYYY')`

### `epoch_from_parts(y, m, d)`

## Converters

### `epoch_to_str(e, fmt = 'DD/MM/YYYY')`

## Prettiers

### `epoch_pretty_from_now(e)`

### `epoch_pretty_short(e)`

Format: _"D MMM"_

### `epoch_pretty_medium(e)`

Format: _"DD MMM 'YY"_

### `epoch_pretty_long(e)`
  
Format: _"DD MMMM YYYY"_

### `epoch_pretty_short_with_time(e)`
  
Format: _"D MMM a las HH:MM"

### `epoch_pretty_short_with_from_now(e)`
  
Format: _"D MMM (<from Now>)"_

### `epoch_pretty_burocratic(e)`
  
Format: _"D de MMMM de YYYY"_


## Extract date parts


### `epoch_get_seconds(e)`

### `epoch_get_minutes(e)`

### `epoch_get_hour(e)`

### `epoch_get_day(e)`

### `epoch_get_week_day(e)`

### `epoch_get_month(e)`

### `epoch_get_year(e)`

### `epoch_get_month_name(month, long=false)`

## Checks

### `epoch_are_same_day(e1, e2)`

### `epoch_diff(e1, e2, w= 'seconds')`

##  Add and subtract

### `epoch_add_days(e, n)`

### `epoch_add_business_days(e, n, includeSaturdays= false)`

### `epoch_add_months(e, n)`

### `epoch_add_years(e, n)`

### `epoch_sub_months(e, n)`

## Search close dates

### `epoch_first_of_month(e)`

### `epoch_last_of_month(e)`

### `epoch_first_of_week(e)`

### `epoch_last_of_week(e)`

## Ranges

### `epoch_range(efrom, eto, includeTo= true)`



# intre

Working with dates in a simple way: using Unix Epoch times.


### `epoch_now()`

### `epoch_noon(e)`



### `epoch_from_date(d)`

### `epoch_from_str(e, fmt = 'DD/MM/YYYY')`

### `epoch_from_parts(y, m, d)`


### `epoch_to_str(e, fmt = 'DD/MM/YYYY')`

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





### `epoch_get_seconds(e)`

### `epoch_get_minutes(e)`

### `epoch_get_hour(e)`

### `epoch_get_day(e)`

### `epoch_get_week_day(e)`

### `epoch_get_month(e)`

### `epoch_get_year(e)`

### `epoch_get_month_name(month, long=false)`


### `epoch_are_same_day(e1, e2)`

### `epoch_diff(e1, e2, w= 'seconds')`


### `epoch_add_days(e, n)`

### `epoch_add_months(e, n)`

### `epoch_add_years(e, n)`

### `epoch_sub_months(e, n)`


### `epoch_first_of_month(e)`

### `epoch_last_of_month(e)`

### `epoch_first_of_week(e)`

### `epoch_last_of_week(e)`


### `epoch_range(efrom, eto, includeTo= true)`





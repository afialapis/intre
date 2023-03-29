import moment from 'moment'

function _moment(e) {
  if (e==undefined) {
    return moment()
  }
  if (typeof e === 'object') {
    return e
  }
  return moment.unix(e)
}

//
// Locales
//
export function init_locale(lang= 'es') {
  moment.locale(lang)
}


// 
// Getters
// 

export function epoch_now() {
  return moment().unix();
}

export function epoch_noon(e) {
  if (e===undefined) {
    e= epoch_now();
  }
  return _moment(e)
          .set({hour:0,minute:0,second:0,millisecond:0})
          .unix()
}

export function epoch_from_date(d) {
  return moment(d).unix();
}

export function epoch_from_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return undefined

  return moment(e,fmt).unix()
}

export function epoch_from_parts(y, m, d) {
  return moment([y,m-1,d]).unix()
}


// 
// Converters
// 

export function epoch_to_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return ''

  const m = _moment(e)

  return m.format(fmt)
}

// 
// Prettiers
// 

export function epoch_pretty_from_now(e) {
  if (!e)
    return ''

  const m = _moment(e)

  return m.fromNow()
}

export function epoch_pretty_short(e) {
  return epoch_to_str(e, 'D MMM')
}

export function epoch_pretty_medium(e) {
  return epoch_to_str(e, 'DD MMM [\']YY')
}

export function epoch_pretty_long(e) {
  return epoch_to_str(e, 'DD MMMM YYYY')
}

export function epoch_pretty_short_with_time(e) {
  return epoch_to_str(e, 'D MMM [a las] HH:mm')
}

export function epoch_pretty_short_with_from_now(e) {
  const base = epoch_to_str(e, 'D MMM')
  const frnow = epoch_pretty_from_now(e)
  return `${base} (${frnow})`
}

export function epoch_pretty_burocratic(e) {
  return epoch_to_str(e, 'D [de] MMMM [de] YYYY')
}



// 
// Extract date parts
// 

export function epoch_get_seconds (e) { return _moment(e).seconds(); }
export function epoch_get_minutes (e) { return _moment(e).minutes(); }
export function epoch_get_hour    (e) { return _moment(e).hour   (); }
export function epoch_get_day     (e) { return _moment(e).date   (); }
export function epoch_get_week_day(e) { return _moment(e).day    (); }
export function epoch_get_month   (e) { return _moment(e).month  (); }
export function epoch_get_year    (e) { return _moment(e).year   (); }

export function epoch_get_month_name(month, long=false) {
  if (! month)
    return ''
  const e= epoch_from_parts(2000, month, 1)
  const fmt= long ? 'DD/MMMM/YYYY' : 'DD/MMM/YYYY'
  const m= _moment(e)
  const s= m.format(fmt)
  const mname= s.split('/')[1]
  return mname
}


// 
// Checks
// 
export function epoch_are_same_day (e1, e2) {
  return epoch_noon(e1)==epoch_noon(e2)
}

export function epoch_diff(e1, e2, w= 'seconds') {
  return _moment(e2).diff(_moment(e1), w)
}


// 
// Add and subtract
// 

export function epoch_add_days(e, n) {
  return _moment(e).add(n, 'days').unix()
}

export function epoch_add_business_days(e, n, includeSaturdays= false) {
  const exclude_days= [
    0 // Sunday
  ]
  if (includeSaturdays !== true) {
    exclude_days.push(
      6 // Saturday
    )
  }

  let days_remaining = n
  const mom= _moment(e)

  while (days_remaining > 0) {
    mom.add(1, 'days');
    if (exclude_days.indexOf( mom.day() ) < 0) {
      days_remaining--;
    }
  }

  return mom.unix()
}

export function epoch_add_months(e, n) {
  return _moment(e).add(n, 'months').unix()
}

export function epoch_sub_months(e, n) {
  return _moment(e).subtract(n, 'months').unix()
}  

export function epoch_add_years(e, n) {
  return _moment(e).add(n, 'years').unix()
}



// 
// Search close dates
// 


export function epoch_first_of_month(e) {
  return epoch_noon(_moment(e).date(1))
}

export function epoch_last_of_month(e) {
  return epoch_noon(_moment(e).endOf('month'))
}

export function epoch_first_of_week(e) {
  return epoch_noon(_moment(e).weekday(0))
}

export function epoch_last_of_week(e) {
  return epoch_noon(_moment(e).weekday(6))
}

// 
// Ranges
// 

export function epoch_range(efrom, eto, includeTo= true) {
  const range= []
  let e= epoch_noon(efrom)
  let epTo= epoch_noon(eto)
  while (includeTo 
          ? e<=epTo
          : e<epTo) {
    range.push(e)
    e= epoch_add_days(e, 1)
  }
  return range
}


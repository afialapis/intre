import dayjs from 'dayjs'
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat.js'
import arraySupportPlugin from 'dayjs/plugin/arraySupport.js'
import weekdayPlugin from 'dayjs/plugin/weekday.js'
import localeDataPlugin from 'dayjs/plugin/localeData.js'
import relativeTimePlugin from 'dayjs/plugin/relativeTime.js'
import dayOfYearPlugin from 'dayjs/plugin/dayOfYear.js'

dayjs.extend(customParseFormatPlugin)
dayjs.extend(arraySupportPlugin)
dayjs.extend(weekdayPlugin)
dayjs.extend(localeDataPlugin)
dayjs.extend(relativeTimePlugin)
dayjs.extend(dayOfYearPlugin)

let _intre_loaded_locales= ['en'] 


function _dayjs(e) {
  if (e==undefined) {
    return dayjs()
  }
  if (typeof e === 'object') {
    return e
  }
  return dayjs.unix(e)
}

//
// Locales
//
export async function intre_locale_init(key= 'es') {
  try {
    if (_intre_loaded_locales.indexOf(key)<0) {
      await import(`dayjs/locale/${key}.js`)
    }
    dayjs.locale(key)
    _intre_loaded_locales.push(key)
  } catch(err) {
    console.error(err)
  }
  
}


// 
// Getters
// 
export function intre_now() {
  return dayjs().unix();
}

export function intre_noon(e) {
  if (e===undefined) {
    e= intre_now();
  }
  return _dayjs(e)
          .set('hour', 0).set('minute', 0).set('second', 0)
          .unix()
}

export function intre_from_date(d) {
  return dayjs(d).unix();
}

export function intre_from_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return undefined

  return dayjs(e,fmt).unix()
}

export function intre_from_parts(y, m, d) {
  return dayjs([y,m-1,d]).unix()
}


// 
// Converters
// 
export function intre_to_date (e) {
  return _dayjs(e).toDate()
}

export function intre_to_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return ''

  const m = _dayjs(e)

  return m.format(fmt)
}

export function intre_to_parts (e) {
  const m= _dayjs(e)
  const ye= m.year()
  const mo= m.month()
  const da= m.date()
  return [ye, mo, da]
}


// 
// Prettiers
// 

export function intre_pretty_from_now(e) {
  if (!e)
    return ''

  const m = _dayjs(e)

  return m.fromNow()
}

export function intre_pretty_short(e) {
  return intre_to_str(e, 'D MMM')
}

export function intre_pretty_medium(e) {
  return intre_to_str(e, 'DD MMM [\']YY')
}

export function intre_pretty_long(e) {
  return intre_to_str(e, 'DD MMMM YYYY')
}

export function intre_pretty_short_with_time(e) {
  return intre_to_str(e, 'D MMM [a las] HH:mm')
}

export function intre_pretty_short_with_from_now(e) {
  const base = intre_to_str(e, 'D MMM')
  const frnow = intre_pretty_from_now(e)
  return `${base} (${frnow})`
}

export function intre_pretty_burocratic(e) {
  return intre_to_str(e, 'D [de] MMMM [de] YYYY')
}



// 
// Extract date parts
// 

export function intre_get_seconds (e) { return _dayjs(e).second(); }
export function intre_get_minutes (e) { return _dayjs(e).minute(); }
export function intre_get_hour    (e) { return _dayjs(e).hour  (); }
export function intre_get_day     (e) { return _dayjs(e).date  (); }
export function intre_get_week_day(e) { return _dayjs(e).day   (); }
export function intre_get_month   (e) { return _dayjs(e).month (); }
export function intre_get_year    (e) { return _dayjs(e).year  (); }

export function intre_get_month_name(e, long=false) {
  if (! e)
    return ''
  const fmt= long ? 'MMMM' : 'MMM'
  return _dayjs(e).format(fmt)
}


// 
// Checks
// 
export function intre_are_same (e1, e2, what= 'seconds', decimals= false) {
  return _dayjs(e1).isSame(_dayjs(e2), what, decimals)

}

export function intre_diff(e1, e2, what= 'seconds') {
  return _dayjs(e1).diff(_dayjs(e2), what)
}


// 
// Add and subtract
// 

export function intre_add_days(e, n) {
  return _dayjs(e).add(n, 'days').unix()
}

export function intre_add_business_days(e, n, includeSaturdays= false) {
  const exclude_days= [
    0 // Sunday
  ]
  if (includeSaturdays !== true) {
    exclude_days.push(
      6 // Saturday
    )
  }

  let days_remaining = n
  let mom= _dayjs(e)

  while (days_remaining > 0) {
    mom= mom.add(1, 'days');
    if (exclude_days.indexOf( mom.day() ) < 0) {
      days_remaining--;
    }
  }

  return mom.unix()
}

export function intre_add_months(e, n) {
  return _dayjs(e).add(n, 'months').unix()
}

export function intre_add_years(e, n) {
  return _dayjs(e).add(n, 'years').unix()
}

export function intre_sub_days(e, n) {
  return _dayjs(e).subtract(n, 'days').unix()
}

export function intre_sub_months(e, n) {
  return _dayjs(e).subtract(n, 'months').unix()
}  

export function intre_sub_years(e, n) {
  return _dayjs(e).subtract(n, 'years').unix()
}


// 
// Search close dates
// 

export function intre_first_of_week(e) {
  return intre_noon(_dayjs(e).weekday(0))
}

export function intre_last_of_week(e) {
  return intre_noon(_dayjs(e).weekday(6))
}

export function intre_first_of_month(e) {
  return intre_noon(_dayjs(e).date(1))
}

export function intre_last_of_month(e) {
  return intre_noon(_dayjs(e).endOf('month'))
}

export function intre_first_of_year(e) {
  return intre_noon(_dayjs(e).dayOfYear(1))
}

export function intre_last_of_year(e) {
  return intre_noon(_dayjs(e).endOf('year'))
}


// 
// Ranges
// 

export function intre_range(efrom, eto, includeTo= true) {
  const range= []
  let e= intre_noon(efrom)
  let epTo= intre_noon(eto)
  while (includeTo 
          ? e<=epTo
          : e<epTo) {
    range.push(e)
    e= intre_add_days(e, 1)
  }

  return range
}



// 
// List locale data
// 

function _intre_locale_data() {
  return dayjs().localeData()

}

export function intre_list_first_day_of_week() {
  return _intre_locale_data().firstDayOfWeek()
}

export function intre_list_months() {
  return _intre_locale_data().months()
}

export function intre_list_months_short() {
  return _intre_locale_data().monthsShort()
}

export function intre_list_weekdays() {
  return _intre_locale_data().weekdays()
}

export function intre_list_weekdays_short() {
  return _intre_locale_data().weekdaysShort()
}

export function intre_list_weekdays_min() {
  return _intre_locale_data().weekdaysMin()
}

export function intre_list_long_date_format(f= 'L') {
  return _intre_locale_data().longDateFormat(f)
}

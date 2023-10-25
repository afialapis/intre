import dayjs from 'dayjs'
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat.js'
import arraySupportPlugin from 'dayjs/plugin/arraySupport.js'
import weekdayPlugin from 'dayjs/plugin/weekday.js'
import localeDataPlugin from 'dayjs/plugin/localeData.js'
import relativeTimePlugin from 'dayjs/plugin/relativeTime.js'
import dayOfYearPlugin from 'dayjs/plugin/dayOfYear.js'

import _localeES from 'dayjs/locale/es.js'
//import _localeFR from 'dayjs/locale/fr.js'
//import _localePT from 'dayjs/locale/pt.js'


dayjs.extend(customParseFormatPlugin)
dayjs.extend(arraySupportPlugin)
dayjs.extend(weekdayPlugin)
dayjs.extend(localeDataPlugin)
dayjs.extend(relativeTimePlugin)
dayjs.extend(dayOfYearPlugin)

let _intre_loaded_locales= ['en', 'es'] 

function _dayjs(i) {
  if (i==undefined) {
    return dayjs()
  }
  if (typeof i === 'object') {
    return i
  }
  return dayjs.unix(i)
}

//
// Locales
//
export async function intre_locale_init(key= 'es') {
  try {
    if (_intre_loaded_locales.indexOf(key)<0) {
      const _ = typeof window === 'object'
        ? await import(`https://unpkg.com/dayjs/locale/${key}.js`)
        : await import(`dayjs/locale/${key}.js`)
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

export function intre_noon(i) {
  if (i===undefined) {
    i= intre_now();
  }
  return _dayjs(i)
          .set('hour', 0).set('minute', 0).set('second', 0)
          .unix()
}

export function intre_from_date(d) {
  return dayjs(d).unix();
}

export function intre_from_str (s, fmt = 'DD/MM/YYYY') {
  if (!s)
    return undefined

  return dayjs(s,fmt).unix()
}

export function intre_from_parts(y, m, d) {
  return dayjs([y,m-1,d]).unix()
}


// 
// Converters
// 
export function intre_to_date (i) {
  return _dayjs(i).toDate()
}

export function intre_to_str (i, fmt = 'DD/MM/YYYY') {
  if (!i)
    return ''

  const m = _dayjs(i)

  return m.format(fmt)
}

export function intre_to_parts (i) {
  const m= _dayjs(i)
  const ye= m.year()
  const mo= m.month()
  const da= m.date()
  return [ye, mo, da]
}


// 
// Prettiers
// 

export function intre_pretty_from_now(i) {
  if (!i)
    return ''

  const m = _dayjs(i)

  return m.fromNow()
}

export function intre_pretty_short(i) {
  return intre_to_str(i, 'D MMM')
}

export function intre_pretty_medium(i) {
  return intre_to_str(i, 'DD MMM [\']YY')
}

export function intre_pretty_long(i) {
  return intre_to_str(i, 'DD MMMM YYYY')
}

export function intre_pretty_short_with_time(i) {
  return intre_to_str(i, 'D MMM [a las] HH:mm')
}

export function intre_pretty_short_with_from_now(i) {
  const base = intre_to_str(i, 'D MMM')
  const frnow = intre_pretty_from_now(i)
  return `${base} (${frnow})`
}

export function intre_pretty_burocratic(i) {
  return intre_to_str(i, 'D [de] MMMM [de] YYYY')
}



// 
// Extract date parts
// 

export function intre_get_seconds (i) { return _dayjs(i).second(); }
export function intre_get_minutes (i) { return _dayjs(i).minute(); }
export function intre_get_hour    (i) { return _dayjs(i).hour  (); }
export function intre_get_day     (i) { return _dayjs(i).date  (); }
export function intre_get_week_day(i) { return _dayjs(i).day   (); }
export function intre_get_month   (i) { return _dayjs(i).month (); }
export function intre_get_year    (i) { return _dayjs(i).year  (); }

export function intre_get_month_name(i, long=false) {
  if (!i)
    return ''
  const fmt= long ? 'MMMM' : 'MMM'
  return _dayjs(i).format(fmt)
}


// 
// Checks
// 
export function intre_are_same (i1, i2, what= 'seconds', decimals= false) {
  return _dayjs(i1).isSame(_dayjs(i2), what, decimals)

}

export function intre_diff(i1, i2, what= 'seconds') {
  return _dayjs(i1).diff(_dayjs(i2), what)
}


// 
// Add and subtract
// 

export function intre_add_days(i, n) {
  return _dayjs(i).add(n, 'days').unix()
}

export function intre_add_business_days(i, n, includeSaturdays= false) {
  const exclude_days= [
    0 // Sunday
  ]
  if (includeSaturdays !== true) {
    exclude_days.push(
      6 // Saturday
    )
  }

  let days_remaining = n
  let mom= _dayjs(i)

  while (days_remaining > 0) {
    mom= mom.add(1, 'days');
    if (exclude_days.indexOf( mom.day() ) < 0) {
      days_remaining--;
    }
  }

  return mom.unix()
}

export function intre_add_months(i, n) {
  return _dayjs(i).add(n, 'months').unix()
}

export function intre_add_years(i, n) {
  return _dayjs(i).add(n, 'years').unix()
}

export function intre_sub_days(i, n) {
  return _dayjs(i).subtract(n, 'days').unix()
}

export function intre_sub_months(i, n) {
  return _dayjs(i).subtract(n, 'months').unix()
}  

export function intre_sub_years(i, n) {
  return _dayjs(i).subtract(n, 'years').unix()
}


// 
// Search close dates
// 

export function intre_first_of_week(i) {
  return intre_noon(_dayjs(i).weekday(0))
}

export function intre_last_of_week(i) {
  return intre_noon(_dayjs(i).weekday(6))
}

export function intre_first_of_month(i) {
  return intre_noon(_dayjs(i).date(1))
}

export function intre_last_of_month(i) {
  return intre_noon(_dayjs(i).endOf('month'))
}

export function intre_first_of_year(i) {
  return intre_noon(_dayjs(i).dayOfYear(1))
}

export function intre_last_of_year(i) {
  return intre_noon(_dayjs(i).endOf('year'))
}


// 
// Ranges
// 

export function intre_range(iFrom, iTo, includeTo= true) {
  const range= []
  let iiFrom= intre_noon(iFrom)
  let iiTo= intre_noon(iTo)
  while (includeTo 
          ? iiFrom<=iiTo
          : iiFrom<iiTo) {
    range.push(iiFrom)
    iiFrom= intre_add_days(iiFrom, 1)
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

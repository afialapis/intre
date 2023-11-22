const expect= global.expect
const MAY_THE_FORCE = 1651615200

describe('Intre - EN locale', function () {
  this.timeout(100)


  it("switch to EN locale", async () => {   
    
    const {
      intre_locale_init,
    } = global.intre
    
    await intre_locale_init('en')
  })


  it("check prettiers", async () => {   
    
    const {
      intre_now,
      intre_pretty_from_now,
      intre_pretty_short,
      intre_pretty_medium,
      intre_pretty_long,
      intre_pretty_short_with_time,
      intre_pretty_short_with_from_now,
      intre_pretty_burocratic,
      intre_diff
    } = global.intre

    const mdiff = intre_diff(intre_now(), MAY_THE_FORCE, 'months')
    let ydiff = 2
    if (mdiff >= 24) {
      ydiff = Math.round(mdiff/24)
    }
    let ago
    if (mdiff < 18) {
      ago= 'a year ago'
    } else {
      //const numname= {2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six'}
      //ago= `${numname[ydiff]} years ago`
      ago= `${ydiff} years ago`
    }

    expect(intre_pretty_from_now(MAY_THE_FORCE)).to.equal(ago)
    expect(intre_pretty_short(MAY_THE_FORCE)).to.equal('4 May')
    expect(intre_pretty_medium(MAY_THE_FORCE)).to.equal("04 May '22")
    expect(intre_pretty_long(MAY_THE_FORCE)).to.equal('04 May 2022')
    expect(intre_pretty_short_with_time(MAY_THE_FORCE + 15*60*60 + 30*60)).to.equal('4 May a las 15:30')
    expect(intre_pretty_short_with_from_now(MAY_THE_FORCE)).to.equal(`4 May (${ago})`)
    expect(intre_pretty_burocratic(MAY_THE_FORCE)).to.equal('4 de May de 2022')
  })  

  it("check extractors (names)", async () => {   
    
    const {
      intre_get_month_name,
      intre_get_day_name
    } = global.intre

    const h15= 15*60*60
    const m33= 33*60

    const i= MAY_THE_FORCE + h15 + m33 + 42

    expect(intre_get_month_name(i, false)).to.equal('May')
    expect(intre_get_month_name(i, true)).to.equal('May')
    expect(intre_get_day_name(i, false)).to.equal('We')
    expect(intre_get_day_name(i, true)).to.equal('Wednesday')
  })  

  it("check close dates (depends on week first day)", async () => {   
    
    const {
      intre_from_str,
      intre_first_of_week,
      intre_last_of_week
    } = global.intre

    expect(intre_first_of_week(MAY_THE_FORCE)).to.equal(intre_from_str('01/05/2022', 'DD/MM/YYYY'))
    expect(intre_last_of_week(MAY_THE_FORCE)).to.equal(intre_from_str('07/05/2022', 'DD/MM/YYYY'))
  })  

  it("check locale datas", async () => {   
    
    const {
      intre_list_first_day_of_week,
      intre_list_months,
      intre_list_months_short,
      intre_list_weekdays,
      intre_list_weekdays_short,
      intre_list_weekdays_min,
      // intre_list_long_date_format
    } = global.intre

    const months= [
      'January',   'February',
      'March',     'April',
      'May',       'June',
      'July',      'August',
      'September', 'October',
      'November',  'December'
    ]
    
    const months_short= [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ]
    
    const weekdays= [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    
    const weekdays_short= [
      'Sun', 'Mon',
      'Tue', 'Wed',
      'Thu', 'Fri',
      'Sat'
    ]
    
    const weekdays_min= [
      'Su', 'Mo',
      'Tu', 'We',
      'Th', 'Fr',
      'Sa'
    ]
    
    // const long_date_format= "MM/DD/YYYY"

    expect(intre_list_first_day_of_week(1)).to.equal(0)
    expect(JSON.stringify(intre_list_months())).to.equal(JSON.stringify(months))
    expect(JSON.stringify(intre_list_months_short())).to.equal(JSON.stringify(months_short))
    expect(JSON.stringify(intre_list_weekdays())).to.equal(JSON.stringify(weekdays))
    expect(JSON.stringify(intre_list_weekdays_short())).to.equal(JSON.stringify(weekdays_short))
    expect(JSON.stringify(intre_list_weekdays_min())).to.equal(JSON.stringify(weekdays_min))
    
    // This is crashing:
    //   TypeError: Cannot read properties of undefined (reading 'L')
    // Maybe: https://github.com/iamkun/dayjs/issues/1756
    // expect(JSON.stringify(intre_list_long_date_format())).to.equal(JSON.stringify(long_date_format))
  })  

})



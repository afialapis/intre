const expect= global.expect
const MAY_THE_FORCE = 1651615200

describe('Intre - IT locale', function () {
  this.timeout(2000)


  it("switch to IT locale", async () => {   
    
    const {
      intre_locale_init,
    } = global.intre
    
    await intre_locale_init('it')
  })

  it("check week days", async () => {   
    
    const {
      intre_get_week_day,
      intre_set_week_day,
      intre_get_week_day_name
    } = global.intre

    expect(intre_get_week_day(MAY_THE_FORCE)).to.equal(2)
    expect(intre_get_week_day_name(MAY_THE_FORCE, false)).to.equal('Me')
    expect(intre_get_week_day_name(MAY_THE_FORCE, true)).to.equal('Mercoledì')

    const i= intre_set_week_day(MAY_THE_FORCE, 3) 

    expect(intre_get_week_day_name(i, false)).to.equal('Gi')
    expect(intre_get_week_day_name(i, true)).to.equal('Giovedì')
    expect(i>MAY_THE_FORCE).to.equal(true)
  })  

  it("check month names", async () => {   
    
    const {
      intre_get_month_name
    } = global.intre

    expect(intre_get_month_name(MAY_THE_FORCE, false)).to.equal('Mag')
    expect(intre_get_month_name(MAY_THE_FORCE, true)).to.equal('Maggio')
  })  


  it("check prettiers", async () => {   
    
    const {
      intre_diff,
      intre_now,
      intre_pretty_from_now,
      intre_pretty_short,
      intre_pretty_medium,
      intre_pretty_long,
      intre_pretty_short_with_time,
      intre_pretty_short_with_from_now,
      intre_pretty_burocratic
    } = global.intre

    const mdiff = intre_diff(intre_now(), MAY_THE_FORCE, 'months')
    let ydiff = 3
    if (mdiff >= 24) {
      ydiff = 3 + parseInt((mdiff % 24) / 12)
    }
    let ago
    if (mdiff < 18) {
      ago= 'un anno fa'
    } else {
      //const numname= {2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis'}
      //ago= `hace ${numname[ydiff]} años`
      ago= `${ydiff} anni fa`
    }    

    expect(intre_pretty_from_now(MAY_THE_FORCE)).to.equal(ago)
    expect(intre_pretty_short(MAY_THE_FORCE)).to.equal('4 mag')
    expect(intre_pretty_medium(MAY_THE_FORCE)).to.equal("04 mag '22")
    expect(intre_pretty_long(MAY_THE_FORCE)).to.equal('04 maggio 2022')
    expect(intre_pretty_short_with_time(MAY_THE_FORCE + 15*60*60 + 30*60)).to.equal('4 mag a las 15:30')
    expect(intre_pretty_short_with_from_now(MAY_THE_FORCE)).to.equal(`4 mag (${ago})`)
    expect(intre_pretty_burocratic(MAY_THE_FORCE)).to.equal('4 de maggio de 2022')
  })  

  it("check close dates (depends on week first day)", async () => {   
    
    const {
      intre_from_str,
      intre_first_of_week,
      intre_last_of_week
    } = global.intre

    expect(intre_first_of_week(MAY_THE_FORCE)).to.equal(intre_from_str('02/05/2022', 'DD/MM/YYYY'))
    expect(intre_last_of_week(MAY_THE_FORCE)).to.equal(intre_from_str('08/05/2022', 'DD/MM/YYYY'))
  })  

  it("check locale datas", async () => {   
    const {
      intre_list_first_day_of_week,
      intre_list_months,
      intre_list_months_short,
      intre_list_weekdays,
      intre_list_weekdays_short,
      intre_list_weekdays_min,
      intre_list_long_date_format
    } = global.intre

    const months= ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"]
    const months_short= ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
    const weekdays= ["lunedì","martedì","mercoledì","giovedì","venerdì","sabato","domenica"]
    const weekdays_short= ["lun","mar","mer","gio","ven","sab","dom"]
    const weekdays_min= ["lu","ma","me","gi","ve","sa","do"]
    const long_date_format= "DD/MM/YYYY"

    expect(intre_list_first_day_of_week(1)).to.equal(1)
    expect(JSON.stringify(intre_list_months())).to.equal(JSON.stringify(months))
    expect(JSON.stringify(intre_list_months_short())).to.equal(JSON.stringify(months_short))
    expect(JSON.stringify(intre_list_weekdays())).to.equal(JSON.stringify(weekdays))
    expect(JSON.stringify(intre_list_weekdays_short())).to.equal(JSON.stringify(weekdays_short))
    expect(JSON.stringify(intre_list_weekdays_min())).to.equal(JSON.stringify(weekdays_min))
    expect(JSON.stringify(intre_list_long_date_format('L'))).to.equal(JSON.stringify(long_date_format))
  })  

})



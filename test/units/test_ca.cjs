const expect= global.expect
const MAY_THE_FORCE = 1651615200

describe('Intre - CA locale', function () {
  this.timeout(2000)


  it("switch to CA locale", async () => {   
    
    const {
      intre_locale_init,
    } = global.intre
    
    await intre_locale_init('ca')
  })

  it("check week days", async () => {   
    
    const {
      intre_get_week_day,
      intre_set_week_day,
      intre_get_week_day_name
    } = global.intre

    expect(intre_get_week_day(MAY_THE_FORCE)).to.equal(2)
    expect(intre_get_week_day_name(MAY_THE_FORCE, false)).to.equal('Dc')
    expect(intre_get_week_day_name(MAY_THE_FORCE, true)).to.equal('Dimecres')

    const i= intre_set_week_day(MAY_THE_FORCE, 3) 

    expect(intre_get_week_day_name(i, false)).to.equal('Dj')
    expect(intre_get_week_day_name(i, true)).to.equal('Dijous')
    expect(i>MAY_THE_FORCE).to.equal(true)
  })  

  it("check month names", async () => {   
    
    const {
      intre_get_month_name
    } = global.intre

    expect(intre_get_month_name(MAY_THE_FORCE, false)).to.equal('Maig')
    expect(intre_get_month_name(MAY_THE_FORCE, true)).to.equal('Maig')
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
      ago= 'fa un any'
    } else {
      //const numname= {2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis'}
      //ago= `hace ${numname[ydiff]} años`
      ago= `fa ${ydiff} anys`
    }    

    expect(intre_pretty_from_now(MAY_THE_FORCE)).to.equal(ago)
    expect(intre_pretty_short(MAY_THE_FORCE)).to.equal('4 Maig')
    expect(intre_pretty_medium(MAY_THE_FORCE)).to.equal("04 Maig '22")
    expect(intre_pretty_long(MAY_THE_FORCE)).to.equal('04 Maig 2022')
    expect(intre_pretty_short_with_time(MAY_THE_FORCE + 15*60*60 + 30*60)).to.equal('4 Maig a las 15:30')
    expect(intre_pretty_short_with_from_now(MAY_THE_FORCE)).to.equal(`4 Maig (${ago})`)
    expect(intre_pretty_burocratic(MAY_THE_FORCE)).to.equal('4 de Maig de 2022')
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

    
    const months= ["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"]
    const months_short= ["Gen.","Febr.","Març","Abr.","Maig","Juny","Jul.","Ag.","Set.","Oct.","Nov.","Des."]
    const weekdays= ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"]
    const weekdays_short= ["Dl.","Dt.","Dc.","Dj.","Dv.","Ds.","Dg."]
    const weekdays_min= ["Dl","Dt","Dc","Dj","Dv","Ds","Dg"]
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

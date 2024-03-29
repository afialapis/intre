const expect= global.expect
const MAY_THE_FORCE = 1651615200

describe('Intre - i18n', function () {
  this.timeout(100)

  it("check getters", async () => {   
    const {
      intre_now,
      intre_noon,
      intre_from_date,
      intre_from_str,
      intre_from_parts
    } = global.intre

    // Now
    const inow= intre_now()
    const jnow= parseInt(Date.now()/1000)
    expect(inow).to.equal(jnow)

    // Noon
    const inoon= intre_noon()
    const jnoon= parseInt( (new Date(Date.now())).setHours(0, 0, 0, 0) / 1000)
    expect(inoon).to.equal(jnoon)

    const may04= intre_from_str('04/05/2022', 'DD/MM/YYYY')
    expect(may04).to.equal(MAY_THE_FORCE)

    const may04p= intre_from_str('04/05/2022 15:00:00', 'DD/MM/YYYY HH:mm:ss')
    expect(may04p).to.equal(MAY_THE_FORCE + (15*60*60))
    
    const may04d= intre_from_date(new Date(2022, 4, 4))
    expect(may04d).to.equal(MAY_THE_FORCE)

    const may04r= intre_from_parts(2022, 5, 4)
    expect(may04r).to.equal(MAY_THE_FORCE)
  })

  it("check converters", async () => {   
    
    const {
      intre_to_str,
      intre_to_date,
      intre_to_parts
    } = global.intre

    const idate= intre_to_date(MAY_THE_FORCE) 
    const jdate= new Date(2022, 4, 4)
    expect(idate.toString()).to.equal(jdate.toString())

    const istr= intre_to_str(MAY_THE_FORCE, 'DD/MM/YYYY')
    expect(istr).to.equal('04/05/2022')

    const iparts= intre_to_parts(MAY_THE_FORCE)
    expect(JSON.stringify(iparts)).to.equal(JSON.stringify([2022, 4, 4]))
  })  

  it("check setters", async () => {   
    
    const {
      intre_get_seconds,
      intre_get_minutes,
      intre_get_hour,
      intre_get_day,
      intre_get_month,
      intre_get_year,
      intre_set_seconds,
      intre_set_minutes,
      intre_set_hour,
      intre_set_day,
      intre_set_month,
      intre_set_year
    } = global.intre

    const i= 
      intre_set_year(
        intre_set_month(
          intre_set_day(
            intre_set_hour(
              intre_set_minutes(
                intre_set_seconds(
                  MAY_THE_FORCE, 42
                ), 33
              ), 15
            ), 10
          ), 3
        ), 2023
      )

    expect(intre_get_seconds(i)).to.equal(42)
    expect(intre_get_minutes(i)).to.equal(33)
    expect(intre_get_hour(i)).to.equal(15)
    expect(intre_get_day(i)).to.equal(10)
    expect(intre_get_month(i)).to.equal(3)
    expect(intre_get_year(i)).to.equal(2023)
  })  

  it("check extractors", async () => {   
    
    const {
      intre_get_seconds,
      intre_get_minutes,
      intre_get_hour,
      intre_get_day,
      intre_get_week_day,
      intre_get_month,
      intre_get_year
    } = global.intre


    const h15= 15*60*60
    const m33= 33*60

    const i= MAY_THE_FORCE + h15 + m33 + 42

    expect(intre_get_seconds(i)).to.equal(42)
    expect(intre_get_minutes(i)).to.equal(33)
    expect(intre_get_hour(i)).to.equal(15)
    expect(intre_get_day(i)).to.equal(4)
    expect(intre_get_week_day(i)).to.equal(3)
    expect(intre_get_month(i)).to.equal(4)
    expect(intre_get_year(i)).to.equal(2022)
  })  

  it("check checkers", async () => {   
    
    const {
      intre_are_same,
      intre_diff
    } = global.intre

    const m= 60
    const h= 60*60
    const d= 24*h

    const m33= 33*m
    const m34= 34*m
    
    const h15= 15*h
    const h16= 16*h
    const d1= 1*d

    const i= MAY_THE_FORCE + h15 + m33 + 42

    expect(intre_are_same(i, MAY_THE_FORCE + h15 + m33 + 42, 'seconds')).to.equal(true)
    expect(intre_are_same(i, MAY_THE_FORCE + h15 + m33, 'seconds')).to.equal(false)
    
    expect(intre_are_same(i, MAY_THE_FORCE + h15 + m33, 'minutes')).to.equal(true)
    expect(intre_are_same(i, MAY_THE_FORCE + h15 + m34, 'minutes')).to.equal(false)
    
    expect(intre_are_same(i, MAY_THE_FORCE + h15, 'hours')).to.equal(true)
    expect(intre_are_same(i, MAY_THE_FORCE + h16, 'hours')).to.equal(false)
    
    expect(intre_are_same(i, MAY_THE_FORCE + d1, 'day')).to.equal(false)
    expect(intre_are_same(i, MAY_THE_FORCE + h15, 'day')).to.equal(true)

    expect(intre_diff(MAY_THE_FORCE, MAY_THE_FORCE + h15 + m33 + 42, 'seconds')).to.equal(-1 * (h15 + m33 + 42))
    expect(intre_diff(MAY_THE_FORCE, MAY_THE_FORCE + h15 + m34, 'minutes')).to.equal(-1 * (15*60 + 34))
    expect(intre_diff(MAY_THE_FORCE, MAY_THE_FORCE + h16, 'hours')).to.equal(-16)
    expect(intre_diff(MAY_THE_FORCE, MAY_THE_FORCE + d1, 'day')).to.equal(-1)
  })  

  it("check add and subtract", async () => {   
    
    const {
      intre_from_str,
      intre_add_days,
      intre_add_business_days,
      intre_add_months,
      intre_add_years,
      intre_sub_days,
      intre_sub_business_days,
      intre_sub_months,
      intre_sub_years
    } = global.intre
    
    const e_sub_2_years= intre_from_str('04/05/2020', 'DD/MM/YYYY')
    const e_sub_5_months= intre_from_str('04/12/2021', 'DD/MM/YYYY')

    const e_sub_25_lab_days= intre_from_str('30/03/2022', 'DD/MM/YYYY')    
    const e_sub_25_lab_days_inc_sat= intre_from_str('05/04/2022', 'DD/MM/YYYY')
    const e_sub_25_days= intre_from_str('09/04/2022', 'DD/MM/YYYY')
    
    const e_add_25_days= intre_from_str('29/05/2022', 'DD/MM/YYYY')
    const e_add_25_lab_days_inc_sat= intre_from_str('02/06/2022', 'DD/MM/YYYY')
    const e_add_25_lab_days= intre_from_str('08/06/2022', 'DD/MM/YYYY')
    
    const e_add_5_months= intre_from_str('04/10/2022', 'DD/MM/YYYY')
    const e_add_2_years= intre_from_str('04/05/2024', 'DD/MM/YYYY')
    

    // add positive numbers
    expect(intre_add_days(MAY_THE_FORCE, 25)).to.equal(e_add_25_days)
    expect(intre_add_business_days(MAY_THE_FORCE, 25, /*includeSaturdays=*/ false)).to.equal(e_add_25_lab_days)
    expect(intre_add_business_days(MAY_THE_FORCE, 25, /*includeSaturdays=*/ true)).to.equal(e_add_25_lab_days_inc_sat)
    expect(intre_add_months(MAY_THE_FORCE, 5)).to.equal(e_add_5_months)
    expect(intre_add_years(MAY_THE_FORCE, 2)).to.equal(e_add_2_years)

    // add negative numbers
    expect(intre_add_days(MAY_THE_FORCE, -25)).to.equal(e_sub_25_days)
    expect(intre_add_business_days(MAY_THE_FORCE, -25, /*includeSaturdays=*/ false)).to.equal(e_sub_25_lab_days)
    expect(intre_add_business_days(MAY_THE_FORCE, -25, /*includeSaturdays=*/ true)).to.equal(e_sub_25_lab_days_inc_sat)
    expect(intre_add_months(MAY_THE_FORCE, -5)).to.equal(e_sub_5_months)
    expect(intre_add_years(MAY_THE_FORCE, -2)).to.equal(e_sub_2_years)

    // sub positive numbers
    expect(intre_sub_days(MAY_THE_FORCE, 25)).to.equal(e_sub_25_days)
    expect(intre_sub_business_days(MAY_THE_FORCE, 25, /*includeSaturdays=*/ false)).to.equal(e_sub_25_lab_days)
    expect(intre_sub_business_days(MAY_THE_FORCE, 25, /*includeSaturdays=*/ true)).to.equal(e_sub_25_lab_days_inc_sat)
    expect(intre_sub_months(MAY_THE_FORCE, 5)).to.equal(e_sub_5_months)
    expect(intre_sub_years(MAY_THE_FORCE, 2)).to.equal(e_sub_2_years)

    // sub negative numbers
    expect(intre_sub_days(MAY_THE_FORCE, -25)).to.equal(e_add_25_days)
    expect(intre_sub_business_days(MAY_THE_FORCE, -25, /*includeSaturdays=*/ false)).to.equal(e_add_25_lab_days)
    expect(intre_sub_business_days(MAY_THE_FORCE, -25, /*includeSaturdays=*/ true)).to.equal(e_add_25_lab_days_inc_sat)
    expect(intre_sub_months(MAY_THE_FORCE, -5)).to.equal(e_add_5_months)
    expect(intre_sub_years(MAY_THE_FORCE, -2)).to.equal(e_add_2_years)    
  })  

  it("check close dates", async () => {   
    
    const {
      intre_from_str,
      intre_first_of_month,
      intre_last_of_month,
      intre_first_of_year,
      intre_last_of_year
    } = global.intre

    expect(intre_first_of_month(MAY_THE_FORCE)).to.equal(intre_from_str('01/05/2022', 'DD/MM/YYYY'))
    expect(intre_last_of_month(MAY_THE_FORCE)).to.equal(intre_from_str('31/05/2022', 'DD/MM/YYYY'))

    expect(intre_first_of_year(MAY_THE_FORCE)).to.equal(intre_from_str('01/01/2022', 'DD/MM/YYYY'))
    expect(intre_last_of_year(MAY_THE_FORCE)).to.equal(intre_from_str('31/12/2022', 'DD/MM/YYYY'))
  })  

  it("check range", async () => {   
    
    const {
      intre_from_str,
      intre_range
    } = global.intre

    const d= 24*60*60

    const irange= intre_range(MAY_THE_FORCE, MAY_THE_FORCE+ (d*10), false)
    const jrange= Array(10).fill(0).map( (_,idx) => {
      const dstr= `${String(4 + idx).padStart(2, '0')}/05/2022`
      return intre_from_str(dstr, 'DD/MM/YYYY')
    })

    expect(JSON.stringify(irange)).to.equal(JSON.stringify(jrange))
  })  

})



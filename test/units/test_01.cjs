// const expect= global.expect
import { red, green, blue, blue_light } from 'farrapa-colors'

describe('Intre', function () {
  this.timeout(100)

  it("should check several intre functions", async () => {   
    
    const {
      epoch_now,
      epoch_noon,
      epoch_to_str,
      epoch_from_date,
      epoch_from_str,
      //epoch_from_parts,
      //epoch_get_seconds,
      //epoch_get_minutes,
      //epoch_get_hour,
      //epoch_get_day,
      //epoch_get_week_day,
      //epoch_get_month,
      //epoch_get_year,
      //epoch_get_month_name,
      epoch_are_same_day,
      epoch_diff,
      epoch_add_days,
      epoch_add_business_days,
      epoch_add_months,
      epoch_add_years,
      epoch_sub_months,
      epoch_first_of_month,
      epoch_last_of_month,
      epoch_first_of_week,
      epoch_last_of_week,
      epoch_range
    } = global.intre


    function check(e,n) {
      console.log(`${blue(n)} is ${blue_light(epoch_to_str(e, 'DD MMM YYYY HH:mm:ss'))}`)
    }
    
    

    const now= epoch_now()
    const today= epoch_noon()
    
    check(now, 'now')
    check(today, 'today')
    
    const may04= epoch_from_str('04/05/2022', 'DD/MM/YYYY')
    const may04noon= epoch_from_str('04/05/2022 15:00:00', 'DD/MM/YYYY HH:mm:ss')
    
    check(may04, 'May 04')
    check(may04noon, 'May 04 - noon')
    
    const may04d= epoch_from_date(new Date(2022, 4, 4))
    check(may04d, 'May 04 - from date')
    
    check(epoch_noon(may04), 'Day Of: May 04')
    check(epoch_noon(may04noon), 'Day Of: May 04 - noon')
    
    const may04_same= epoch_are_same_day(may04, may04noon)
    console.log(`May 04 / May 04 - noon => are the same day? ${may04_same ? green('yes') : red('no!')}`)
    
    const jun18= epoch_from_str('18/06/2022', 'DD/MM/YYYY')
    const jun18night= epoch_from_str('18/06/2022 23:00:00', 'DD/MM/YYYY HH:mm:ss')
    
    check(jun18, 'Jun 18')
    check(jun18night, 'Jun 18 - night')
    
    check(epoch_noon(jun18), 'Day Of: Jun 18')
    check(epoch_noon(jun18night), 'Day Of: Jun 18 - night')
    
    const jun18_same= epoch_are_same_day(jun18, jun18night)
    console.log(`Jun 18 / Jun 18 - night => are the same day? ${jun18_same ? green('yes') : red('no!')}`)
    
    const diffa= epoch_diff(may04, jun18)
    const diffb= epoch_diff(may04, jun18night)
    
    console.log(`From 04 May to 18 Jun => ${diffa}`)
    console.log(`From 04 May to 18 Jun night => ${diffb}`)
    
    check(epoch_add_days(jun18, 1), '1 day after Jun 18')
    check(epoch_add_days(jun18, 11), '11 days after Jun 18')
    check(epoch_add_business_days(jun18, 11), '11 working days after Jun 18')
    check(epoch_add_business_days(jun18, 11, true), '11 working days (including saturday) after Jun 18')
    
    check(epoch_add_months(jun18, 1), '1 month after Jun 18')
    check(epoch_add_months(jun18, 11), '11 month after Jun 18')
    
    check(epoch_sub_months(jun18, 1), '1 month before Jun 18')
    check(epoch_sub_months(jun18, 11), '11 month before Jun 18')
    
    check(epoch_add_years(jun18, 1), '1 year after Jun 18')
    check(epoch_add_years(jun18, 11), '11 year after Jun 18')
    
    check(epoch_first_of_month(jun18), 'First of month from Jun 18')
    check(epoch_first_of_week(jun18), 'First of week from Jun 18')
    check(epoch_last_of_week(jun18), 'Last of week from Jun 18')
    
    check(epoch_last_of_month(may04noon), 'Last of month from May 04')
    check(epoch_last_of_month(jun18), 'Last of month from Jun 18')
    
    console.group('DA Range:')
    epoch_range(may04, jun18).map((day, idx) => check(day, idx))
    
    
    /*
    
    
    epoch_first_of_month: function(e) {
      return this.day(_moment(e).date(1).unix())
    },
    epoch_last_of_month: function(e) {
      return this.day(_moment(e).date(31).unix())
    },
    epoch_first_of_week: function(e) {
      return this.day(_moment(e).weekday(0).unix())
    },
    epoch_last_of_week: function(e) {
      return this.day(_moment(e).weekday(6).unix())
    },    
    
    epoch_range: function(efrom, eto, includeTo= true) {
    */



    // expect(btnCancelNode.innerHTML).to.equal('Cancel')
    // expect(btnSaveNode.innerHTML).to.equal('Save')

  })  
})



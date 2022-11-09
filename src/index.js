// importing packages
const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
var app = express();


app.get('/menu', async function (req, res) {
  const queryDate = req.query.date;
  let month, day, year;
  try {
    const date = queryDate.split('/');
    const invalidDateError = 'Please provide date query parameter in MM/DD/YYYY format.'
    if (date.length !== 3){
        console.error(invalidDateError);
        res.send(invalidDateError);
    }
    else {
        month = date[0];
        day = date[1];
        year = date[2];
        if (month.length !== 2 || day.length !== 2 || year.length !== 4) {
            console.error(invalidDateError);
            res.send(invalidDateError);
        }
    }
  } catch (ex) {
    console.error(ex);
    res.send(ex);
  }
  const response = await fetch('https://api.isitesoftware.com/graphql', {
	method: 'post',
	body: getRequestPayload(day, month, year),
	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    });
    const data = await response.json();
    const menus = data.data.menuTypes;
    const responseMenu = {};
    if (data && data.data && data.data.menuTypes && data.data.menuTypes.length > 0) {
        menus.forEach((menu) => {
            const menuName = menu.name;
            responseMenu[menuName] = [];
            menu.items.forEach((item) => {
                const menuItemName = item.product.name;
                if (menuItemName.length > 0) {
                    responseMenu[menuName].push(item.product.name.trim());
                }
            })
        });
    } else {
        res.send('No menus found for that date.');
    }
    res.send(responseMenu);
})

function getRequestPayload(day, month, year) {
    const requestPayload = `query=%0Aquery%20mobileSchoolPage(%24date%3A%20String\u0021%2C%20%24site_code%3A%20String\u0021%2C%20%24site_code2%3A%20String\u0021%2C%20%24useDepth2%3A%20Boolean\u0021)%20%7B%0A%20%20menuTypes(publish_location%3A%20%22mobile%22%2C%20site%3A%7B%0A%20%20%20%20%20%20depth_0_id%3A%20%24site_code%2C%0A%20%20%20%20%20%20depth_1_id%3A%20%24site_code2%0A%20%20%7D)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20formats%0A%20%20%20%20items(start_date%3A%20%24date%2C%20end_date%3A%20%24date)%20%7B%0A%20%20%20%20%20%20date%2C%0A%20%20%20%20%20%20product%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0Aname%0Aallergen_dairy%0Aallergen_egg%0Aallergen_fish%0Aallergen_gluten%0Aallergen_milk%0Aallergen_peanut%0Aallergen_pork%0Aallergen_shellfish%0Aallergen_soy%0Aallergen_treenuts%0Aallergen_vegetarian%0Aallergen_wheat%0Aallergen_other%0AcustomAllergens%0Aimage_url1%0Aimage_url2%0Apdf_url%0Aportion_size%0Aportion_size_unit%0Aprice%0Aprod_allergens%0Aprod_calcium%0Aprod_calories%0Aprod_carbs%0Aprod_cholesterol%0Aprod_dietary_fiber%0Aprod_gram_weight%0Aprod_iron%0Aprod_mfg%0Aprod_protein%0Aprod_sat_fat%0Aprod_sodium%0Aprod_total_fat%0Aprod_trans_fat%0Aprod_vita_iu%0Aprod_vita_re%0Aprod_vitc%0Asugar%0Ais_ancillary%0AmealsPlusCustomAllergens%0AmealsPlusCustomAttributes%0A%0A%20%20%20%20%20%20%20%20%20%20long_description%0A%20%20%20%20%20%20%20%20%20%20hide_on_mobile%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20listMenus(publish_location%3A%22mobile%22%2C%20site%3A%7B%0A%20%20%20%20%20%20depth_0_id%3A%20%24site_code%2C%0A%20%20%20%20%20%20depth_1_id%3A%20%24site_code2%0A%20%20%7D)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20items%7B%0A%20%20%20%20%20%20product%20%7B%0A%20%20%20%20%20%20%20%20id%0Aname%0Aallergen_dairy%0Aallergen_egg%0Aallergen_fish%0Aallergen_gluten%0Aallergen_milk%0Aallergen_peanut%0Aallergen_pork%0Aallergen_shellfish%0Aallergen_soy%0Aallergen_treenuts%0Aallergen_vegetarian%0Aallergen_wheat%0Aallergen_other%0AcustomAllergens%0Aimage_url1%0Aimage_url2%0Apdf_url%0Aportion_size%0Aportion_size_unit%0Aprice%0Aprod_allergens%0Aprod_calcium%0Aprod_calories%0Aprod_carbs%0Aprod_cholesterol%0Aprod_dietary_fiber%0Aprod_gram_weight%0Aprod_iron%0Aprod_mfg%0Aprod_protein%0Aprod_sat_fat%0Aprod_sodium%0Aprod_total_fat%0Aprod_trans_fat%0Aprod_vita_iu%0Aprod_vita_re%0Aprod_vitc%0Asugar%0Ais_ancillary%0AmealsPlusCustomAllergens%0AmealsPlusCustomAttributes%0A%0A%20%20%20%20%20%20%20%20long_description%0A%20%20%20%20%20%20%20%20hide_on_mobile%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20pdfMenus(site%3A%7B%0A%20%20%20%20%20%20depth_0_id%3A%20%24site_code%0A%20%20%7D)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20url%0A%20%20%7D%0A%20%20site%20(depth%3A%200%2C%20id%3A%20%24site_code)%20%40skip(if%3A%20%24useDepth2)%20%7B%0A%20%20%20%20id%2C%0A%20%20%20%20parent_id%2C%0A%20%20%20%20name%2C%0A%20%20%20%20logo_url%0A%20%20%20%20organization%20%7B%0A%20%20id%2C%0A%20%20name%2C%0A%20%20logo_url%0A%20%20OnlineMenuDesignSettings%20%7B%0A%20%20%20%20customAllergens%20%7B%0A%20%20%20%20%20%20%20%20field%0A%20%20%20%20%20%20%20%20img%0A%20%20%20%20%20%20%20%20label%0A%20%20%20%20%20%20%20%20tooltip%0A%20%20%20%20%7D%0A%20%20%20%20mealsPlusCustomAllergens%20%7B%0A%20%20%20%20%20%20field%0A%20%20%20%20%20%20img%0A%20%20%20%20%20%20label%0A%20%20%20%20%20%20tooltip%0A%20%20%20%20%20%20mealsPlusId%0A%20%20%20%20%7D%0A%20%20%20%20mealsPlusCustomAttributes%20%7B%0A%20%20%20%20%20%20field%0A%20%20%20%20%20%20img%0A%20%20%20%20%20%20label%0A%20%20%20%20%20%20tooltip%0A%20%20%20%20%20%20mealsPlusId%0A%20%20%20%20%7D%0A%20%20%20%20disableAllergen%0A%20%20%20%20showAllergens%0A%20%20%20%20allergenFilterEnabled%0A%20%20%20%20ratingEmojiShow%0A%20%20%7D%0A%20%20SnafDistrict%20%7B%0A%20%20%20%20url_online_pay%0A%20%20%7D%0A%20%20SnafSettings%20%7B%0A%20%20%20%20enable_surveys%0A%20%20%20%20enable_announcements%0A%20%20%7D%0A%20%20OnlineOrderingSettings%20%7B%0A%20%20%20%20enableSlc%0A%20%20%20%20enableTlc%0A%20%20%7D%0A%20%20apps%20%7B%0A%20%20%20%20onlineordering%20%7B%0A%20%20%20%20%20%20enable_linq%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%20%20%7D%0A%20%20site2%3A%20site%20(depth%3A%201%2C%20id%3A%20%24site_code2)%20%40include(if%3A%20%24useDepth2)%20%7B%0A%20%20%20%20id%2C%0A%20%20%20%20parent_id%2C%0A%20%20%20%20name%2C%0A%20%20%20%20logo_url%2C%0A%20%20%20%20organization%20%7B%0A%20%20id%2C%0A%20%20name%2C%0A%20%20logo_url%0A%20%20OnlineMenuDesignSettings%20%7B%0A%20%20%20%20customAllergens%20%7B%0A%20%20%20%20%20%20%20%20field%0A%20%20%20%20%20%20%20%20img%0A%20%20%20%20%20%20%20%20label%0A%20%20%20%20%20%20%20%20tooltip%0A%20%20%20%20%7D%0A%20%20%20%20mealsPlusCustomAllergens%20%7B%0A%20%20%20%20%20%20field%0A%20%20%20%20%20%20img%0A%20%20%20%20%20%20label%0A%20%20%20%20%20%20tooltip%0A%20%20%20%20%20%20mealsPlusId%0A%20%20%20%20%7D%0A%20%20%20%20mealsPlusCustomAttributes%20%7B%0A%20%20%20%20%20%20field%0A%20%20%20%20%20%20img%0A%20%20%20%20%20%20label%0A%20%20%20%20%20%20tooltip%0A%20%20%20%20%20%20mealsPlusId%0A%20%20%20%20%7D%0A%20%20%20%20disableAllergen%0A%20%20%20%20showAllergens%0A%20%20%20%20allergenFilterEnabled%0A%20%20%20%20ratingEmojiShow%0A%20%20%7D%0A%20%20SnafDistrict%20%7B%0A%20%20%20%20url_online_pay%0A%20%20%7D%0A%20%20SnafSettings%20%7B%0A%20%20%20%20enable_surveys%0A%20%20%20%20enable_announcements%0A%20%20%7D%0A%20%20OnlineOrderingSettings%20%7B%0A%20%20%20%20enableSlc%0A%20%20%20%20enableTlc%0A%20%20%7D%0A%20%20apps%20%7B%0A%20%20%20%20onlineordering%20%7B%0A%20%20%20%20%20%20enable_linq%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%20%20%7D%0A%7D%0A&variables=%7B%22date%22%3A%22${month}%2F${day}%2F${year}%22%2C%22site_code%22%3A%224703%22%2C%22site_code2%22%3A%2211082%22%2C%22useDepth2%22%3Atrue%7D`;
    return requestPayload;
}

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("App listening at http://%s:%s", host, port)
}) 
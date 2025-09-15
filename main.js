const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('tel');
const code = document.querySelector('strong');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const password = document.getElementById('password');
const confirmP = document.getElementById('confirmP');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	if(checkInputs()) {
        setTimeout(() => {
            window.location.href = 'done.html';
        }, 2000);
    }
});

const months = ['January', 'February', 'March', 'April', 
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'];

(function populateMonths(){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement('option');
        option.textContent = months[i];
        option.value = i+1;
        month.appendChild(option);
    }
})();

let previousDay;

function populateDays(month){
    //Delete all of the children of the day dropdown
    //if they do exist
    while(day.lastElementChild.value !== "0"){
        day.removeChild(day.lastElementChild);
    }
    
    //Holds the number of days in the month
    let dayNum = 0;
    //Get the current year
    let yearValue = year.value.trim();

    if(month === '1' || month === '3' || 
    month === '5' || month === '7' || month === '8' 
    || month === '10' || month === '12') {
        dayNum = 31;
    } else if(month === '4' || month === '6' 
    || month === '9' || month === '11') {
        dayNum = 30;
    }else if(month === '2') {
        //Check for a leap year
        if(new Date(yearValue, 1, 29).getMonth() === 1){
            dayNum = 29;
        }else{
            dayNum = 28;
        }
    }
    
    //Insert the correct days into the day <>
    for(let i = 1; i <= dayNum; i++){
        const option = document.createElement("option");
        option.textContent = i;
        day.appendChild(option);
    }
    if(previousDay){
        day.value = previousDay;
        while(day.value === ""){
            day.value = --previousDay;
        }
    }
}

function populateYears(){
    //Get the current year as a number
    let yearValue = new Date().getFullYear();
    //Make the previous 100 years be an option
    for(let i = 0; i < 101; i++){
        const option = document.createElement("option");
        option.textContent = yearValue - i;
        option.value = yearValue - i;
        year.appendChild(option);
    }
    year.value = '0';
}

populateDays(month.value);
populateYears();

year.onchange = function() {
    populateDays(month.value);
}
month.onchange = function() {
    populateDays(month.value);
}
day.onchange = function() {
    previousDay = day.value;
}


///// phone
// 253 countries
const countries = [
    { name: "Afghanistan", code: "AF", phone: 93, length: 11 },
    { name: "Aland Islands", code: "AX", phone: 358, length: 11 },
    { name: "Albania", code: "AL", phone: 355, length: 11 },
    { name: "Algeria", code: "DZ", phone: 213, length: 12 },
    { name: "American Samoa", code: "AS", phone: 1684, length: 11 },
    { name: "Andorra", code: "AD", phone: 376, length: 9 },
    { name: "Angola", code: "AO", phone: 244, length: 12 },
    { name: "Anguilla", code: "AI", phone: 1264, length: 11 },
    { name: "Antarctica", code: "AQ", phone: 672, length: 9 },
    { name: "Antigua and Barbuda", code: "AG", phone: 1268, length: 11 },
    { name: "Argentina", code: "AR", phone: 54, length: 13 },
    { name: "Armenia", code: "AM", phone: 374, length: 11 },
    { name: "Aruba", code: "AW", phone: 297, length: 10 },
    { name: "Australia", code: "AU", phone: 61, length: 11 },
    { name: "Austria", code: "AT", phone: 43, length: 12 },
    { name: "Azerbaijan", code: "AZ", phone: 994, length: 12 },
    { name: "Bahamas", code: "BS", phone: 1242, length: 11 },
    { name: "Bahrain", code: "BH", phone: 973, length: 12 },
    { name: "Bangladesh", code: "BD", phone: 880, length: 13 },
    { name: "Barbados", code: "BB", phone: 1246, length: 11 },
    { name: "Belarus", code: "BY", phone: 375, length: 12 },
    { name: "Belgium", code: "BE", phone: 32, length: 11 },
    { name: "Belize", code: "BZ", phone: 501, length: 10 },
    { name: "Benin", code: "BJ", phone: 229, length: 11 },
    { name: "Bermuda", code: "BM", phone: 1441, length: 11 },
    { name: "Bhutan", code: "BT", phone: 975, length: 11 },
    { name: "Bolivia", code: "BO", phone: 591, length: 11 },
    { name: "Bonaire, Sint Eustatius and Saba", code: "BQ", phone: 599, length: 10 },
    { name: "Bosnia and Herzegovina", code: "BA", phone: 387, length: 11 },
    { name: "Botswana", code: "BW", phone: 267, length: 11 },
    { name: "Bouvet Island", code: "BV", phone: 55, length: 12 },
    { name: "Brazil", code: "BR", phone: 55, length: 13 },
    { name: "British Indian Ocean Territory", code: "IO", phone: 246, length: 9 },
    { name: "Brunei Darussalam", code: "BN", phone: 673, length: 10 },
    { name: "Bulgaria", code: "BG", phone: 359, length: 12 },
    { name: "Burkina Faso", code: "BF", phone: 226, length: 11 },
    { name: "Burundi", code: "BI", phone: 257, length: 11 },
    { name: "Cambodia", code: "KH", phone: 855, length: 11 },
    { name: "Cameroon", code: "CM", phone: 237, length: 11 },
    { name: "Canada", code: "CA", phone: 1, length: 11 },
    { name: "Cape Verde", code: "CV", phone: 238, length: 10 },
    { name: "Cayman Islands", code: "KY", phone: 1345, length: 11 },
    { name: "Central African Republic", code: "CF", phone: 236, length: 11 },
    { name: "Chad", code: "TD", phone: 235, length: 11 },
    { name: "Chile", code: "CL", phone: 56, length: 11 },
    { name: "China", code: "CN", phone: 86, length: 13 },
    { name: "Christmas Island", code: "CX", phone: 61, length: 11 },
    { name: "Cocos (Keeling) Islands", code: "CC", phone: 672, length: 9 },
    { name: "Colombia", code: "CO", phone: 57, length: 12 },
    { name: "Comoros", code: "KM", phone: 269, length: 10 },
    { name: "Congo", code: "CG", phone: 242, length: 11 },
    { name: "Congo, Democratic Republic of the Congo", code: "CD", phone: 242, length: 11 },
    { name: "Cook Islands", code: "CK", phone: 682, length: 9 },
    { name: "Costa Rica", code: "CR", phone: 506, length: 11 },
    { name: "Cote D'Ivoire", code: "CI", phone: 225, length: 11 },
    { name: "Croatia", code: "HR", phone: 385, length: 11 },
    { name: "Cuba", code: "CU", phone: 53, length: 10 },
    { name: "Curacao", code: "CW", phone: 599, length: 10 },
    { name: "Cyprus", code: "CY", phone: 357, length: 11 },
    { name: "Czech Republic", code: "CZ", phone: 420, length: 12 },
    { name: "Denmark", code: "DK", phone: 45, length: 10 },
    { name: "Djibouti", code: "DJ", phone: 253, length: 11 },
    { name: "Dominica", code: "DM", phone: 1767, length: 11 },
    { name: "Dominican Republic", code: "DO", phone: 1809, length: 12 },
    { name: "Ecuador", code: "EC", phone: 593, length: 12 },
    { name: "Egypt", code: "EG", phone: 20, length: 13 },
    { name: "El Salvador", code: "SV", phone: 503, length: 11 },
    { name: "Equatorial Guinea", code: "GQ", phone: 240, length: 11 },
    { name: "Eritrea", code: "ER", phone: 291, length: 11 },
    { name: "Estonia", code: "EE", phone: 372, length: 11 },
    { name: "Ethiopia", code: "ET", phone: 251, length: 12 },
    { name: "Falkland Islands (Malvinas)", code: "FK", phone: 500, length: 8 },
    { name: "Faroe Islands", code: "FO", phone: 298, length: 9 },
    { name: "Fiji", code: "FJ", phone: 679, length: 10 },
    { name: "Finland", code: "FI", phone: 358, length: 12 },
    { name: "France", code: "FR", phone: 33, length: 12 },
    { name: "French Guiana", code: "GF", phone: 594, length: 12 },
    { name: "French Polynesia", code: "PF", phone: 689, length: 9 },
    { name: "French Southern Territories", code: "TF", phone: 262, length: 12 },
    { name: "Gabon", code: "GA", phone: 241, length: 11 },
    { name: "Gambia", code: "GM", phone: 220, length: 10 },
    { name: "Georgia", code: "GE", phone: 995, length: 12 },
    { name: "Germany", code: "DE", phone: 49, length: 13 },
    { name: "Ghana", code: "GH", phone: 233, length: 12 },
    { name: "Gibraltar", code: "GI", phone: 350, length: 11 },
    { name: "Greece", code: "GR", phone: 30, length: 12 },
    { name: "Greenland", code: "GL", phone: 299, length: 9 },
    { name: "Grenada", code: "GD", phone: 1473, length: 11 },
    { name: "Guadeloupe", code: "GP", phone: 590, length: 12 },
    { name: "Guam", code: "GU", phone: 1671, length: 11 },
    { name: "Guatemala", code: "GT", phone: 502, length: 11 },
    { name: "Guernsey", code: "GG", phone: 44, length: 13 },
    { name: "Guinea", code: "GN", phone: 224, length: 11 },
    { name: "Guinea-Bissau", code: "GW", phone: 245, length: 11 },
    { name: "Guyana", code: "GY", phone: 592, length: 10 },
    { name: "Haiti", code: "HT", phone: 509, length: 11 },
    { name: "Heard Island and McDonald Islands", code: "HM", phone: 0, length: 8 },
    { name: "Holy See (Vatican City State)", code: "VA", phone: 39, length: 12 },
    { name: "Honduras", code: "HN", phone: 504, length: 11 },
    { name: "Hong Kong", code: "HK", phone: 852, length: 11 },
    { name: "Hungary", code: "HU", phone: 36, length: 11 },
    { name: "Iceland", code: "IS", phone: 354, length: 10 },
    { name: "India", code: "IN", phone: 91, length: 13 },
    { name: "Indonesia", code: "ID", phone: 62, length: 12 },
    { name: "Iran, Islamic Republic of", code: "IR", phone: 98, length: 12 },
    { name: "Iraq", code: "IQ", phone: 964, length: 13 },
    { name: "Ireland", code: "IE", phone: 353, length: 12 },
    { name: "Isle of Man", code: "IM", phone: 44, length: 13 },
    { name: "Israel", code: "IL", phone: 972, length: 12 },
    { name: "Italy", code: "IT", phone: 39, length: 12 },
    { name: "Jamaica", code: "JM", phone: 1876, length: 11 },
    { name: "Japan", code: "JP", phone: 81, length: 12 },
    { name: "Jersey", code: "JE", phone: 44, length: 13 },
    { name: "Jordan", code: "JO", phone: 962, length: 12 },
    { name: "Kazakhstan", code: "KZ", phone: 7, length: 11 },
    { name: "Kenya", code: "KE", phone: 254, length: 12 },
    { name: "Kiribati", code: "KI", phone: 686, length: 9 },
    { name: "Korea, Democratic People's Republic of", code: "KP", phone: 850, length: 12 },
    { name: "Korea, Republic of", code: "KR", phone: 82, length: 12 },
    { name: "Kosovo", code: "XK", phone: 383, length: 11 },
    { name: "Kuwait", code: "KW", phone: 965, length: 11 },
    { name: "Kyrgyzstan", code: "KG", phone: 996, length: 12 },
    { name: "Lao People's Democratic Republic", code: "LA", phone: 856, length: 11 },
    { name: "Latvia", code: "LV", phone: 371, length: 11 },
    { name: "Lebanon", code: "LB", phone: 961, length: 11 },
    { name: "Lesotho", code: "LS", phone: 266, length: 10 },
    { name: "Liberia", code: "LR", phone: 231, length: 10 },
    { name: "Libyan Arab Jamahiriya", code: "LY", phone: 218, length: 11 },
    { name: "Liechtenstein", code: "LI", phone: 423, length: 10 },
    { name: "Lithuania", code: "LT", phone: 370, length: 11 },
    { name: "Luxembourg", code: "LU", phone: 352, length: 11 },
    { name: "Macao", code: "MO", phone: 853, length: 11 },
    { name: "Macedonia, the Former Yugoslav Republic of", code: "MK", phone: 389, length: 11 },
    { name: "Madagascar", code: "MG", phone: 261, length: 11 },
    { name: "Malawi", code: "MW", phone: 265, length: 10 },
    { name: "Malaysia", code: "MY", phone: 60, length: 11 },
    { name: "Maldives", code: "MV", phone: 960, length: 10 },
    { name: "Mali", code: "ML", phone: 223, length: 11 },
    { name: "Malta", code: "MT", phone: 356, length: 11 },
    { name: "Marshall Islands", code: "MH", phone: 692, length: 9 },
    { name: "Martinique", code: "MQ", phone: 596, length: 12 },
    { name: "Mauritania", code: "MR", phone: 222, length: 11 },
    { name: "Mauritius", code: "MU", phone: 230, length: 10 },
    { name: "Mayotte", code: "YT", phone: 262, length: 12 },
    { name: "Mexico", code: "MX", phone: 52, length: 13 },
    { name: "Micronesia, Federated States of", code: "FM", phone: 691, length: 9 },
    { name: "Moldova, Republic of", code: "MD", phone: 373, length: 11 },
    { name: "Monaco", code: "MC", phone: 377, length: 11 },
    { name: "Mongolia", code: "MN", phone: 976, length: 11 },
    { name: "Montenegro", code: "ME", phone: 382, length: 11 },
    { name: "Montserrat", code: "MS", phone: 1664, length: 11 },
    { name: "Morocco", code: "MA", phone: 212, length: 12 },
    { name: "Mozambique", code: "MZ", phone: 258, length: 12 },
    { name: "Myanmar", code: "MM", phone: 95, length: 10 },
    { name: "Namibia", code: "NA", phone: 264, length: 11 },
    { name: "Nauru", code: "NR", phone: 674, length: 9 },
    { name: "Nepal", code: "NP", phone: 977, length: 12 },
    { name: "Netherlands", code: "NL", phone: 31, length: 11 },
    { name: "Netherlands Antilles", code: "AN", phone: 599, length: 10 },
    { name: "New Caledonia", code: "NC", phone: 687, length: 9 },
    { name: "New Zealand", code: "NZ", phone: 64, length: 11 },
    { name: "Nicaragua", code: "NI", phone: 505, length: 11 },
    { name: "Niger", code: "NE", phone: 227, length: 11 },
    { name: "Nigeria", code: "NG", phone: 234, length: 13 },
    { name: "Niue", code: "NU", phone: 683, length: 9 },
    { name: "Norfolk Island", code: "NF", phone: 672, length: 9 },
    { name: "Northern Mariana Islands", code: "MP", phone: 1670, length: 11 },
    { name: "Norway", code: "NO", phone: 47, length: 10 },
    { name: "Oman", code: "OM", phone: 968, length: 11 },
    { name: "Pakistan", code: "PK", phone: 92, length: 12 },
    { name: "Palau", code: "PW", phone: 680, length: 9 },
    { name: "Palestinian Territory, Occupied", code: "PS", phone: 970, length: 12 },
    { name: "Panama", code: "PA", phone: 507, length: 11 },
    { name: "Papua New Guinea", code: "PG", phone: 675, length: 10 },
    { name: "Paraguay", code: "PY", phone: 595, length: 11 },
    { name: "Peru", code: "PE", phone: 51, length: 11 },
    { name: "Philippines", code: "PH", phone: 63, length: 12 },
    { name: "Pitcairn", code: "PN", phone: 64, length: 11 },
    { name: "Poland", code: "PL", phone: 48, length: 11 },
    { name: "Portugal", code: "PT", phone: 351, length: 12 },
    { name: "Puerto Rico", code: "PR", phone: 1787, length: 12 },
    { name: "Qatar", code: "QA", phone: 974, length: 11 },
    { name: "Reunion", code: "RE", phone: 262, length: 12 },
    { name: "Romania", code: "RO", phone: 40, length: 11 },
    { name: "Russian Federation", code: "RU", phone: 7, length: 11 },
    { name: "Rwanda", code: "RW", phone: 250, length: 11 },
    { name: "Saint Barthelemy", code: "BL", phone: 590, length: 12 },
    { name: "Saint Helena", code: "SH", phone: 290, length: 8 },
    { name: "Saint Kitts and Nevis", code: "KN", phone: 1869, length: 11 },
    { name: "Saint Lucia", code: "LC", phone: 1758, length: 11 },
    { name: "Saint Martin", code: "MF", phone: 590, length: 12 },
    { name: "Saint Pierre and Miquelon", code: "PM", phone: 508, length: 10 },
    { name: "Saint Vincent and the Grenadines", code: "VC", phone: 1784, length: 11 },
    { name: "Samoa", code: "WS", phone: 684, length: 9 },
    { name: "San Marino", code: "SM", phone: 378, length: 10 },
    { name: "Sao Tome and Principe", code: "ST", phone: 239, length: 10 },
    { name: "Saudi Arabia", code: "SA", phone: 966, length: 12 },
    { name: "Senegal", code: "SN", phone: 221, length: 11 },
    { name: "Serbia", code: "RS", phone: 381, length: 11 },
    { name: "Serbia and Montenegro", code: "CS", phone: 381, length: 11 },
    { name: "Seychelles", code: "SC", phone: 248, length: 10 },
    { name: "Sierra Leone", code: "SL", phone: 232, length: 10 },
    { name: "Singapore", code: "SG", phone: 65, length: 10 },
    { name: "St Martin", code: "SX", phone: 721, length: 10 },
    { name: "Slovakia", code: "SK", phone: 421, length: 12 },
    { name: "Slovenia", code: "SI", phone: 386, length: 11 },
    { name: "Solomon Islands", code: "SB", phone: 677, length: 9 },
    { name: "Somalia", code: "SO", phone: 252, length: 11 },
    { name: "South Africa", code: "ZA", phone: 27, length: 11 },
    { name: "South Georgia and the South Sandwich Islands", code: "GS", phone: 500, length: 8 },
    { name: "South Sudan", code: "SS", phone: 211, length: 11 },
    { name: "Spain", code: "ES", phone: 34, length: 11 },
    { name: "Sri Lanka", code: "LK", phone: 94, length: 11 },
    { name: "Sudan", code: "SD", phone: 249, length: 11 },
    { name: "Suriname", code: "SR", phone: 597, length: 10 },
    { name: "Svalbard and Jan Mayen", code: "SJ", phone: 47, length: 10 },
    { name: "Swaziland", code: "SZ", phone: 268, length: 10 },
    { name: "Sweden", code: "SE", phone: 46, length: 11 },
    { name: "Switzerland", code: "CH", phone: 41, length: 12 },
    { name: "Syrian Arab Republic", code: "SY", phone: 963, length: 12 },
    { name: "Taiwan, Province of China", code: "TW", phone: 886, length: 12 },
    { name: "Tajikistan", code: "TJ", phone: 992, length: 12 },
    { name: "Tanzania, United Republic of", code: "TZ", phone: 255, length: 12 },
    { name: "Thailand", code: "TH", phone: 66, length: 11 },
    { name: "Timor-Leste", code: "TL", phone: 670, length: 9 },
    { name: "Togo", code: "TG", phone: 228, length: 11 },
    { name: "Tokelau", code: "TK", phone: 690, length: 9 },
    { name: "Tonga", code: "TO", phone: 676, length: 9 },
    { name: "Trinidad and Tobago", code: "TT", phone: 1868, length: 11 },
    { name: "Tunisia", code: "TN", phone: 216, length: 11 },
    { name: "Turkey", code: "TR", phone: 90, length: 12 },
    { name: "Turkmenistan", code: "TM", phone: 7370, length: 11 },
    { name: "Turks and Caicos Islands", code: "TC", phone: 1649, length: 11 },
    { name: "Tuvalu", code: "TV", phone: 688, length: 9 },
    { name: "Uganda", code: "UG", phone: 256, length: 12 },
    { name: "Ukraine", code: "UA", phone: 380, length: 12 },
    { name: "United Arab Emirates", code: "AE", phone: 971, length: 12 },
    { name: "United Kingdom", code: "GB", phone: 44, length: 13 },
    { name: "United States", code: "US", phone: 1, length: 11 },
    { name: "United States Minor Outlying Islands", code: "UM", phone: 1, length: 11 },
    { name: "Uruguay", code: "UY", phone: 598, length: 11 },
    { name: "Uzbekistan", code: "UZ", phone: 998, length: 12 },
    { name: "Vanuatu", code: "VU", phone: 678, length: 9 },
    { name: "Venezuela", code: "VE", phone: 58, length: 11 },
    { name: "Viet Nam", code: "VN", phone: 84, length: 12 },
    { name: "Virgin Islands, British", code: "VG", phone: 1284, length: 11 },
    { name: "Virgin Islands, U.s.", code: "VI", phone: 1340, length: 11 },
    { name: "Wallis and Futuna", code: "WF", phone: 681, length: 9 },
    { name: "Western Sahara", code: "EH", phone: 212, length: 12 },
    { name: "Yemen", code: "YE", phone: 967, length: 12 },
    { name: "Zambia", code: "ZM", phone: 260, length: 11 },
    { name: "Zimbabwe", code: "ZW", phone: 263, length: 11 }
],

select_box = document.querySelector('.options'),
search_box = document.querySelector('.search-box'),
input_box = document.querySelector('input[type="tel"]'),
selected_option = document.querySelector('.selected-option div');
    
let options = null;

for (country of countries) {
    const li = document.createElement('li');
    li.classList.add('option')
    li.innerHTML = `
    <div>
        <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
        <span class="country-name">${country.name}</span>
    </div>
    <strong>+${country.phone}</strong>`;

    select_box.querySelector('ol').appendChild(li);
    options = document.querySelectorAll('.option');
}

let selected = countries.find(c => c.phone === 20);
function selectOption() {
    const icon = this.querySelector('.iconify').cloneNode(true),
        phone_code = this.querySelector('strong').cloneNode(true);

    selected = countries.find(c => `+${c.phone}` === phone_code.innerText);
    
    selected_option.innerHTML = '';
    selected_option.append(icon, phone_code);

    select_box.classList.remove('active');
    selected_option.classList.remove('active');

    input_box.value = phone_code.innerText;

    search_box.value = '';
    select_box.querySelectorAll('.hide').forEach(el => el.classList.remove('hide'));
}

function searchCountry() {
    let search_query = search_box.value.toLowerCase();
    for (option of options) {
        let is_matched = option.querySelector('.country-name').innerText.toLowerCase().includes(search_query);
        option.classList.toggle('hide', !is_matched)
    }
}


selected_option.addEventListener('click', () => {
    select_box.classList.toggle('active');
    selected_option.classList.toggle('active');
})

options.forEach(option => option.addEventListener('click', selectOption));
search_box.addEventListener('input', searchCountry);


function checkInputs() {
	// trim to remove the whitespaces
	const nameValue = name.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.trim();
	const dayValue = day.value.trim();
	const monthValue = month.value.trim();
	const yearValue = year.value.trim();
	const passwordValue = password.value.trim();
	const confirmPValue = confirmP.value.trim();
	let Correct = true;
    //name
	if(nameValue === '') {
		setErrorFor(name, 'Please enter your name');
        Correct = false;
	} else if(nameValue.length < 3) {
        setErrorFor(name, 'Name must be at least 3 characters');
        Correct = false;
	} else if(nameValue.length > 10) {
        setErrorFor(name, 'Name must be less than 10 characters');
        Correct = false;
    } else if(!isNaN(nameValue) || !isNaN(nameValue[0])) {
        setErrorFor(name, "Name mustn't be number or start with number");
        Correct = false;
    } else {
		setSuccessFor(name);
	}
	
    //email
	if(emailValue === '') {
		setErrorFor(email, 'Please enter your email');
        Correct = false;
	} else if(!isEmail(emailValue)) {
		setErrorFor(email, 'Enter a valid email');
        Correct = false;
	} else {
		setSuccessFor(email);
	}

    //phone
    if(phoneValue === '' || selected_option.innerText === '+xx') {
		setErrorFor(phone.parentElement.parentElement, 'Please enter your phone');
        Correct = false;
	} else if(phoneValue.length !== selected.length) {
		setErrorFor(phone.parentElement.parentElement, `Phone number should be ${selected.length} digits`);
        Correct = false;
	} else {
		setSuccessFor(phone.parentElement.parentElement);
	}

    //date
		if(dayValue === '0') {
            setErrorFor(day, 'Enter a day');
            Correct = false;
        } else {
            setSuccessFor(day);
		}
        if(monthValue === '0') {
            setErrorFor(month, 'Enter a month');
            Correct = false;
        } else {
            setSuccessFor(month);
		}
        if(yearValue === '0') {
            setErrorFor(year, 'Enter a year');
            Correct = false;
        } else {
            setSuccessFor(year);
        }

    //password
	if(passwordValue === '') {
		setErrorFor(password, 'Please enter your password');
        Correct = false;
	} else if(passwordValue.length < 8) {
        setErrorFor(password, 'Password must be at least 8 characters');
        Correct = false;
    } else {
		setSuccessFor(password);
	}
	
    //confirm
	if(confirmPValue === '') {
		setErrorFor(confirmP, 'Please confirm your password');
        Correct = false;
	} else if(passwordValue !== confirmPValue) {
		setErrorFor(confirmP, "Passwords don't match");
        Correct = false;
	} else{
		setSuccessFor(confirmP);
	}
    return Correct;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.classList.add('error');
	formControl.classList.remove('success');
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.classList.add('success');
	formControl.classList.remove('error');
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

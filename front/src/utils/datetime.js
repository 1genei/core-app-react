export function parseDateTime(rawDateTime) {
    let year = rawDateTime.slice(0, 4);
    let month = rawDateTime.slice(5, 7);
    let day = rawDateTime.slice(8, 10);
    let hour = rawDateTime.slice(11, 13);
    let min = rawDateTime.slice(14, 16);
    let sec = rawDateTime.slice(17, 19);
    let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return day + ' ' + months[month - 1] + ' ' + year + ', ' + hour + 'h' + min + 'm' + sec + 's (UTC)';
}


export function parseDate(rawDate) {
    return
}


export function parseTime(rawTime) {
    return
}
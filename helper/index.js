function LaoWeekDays(dayEN) {
    if(!dayEN) return 0
    let _dayLO = ""
    switch(dayEN){
        case "Monday":
            _dayLO = "ຈັນ"
            break;
        case "Tuesday":
            _dayLO = "ອັງຄານ"
            break;
        case "Wednesday":
            _dayLO = "ພຸດ"
            break;
        case "Thursday":
            _dayLO = "ພະຫັດ"
            break;
        case "Friday":
            _dayLO = "ສຸກ"
            break;
        case "Saturday":
            _dayLO = "ເສົາ"
            break;
        case "Sunday":
            _dayLO = "ອາທິດ"
            break;
    }

    return _dayLO
}

function FormatPeriod(time){
    if(!time) return 0

    let _period = ""
    if(time <= 11){
        _period = "ຕອນເຊົ້າ"
    }

    if(time <= 16){
        _period = "ຕອນສວາຍ"
    }

    if(time <= 20){
        _period = "ຕອນແລງ"
    }

    if(time <= 25){
        _period = "ຕອນຄ່ຳ"
    }

    return _period
}


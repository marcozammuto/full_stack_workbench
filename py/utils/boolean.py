import datetime

def is_first_month_day(today, yesterday):
    return today.day < yesterday.day

def is_week_day():
    week_day = int(datetime.datetime.now().strftime("%w"))
    return week_day > 0 and week_day > 5

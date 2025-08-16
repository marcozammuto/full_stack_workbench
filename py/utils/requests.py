import requests
from utils.date import DateUtils

class RequestUtils:
     @staticmethod
     def national_holiday_check():
          today = DateUtils.today()
          endpoint = f'https://date.nager.at/api/v3/PublicHolidays/{today.strftime("%Y")}/IT'
          try:
               request = requests.get(endpoint)
               if request.status_code == 200:
                    for date in request.json():
                         return date if date['date'] == today else None
               else:
                    raise request.status_code
          except Exception as ex:
               raise(ex)
               
                    
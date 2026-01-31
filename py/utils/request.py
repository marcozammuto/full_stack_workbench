from datetime import datetime
import requests

class RequestUtils:
     def check_national_holiday(date_to_check):
          endpoint = f"https://date.nager.at/api/v3/PublicHolidays/{datetime.strftime("%Y")}/IT"
          try:
               request = requests.get(endpoint)
               if request.status_code == 200:
                    response = request.json()
                    target = None
                    for date in response:
                         if date['date'] == date_to_check:
                              target = date
                              break
                    return target
               else:
                    raise BaseException(request)
          except Exception as ex:
               raise ex
          
import os
import datetime

class RequestUtils:
     @staticmethod
     def national_holiday_check():
          today = datetime.datetime.today()
          endpoint = f'{os.environ['NATIONAL_HOLIDAY_CHECKER_API_ENDPOINT']}/{today.strftime("%Y")}/{os.environ['LOCATION']}'
          try:
               request = requests.get(endpoint)
               if request.status_code == 200:
                    for date in request.json():
                         return date if date['date'] == today else None
               else:
                    raise request.status_code
          except ConnectionError as ex:
               raise(ex)
          
               
                    
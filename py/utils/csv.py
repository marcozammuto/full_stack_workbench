from utils.requests import RequestUtils
from utils.date import DateUtils
import csv
import os

class CsvUtils:
 class header:
    @staticmethod
    def add(path, columns):
        with open(path,"w") as f:
            writer = csv.DictWriter(f,columns.keys())
            writer.writeheader()

 class row:
    @staticmethod
    def _get_daily_default_value(key):
        today = DateUtils.today()
        match key:
          case k if k == os.environ.get('CSV_DATE'):
               return today.date()
          case k if k == os.environ.get('CSV_HOURS_VARIATION'):
               return "0"
          case _:
               return ""
            
     
    @staticmethod
    def add(path, columns):
         obj = {}
         keys = columns.keys()
         for key in keys:
              value = columns[key][os.environ['MONTH_CSV_COLUMNS_DEFAULT_KEY']]
              obj[key] = CsvUtils.row._get_daily_default_value(key) if value is None else value
        
         is_national_holiday = RequestUtils.national_holiday_check()
                    
         if is_national_holiday:
              obj[os.environ['national_holiday']] = is_national_holiday['date']
              obj[os.environ['notes']] = is_national_holiday['localName']
              
         with open(path, 'a', newline='') as f:
              writer = csv.DictWriter(f, fieldnames=keys)
              writer.writerow(obj)
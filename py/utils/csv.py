import datetime
from utils.requests import RequestUtils
from utils.io import PathUtils
import csv
import os

class CsvUtils:
 class header:
    @staticmethod
    def add(path, columns):
        with open(path,"w") as f:
            writer = csv.DictWriter(f,columns)
            writer.writeheader()

 class row:
    @staticmethod
    def update_day(log):
         file_path = f"{PathUtils.month(datetime.datetime.today().strftime("%B"))}"
         print(file_path)
         file_path = f"{PathUtils.month(datetime.datetime.today().strftime("%B"))}"
         with open(file_path, newline='') as f:
               spamreader = csv.reader(f, delimiter=',', quotechar='|')
               #ecc ecc...
                   
      
    @staticmethod
    def _get_daily_default_value(key):
        today = datetime.datetime.today()
        match key:
          case k if k == os.environ.get('CSV_DATE'):
               return today.date()
          case k if k == os.environ.get('CSV_HOURS_VARIATION'):
               return "0"
          case _:
               return ""
            

#     @staticmethod     
#     def update_today_row(path, log):
#           file_path = f"{PathUtils.month(datetime.datetime.today().strftime("%B"))}"
#           print(file_path)
                    
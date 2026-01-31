from utils.io import IoUtils
from utils.csv import CsvUtils

class CreateFileUtils:
     @staticmethod
     def daily_update():
          IoUtils.initialize.year()
          IoUtils.initialize.day()
          
     def update_day(log):
          print(log)
          #CsvUtils.row.update_day(log)
          
     
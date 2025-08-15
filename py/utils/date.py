from datetime import datetime, timedelta

class DateUtils:
     @staticmethod
     def today():
          return datetime.now()
     @staticmethod
     def tomorrow():
          return DateUtils.today() + timedelta(days=1)
     @staticmethod
     def yesterday():
          return DateUtils.today() - timedelta(days=1)
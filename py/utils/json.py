import datetime
import os

class JsonUtils:
     @staticmethod
     def get_default_log():
          return {
            "day" :datetime.datetime.now().date().strftime("%Y-%m-%d"),
            "extra_hours": 0,
            "variation_type": os.environ['VARIATION_TYPE_STANDARD'],
            "start": os.environ['START_TIME'],
            "stop": os.environ['STOP_TIME'],
            "notes": None  
        }
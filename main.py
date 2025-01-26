import os
import datetime
import csv
import json
import shutil
from dateutil.relativedelta import relativedelta

# general variables for later
now = datetime.datetime.now()
tomorrow = now + relativedelta(days=1)
year = now.strftime("%Y")
month = now.strftime("%B")
day = now.strftime("%d")
week_day = now.strftime("%a")

# must be set by users
# 0 = monday, 6 = sunday
last_week_day = 5
daily_work_hours = 8

# truncates all
debug_mode = True

# files, folders, csv headers and paths
folder = "years"
today_file = month
fields = ["day","weekday", "extra_hours","type","interval"]
year_folder = f"{folder}/{year}"
yearly_json_filename = "resume"

# create a year folder inside the main records folder
if not os.path.exists(year_folder):
     os.makedirs(year_folder)
          
# create a main json file to keep track of the current month
if not os.path.isfile(f"{year_folder}/{yearly_json_filename}.json"):
     with open(f"{year_folder}/{yearly_json_filename}.json", "w") as file:
          init_object =  {
               "available": {
                    "overtime": 0,
                    "time_off": 0,
                    "vacations": 0
               }
          }
          for x in range(12):
               new_date = now + relativedelta(months=x)
               new_month = new_date.strftime("%B")
               init_object[new_month] = { 
                    "hours": 0,
                    "overtime": 0,
                    "time_off": 0,
                    "vacations": 0,
                    "workdays": 0
                         }               
          json.dump(init_object, file, indent=4)


def is_last_month_day():
     return now.day > tomorrow.day

def is_week_day():
     return now.weekday() <= last_week_day

# if today.csv is not already been created, I create and format a file
def create_monthly_file():
     if not os.path.isfile(f"{today_file}.csv") :
          with open(f"{today_file}.csv", "w") as file:
               writer = csv.writer(file)
               writer.writerow(fields)
                    # let's print a row per day
               for x in range(1,32):
                    day_of_the_month = datetime.datetime(year=int(year), month=int(now.strftime("%m")), day=x)
                         # if today's date is more than tomorrow, it means the month is over
                    if is_last_month_day() == False:
                         if is_week_day() == True: 
                         # every day has a weekday, date, eight hours by default and an empty value for the type of extra work time (vacation, time-off, etc..)
                              day_row = [day_of_the_month.strftime("%d"),day_of_the_month.strftime("%a"), 0,"=","9.00/18.00;"]
                              writer.writerow(day_row)
                         else:
                              exit()
                              
create_monthly_file()
               
# reading today's hours and valorizing all variables to update report.json
if is_week_day():
     with open(f"{today_file}.csv", "r") as file:
          next(file)
          reader = csv.reader(file)
          rows = list(reader)
          for row in rows:
               if day == row[0]:
                    extra_hours = int(row[2])
                    type = row[3]
                    interval = row[4]
                    today_worked_hours = eval(f"8{type}{extra_hours}") if type in ["+","-"] else 8
          file.close()


with open(f"{year_folder}/{yearly_json_filename}.json", "r") as file:
     data = json.load(file)
     data[month]["workdays"] += 1
     data[month]["hours"] += today_worked_hours
     extra_hour_type = None
if type == '-':
     data[month]["time_off"] += extra_hours
     data["available"]["time_off"] -= extra_hours
elif type == '+':
     data[month]["overtime"] += extra_hours
elif type == '!':
     data[month]["vacations"] -= 1

with open(f"{year_folder}/{yearly_json_filename}.json", "w") as file:
     json.dump(data, file, indent=4)

# after updating the report, if it's the last month day, 
# I move the report inside the related year folder and start a new csv again


# if is_last_month_day() == True:

               
               
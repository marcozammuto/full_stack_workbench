import os
import datetime
import csv
import json
from dateutil.relativedelta import relativedelta

# general variables for later
now = datetime.datetime.now()
tomorrow = datetime.timedelta(days=1)
year = now.strftime("%Y")
month = now.strftime("%B")
day = now.strftime("%d")
week_day = now.strftime("%a")

# files, folders, csv headers and paths
folder = "conteggi"
today_file = "today"
fields = ["id","weekday", "day", "working_hours", "extra_hours","type"]
month_file_path = f"{folder}/{year}/{month}.csv" 

# just in case this project will last more than a year..
year_folder = f"{folder}/{year}"
if not os.path.exists(year_folder):
     os.makedirs(year_folder)
     
# if today.csv is not present
if not os.path.isfile(f"{today_file}.csv") :
     with open(f"{today_file}.csv", "w") as file:
          writer = csv.writer(file)
          writer.writerow(fields)
          try:
               for x in range(1,32):
                    if datetime.datetime(int(year), int(now.strftime("%m")) ,int(x)).weekday() < 6 and day > relativedelta(days=1).day:
                         day_row = [x, week_day, day, 8, 0,None]
                         writer.writerow(fields)
          except ValueError as e:
               print(f"Errore: {e}")
 
exit()

# reading today's hours
if now.weekday() < 10:
     with open("today.csv", "r") as file:
          reader = csv.reader(file)
          rows = list(reader)
          if len(rows) == 2:
               input_row= rows[1]
               extra_hours = int(input_row[0])
               type = input_row[1]
               interval = input_row[2]    
          else:
               print("Error")

               
if not os.path.exists(month_file_path):
     with open(month_file_path, "w") as month_file:
           writer = csv.writer(month_file)
           writer.writerow(fields)

with open(month_file_path, "r+") as month_file:
      writer = csv.reader(month_file)
      rows = list(writer)
      if day > rows[len(rows)-1][0] or rows[0][0] == fields[0]:
           writer = csv.writer(month_file)
           today_worked_hours = eval(f"8{type}{extra_hours}")
           data = [len(rows), week_day, day, today_worked_hours, interval]
           writer.writerow(data)      
      else:
          print("Errore nella compilazione del giorno")
      
if not os.path.isfile("report.json"):
     with open("report.json", "w") as file:
          init_object = {year: {
               "available": {
                    "overtime": 0,
                    "time_off": 0,
                    "vacations": 0
               }
          }}
          for x in range(12):
               json_month_obj = { 
                                 "hours": 0,
                                 "overtime": 0,
                                 "time_off": 0,
                                 "vacations": 0,
                                 "workdays": 0
                                 }
               
               new_date = now + relativedelta(months=x)
               new_month = new_date.strftime("%B")
               init_object[year][new_month] = json_month_obj
          json.dump(init_object, file, indent=4)
          file.close()
          exit()

with open(f"report.json", "r") as file:
     data = json.load(file)
     year_exists = False
     if year in data:
          data[year][month]["workdays"] += 1
          data[year][month]["hours"] += today_worked_hours
          extra_hour_type = None
          if type == '-':
               data[year][month]["time_off"] += extra_hours
               data[year]["available"]["time_off"] -= extra_hours
          elif type == '!':
               data[year][month]["vacations"] += 1
               data[year]["available"]["vacations"] -= 1
          elif type == '+':
               data[year][month]["overtime"] += extra_hours
     with open("report.json", "w") as file:
          json.dump(data,file, indent= 4)
import csv
import os
import json
import datetime
import shutil

def create_file(path:str, isFile:str):
    if not os.path.exists(path):
        if isFile == True:
            with open(path, "w+") as empty_file:
                empty_file.close()
        else:
            os.makedirs(path, exist_ok=False)
    else:
        print(f"{path} already exists")

def move_file(filename:str,path:str):
     if os.path.exists(path):
          shutil.move(filename, f"{path}/{filename}")
     else:
         os.makedirs(path, exist_ok=False)
         if os.path.exists(filename):
           shutil.move(filename, f"{path}/{filename}")
         else:
             print("The desired file to move is not available")
        
        
fieldnames = ["day","weekday","extra_hours","variation_type","start","finish","lunch_break_skipped","notes"]

def create_new_month_file(filename):
     with open(filename,"w") as out_csv:
        writer = csv.DictWriter(out_csv, fieldnames=fieldnames)
        writer.writeheader()
        print("File created")
        
def add_csv_header(filename):
    fieldnames = ['day', 'weekday', 'id', 'symbol', 'start', 'end', 'checked', 'notes']
    
    with open(filename, "w", newline='') as out_csv:
        writer = csv.DictWriter(out_csv, fieldnames=fieldnames)
        writer.writeheader()

def add_csv_row(filename):
    with open(filename, 'w', newline='') as outcsv:
     writer = csv.DictWriter(outcsv, fieldnames = ["day","weekday","extra_hours","type","interval","fields","reason"])
     writer.writeheader()
        


def initialize_json_resume_file(path):
     if not os.path.exists(path):
          create_file(path, True)
     else:
         print(f"File with name {path} already exists")
          
     with open(path, "w") as json_resume_file:
        init_object = {"available": {"overtime": 0, "time_off": 0, "vacations": 0}}
        today_year = datetime.datetime.now().strftime("%Y")
        for x in range(1, 13):
            new_date = datetime.datetime(int(today_year), int(x), 1)
            new_month = new_date.strftime("%B")
            init_object[new_month] = {
                 "hours": 0,
                 "overtime": 0,
                 "time_off": 0,
                 "vacations": 0,
                 "workdays": 0,
                 }
            json.dump(init_object, json_resume_file, indent=4)
               
def populate_csv_file(filename):
     create_file(f"{filename}.csv",True)
     with open(f"{filename}.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["day", "weekday", "extra_hours", "type", "interval", "fields", "reason"])
        # let's print a row per day
        for x in range(1, 32):
            try:
                day_of_the_month = datetime.datetime(
                    year=int(year), month=int(today.strftime("%m")), day=int(x)
                )
                # if today's date is more than tomorrow, it means the month is over
                if not is_last_month_day(today=today, tomorrow=tomorrow):
                    if is_week_day(day_of_the_month.strftime("%w")):
                        # every day has a weekday, date, eight hours by default and an empty
                        # value for the type of extra work time (vacation, time-off, etc..)
                        day_row = [
                            day_of_the_month.strftime("%d"),
                            day_of_the_month.strftime("%a"),
                            0,
                            "=",
                            "9.00/18.00;",
                        ]
                        writer.writerow(day_row)
                    else:
                        continue
            except ValueError:
                break
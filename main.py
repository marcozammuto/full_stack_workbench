import os
import datetime
import csv
import json
import shutil
from dateutil.relativedelta import relativedelta

# general variables for later
today = datetime.datetime.now()
tomorrow = today + relativedelta(days=1)
yesterday = today - relativedelta(days=1)
year = today.strftime("%Y")
month = today.strftime("%B")
month_nr = int(today.strftime("%m"))
day = today.strftime("%d")
week_day = today.strftime("%a")

# must be set by users
# 0 = sunday, 6 = saturday, 5 set to friday
last_weekday = 5
daily_work_hours = 8

# truncates all
debug_mode = True

# files, folders, csv headers and paths
folder = "years"
yearly_json_filename = "resume"
today_file = month
fields = ["day","weekday", "extra_hours","type","interval","fields","reason"]
year_folder = f"{folder}/{year}"

# functions         
def is_last_month_day():
     return today.day > tomorrow.day

def is_week_day(input_weekday):
     return int(input_weekday) > 0 and int(input_weekday) <= int(last_weekday)

def normalize_user_choice(indexable=True):
     try:       
          x = input()
          input_to_test = int(x)
          return input_to_test - 1 if not indexable else input_to_test
     except ValueError:
          return False

def write_log(text):
     with open("logs.txt", "a") as file:
          file.write(f"{today.strftime("%Y-%m-%d, %H:%M:%S")} - {text}\n")   
  
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
               new_date = today + relativedelta(months=x)
               new_month = new_date.strftime("%B")
               init_object[new_month] = { 
                    "hours": 0,
                    "overtime": 0,
                    "time_off": 0,
                    "vacations": 0,
                    "workdays": 0
                         }               
          json.dump(init_object, file, indent=4)
 
     
# if first month day, move the previous csv on the year folder
yesterday_month = yesterday.strftime("%B")
yesterday_month_path_folder = f"{folder}/{yesterday.strftime("%Y")}"
destination_file = f"{yesterday_month_path_folder}/{yesterday_month}.csv"
if int(day) == 1:
     if os.path.exists(yesterday_month_path_folder):
          shutil.move(f"{yesterday_month}.csv", destination_file)
     else:
          os.makedirs(yesterday_month_path_folder)   
     if os.path.exists(f"{yesterday_month}.csv"):  
          with open(f"{yesterday_month}.csv", "r") as r_file:
               with open(destination_file, "w") as w_file:
                    w_file.write(r_file.read())
else:
     write_log("Il file del mese precedente non esiste.")

# if today.csv is not already been created, I create and format a file
if not os.path.isfile(f"{today_file}.csv") :
     with open(f"{today_file}.csv", "w") as file:
          writer = csv.writer(file)
          writer.writerow(fields)
          # let's print a row per day
          for x in range(1,32):
               day_of_the_month = datetime.datetime(year=int(year), month=int(today.strftime("%m")), day=x)
               # if today's date is more than tomorrow, it means the month is over
               if is_last_month_day() == False:
                    if is_week_day(day_of_the_month.strftime("%w")) == True: 
                         # every day has a weekday, date, eight hours by default and an empty 
                         # value for the type of extra work time (vacation, time-off, etc..)
                         day_row = [day_of_the_month.strftime("%d"),day_of_the_month.strftime("%a"), 0,"=","9.00/18.00;"]
                         writer.writerow(day_row)
                    else:
                         continue

# reading today's hours and valorizing
# all variables to update report.json
if is_week_day(today.strftime("%w")):
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
     if type == '-':
          data[month]["time_off"] += extra_hours
          data["available"]["time_off"] -= extra_hours
     elif type == '+':
          data[month]["overtime"] += extra_hours
     elif type == '!':
          data[month]["vacations"] -= 1

     with open(f"{year_folder}/{yearly_json_filename}.json", "w") as file:
          json.dump(data, file, indent=4)

def interact_with_user(): 
     def clear_interactions():
          os.system("clear") 
          print("Scelta non valida, riprova.\n")
          interact_with_user()
     
     actions = [
          { "label": "straordinari", "object":  "overtime"}, 
          { "label": "permessi", "object": "time_off"}, 
          { "label": "ferie", "object": "vacations"},
          { "label": "check di un mese", "object": "vacations"}
          ]

     print("Come posso aiutarti oggi?")

     for idx, action in enumerate(actions):
          print(f"{idx+1} - {action["label"][0].capitalize()}{action["label"][1:len(action["label"])]}")
     answer = normalize_user_choice(indexable=False)
     if isinstance(answer, int) and answer < len(actions):
          with open (f"{folder}/{year}/{yearly_json_filename}.json", "r") as file:
               data = json.load(file)
               quantity = data["available"][actions[answer]["object"]] 
               os.system("clear")
               match answer:
                    case 0:
                         print(f"Questo mese hai effettuato {data[f"{today.strftime("%B")}"]["overtime"]} ore di straordinario.\n")
                    case 1:
                         print(f"Hai a disposizione {quantity} {"ora" if quantity == 1 else "ore"} di permessi.\n")
                    case 2:
                         print(f"Hai accumulato {quantity} {"giorno" if quantity == 1 else "giorni"} di ferie.\n")
                    case 3:
                         italian_months = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"]
                         print("Di quale mese vuoi fare il report? Digita il numero accanto al mese desiderato.\n")
                         for idx, month in enumerate(italian_months):
                              if (month_nr > idx):
                                   print(f"{idx + 1} - {month[0].capitalize()}{month[1:len(month)]}")
                                   print("13 - Anni precedenti")
                                   answer = normalize_user_choice(True)
                                   if answer != False and isinstance(answer, int) and (answer in range(1,month_nr) or answer == 13):
                                        if answer == 13:
                                             print("\nYears logic..")
                                             exit()
                                        else:
                                             date = datetime.datetime(int(year), answer, 1)
                                             selected_month = data[f"{date.strftime("%B")}"]
                                             print(f"\nRiepilogo {italian_months[answer - 1]} {year}\n")
                                             print(f"- {selected_month['workdays']} giorni lavorativi;")
                                             print(f"- {selected_month['hours']} ore totali;")
                                             print(f"- Maturato {selected_month['overtime']} ore di straordinario;")
                                             print(f"- Effettuato {selected_month['time_off']} ore di permesso.")
                                             print(f"- Richiesto {selected_month['vacations']} giorni di ferie.\n")
                                   else:
                                        clear_interactions()        
          interact_with_user()
     else:
          clear_interactions()         

interact_with_user()
import os
import re
import json
from utils.fs import PathUtils
from utils.date import DateUtils
from utils.string import render_string, capitalize_string, sanitize_input
import datetime

class TerminalUtils:
    @staticmethod
    def write_log(text, today):
        with open("logs.txt", "a") as file:
            file.write(f"{today.strftime('%Y-%m-%d, %H:%M:%S')} - {text}\n")
    
    @staticmethod
    def get_interactions():
            path = os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['TERMINAL_BLUEPRINT_FILENAME']}.json")
            with open(path, "r") as f:
                return json.load(f)        
    
    @staticmethod
    def clear():
        os.system("cls" if os.name == "nt" else "clear")
        print("Scelta non valida, riprova.\n")
        
    @staticmethod
    def print_choices(interactions):
        for idx, action in enumerate(interactions):
            print(f"{idx + 1} - {capitalize_string(action['label'])}")  
        
    
    @staticmethod
    def print_answer(data, month, available, used, answers, input, interactions):
         today = DateUtils.today()
         year = today.strftime("%Y")
         answer = answers[input]   
         hour_regex = r'(?<=\s)or(?=\s)'
         day_regex = r'(?<=\s)giorn(?=\s)'
         
         print(interactions[os.environ['TERMINAL_INTRO_KEY']])

         match input:
             case 0:
                 value = month[os.environ['YEAR_OVERTIME_KEY']]
                 print(re.sub(hour_regex, 'ora' if value == 1 else 'ore',render_string(answer, value)))
                 exit()
             case 1:
                 value = month[os.environ['YEAR_TIME_OFF_KEY']]
                 print(re.sub(hour_regex, 'ora' if value == 1 else 'ore',render_string(answer, value)))
                 exit()
             case 2:
                 value = available[os.environ['YEAR_VACATION_KEY']]
                 print(re.sub(day_regex, 'giorno' if value == 1 else 'giorni', render_string(answer, value)))
                 exit()
             case 3:
                 print(answer)
                 italian_months = interactions[os.environ['TERMINAL_ITALIAN_MONTHS_KEY']]
                 allowed_answers = []
                 
                 for idx, month_it in enumerate(italian_months):
                     if idx < int(today.strftime("%m")):
                         allowed_answers.append(idx + 1)
                         print(f"{idx + 1} - {capitalize_string(month_it)}")

                 allowed_answers.append(13)                                  
                 print(f"13 - {capitalize_string(italian_months[-1])}")
                
                 input = sanitize_input(True) 

                 if input not in allowed_answers:
                     print(interactions[os.environ['TERMINAL_INVALID_KEY']])
                 else:
                     month_node = data[datetime.date(int(year), int(input), 1).strftime('%B')]
                     TerminalUtils.print_choices(interactions=interactions[os.environ['TERMINAL_MENU_KEY']])     
                     TerminalUtils.print_answer(data=data, month=month_node, available=data[os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']], used=None, answers=interactions[os.environ['TERMINAL_REPORT_ANSWERS_LIST_KEY']], input=input, interactions=interactions)


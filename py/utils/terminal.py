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
        
    @staticmethod
    def print_choices(interactions):
        print(interactions[os.environ['TERMINAL_INTRO_KEY']])
        for idx, action in enumerate(interactions[os.environ['TERMINAL_MENU_KEY']]):
            print(f"{idx + 1} - {capitalize_string(action['label'])}")  
            
    @staticmethod
    def raise_error(message):
        print(message)


    @staticmethod
    def menu(data, month, input, interactions):
         
         answer = interactions[os.environ['YEAR_BLUEPRINT_REPORT_MONTH_NODE_OBJ_NAME']][input]   
         hour_regex = r'(?<=\s)or(?=\s)'
         day_regex = r'(?<=\s)giorn(?=\s)'
         
         available = data[os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']]
                           
         match input:
             case 0:
                 value = month[os.environ['YEAR_OVERTIME_KEY']]
                 print(re.sub(hour_regex, 'ora' if value == 1 else 'ore',render_string(answer, value)))
             case 1:
                 value = month[os.environ['YEAR_TIME_OFF_KEY']]
                 print(re.sub(hour_regex, 'ora' if value == 1 else 'ore',render_string(answer, value)))
                 value = data[os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']][os.environ['YEAR_TIME_OFF_KEY']]
                 print(re.sub(hour_regex, 'ora' if value == 1 else 'ore',render_string("Hai ancora a disposizione {{placeholder}} or di ROL", value)))
             case 2:
                 value = month[os.environ['YEAR_VACATION_KEY']]
                 print(re.sub(day_regex, 'giorno' if value == 1 else 'giorni', render_string(answer, value)))
                 value = available[os.environ['YEAR_VACATION_KEY']]
                 print(re.sub(day_regex, 'giorno' if value == 1 else 'giorni',render_string("Hai ancora a disposizione {{placeholder}} giorn di ferie", value)))
             case 3:
                 TerminalUtils.print_month_report(interactions=interactions, data=data, input=input)
             case _:
                TerminalUtils.raise_error(interactions[os.environ['TERMINAL_INVALID_KEY']])

    @staticmethod
    def print_month_report(interactions, data, input):
        TerminalUtils.clear()
        print(interactions[os.environ['YEAR_BLUEPRINT_REPORT_MONTH_NODE_OBJ_NAME']][3])
        today = DateUtils.today()
        year = today.strftime("%Y")
        allowed_answers = []
        other_year_option = 12
        italian_months = interactions[os.environ['TERMINAL_ITALIAN_MONTHS_KEY']]                 
       
        for idx, month_it in enumerate(italian_months):
            if idx < int(today.strftime("%m")):
                allowed_answers.append(idx)
                print(f"{idx + 1} - {capitalize_string(month_it)}")
        allowed_answers.append(other_year_option)                                  
        print(f"13 - {capitalize_string(italian_months[-1])}")
        
        input = sanitize_input(allowed_answers) 

        if input != other_year_option:
            selected_month = data[datetime.date(int(year), int(input + 1), 1).strftime('%B')]           
            TerminalUtils.clear()
            print(f"===\nReport del mese di {italian_months[input]} {year}")
            print("Hai effettuato:")
            for idx, v in enumerate(interactions["menu"]):
                if idx <= 2:
                    print(f"{v['label']}: {selected_month[v['object']]}")
                else:
                    break
            print("===")
        else:
            data_path = PathUtils.get_data_path()
            directories = os.scandir(data_path)            
            
            allowed_answers = []
            available_years = []
            
            print("==\nDi quale anno vuoi vedere il report?")
            for idx, year in enumerate(directories):
                allowed_answers.append(idx)
                name = year.name
                available_years.append(name)
                print(f"{idx + 1} - {name}")
            
            input = sanitize_input(allowed_answers)
            input = available_years[input]
            
            json_year_filepath = os.path.join(data_path, input, "resume.json")
            
            with open(json_year_filepath, "r") as f:
                data = json.load(f)
                print(f"==\n Report anno {input}")
                TerminalUtils.print_choices(interactions=interactions)
                input = sanitize_input([0,1])
                
                TerminalUtils.menu(data, data["January"], input, interactions)
    
            print("Simon")
            

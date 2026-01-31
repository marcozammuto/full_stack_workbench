import os
import re
import json
import datetime
from utils.io import PathUtils
from utils.string import render_string, capitalize_string, sanitize_input

class TerminalUtils:            
    @staticmethod
    def create_log():
        def check_hour_variation(string):
            try:
                x = int(string)
                if x < 1 and x > 8:
                    raise ValueError("This amount of hours is not valid")
            except TypeError as te:
                raise(te)
        
        
        interactions = TerminalUtils.get_interactions()[os.environ['TERMINAL_MENU_KEY']][os.environ['TERMINAL_WRITE_KEY']]
        log = {
            "day" :datetime.datetime.now().date().strftime("%Y-%m-%d"),
            "extra_hours": 0,
            "variation_type": "=",
            "start": os.environ['START_TIME'],
            "stop": os.environ['STOP_TIME'],
            "notes": None  
        }
        base_appendix = "Otherwise don't type anything.\n"
        hrs_appendix = f"If you did it, type the amount of hours. {base_appendix}" 
        variation_hours = input(f"Did you work overtime? {hrs_appendix}")
        time_pattern = re.compile("/^\d{2}:\d{2}$/")
        if variation_hours != "":
            log["variation_type"] = "+"
            check_hour_variation(variation_hours)
            log["extra_hours"] = int(variation_hours)
        else: 
            log["extra_hours"] = 0
            # user typed 0, check for time-off
            variation_hours = input(f"Took some time-off? {hrs_appendix}")
            if (variation_hours != ""):
                log["variation_type"] = "-"
                check_hour_variation(variation_hours)
                log["extra_hours"] = int(variation_hours)
            else:
                log["extra_hours"] = 0
        time_question = "Type in hh:MM format if you"
        start_input = input(f"{time_question} started at a different time from {os.environ['START_TIME']}. {base_appendix}")
        if start_input != "":
            if not re.match(time_pattern, start_input):
                raise ValueError("Invalid start time format")
        else:
            log["start"] = os.environ['START_TIME']
        stop_input = input(f"{time_question} stopped at a different time from {os.environ['STOP_TIME']}. {base_appendix} ")
        if stop_input != "":
            if not re.match(time_pattern, stop_input):
                raise ValueError("Invalid start time format")
        else:
            stop_input = os.environ['STOP_TIME']
        notes = input("Do you have some additional notes to leave?")
        if notes != "":
            log["notes"] = notes
        return log
        
    @staticmethod
    def get_interactions():
            path = os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['TERMINAL_BLUEPRINT_FILENAME']}.json")
            with open(path, "r") as f:
                return json.load(f)        
    
    @staticmethod
    def print_choices(node):
        for idx, action in enumerate(node):
            print(f"{idx + 1} - {capitalize_string(action['label'])}") 
        return node
    

    @staticmethod
    def month_menu(data, month, input, interactions):
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
    def print_old_year_report(input, data, interactions):
            TerminalUtils.clear()
            print(f"===\nNel {input} hai effettuato:")
            
            resume = {
                os.environ['YEAR_OVERTIME_KEY'] : 0,
                os.environ['YEAR_TIME_OFF_KEY'] : 0,
                os.environ['YEAR_VACATION_KEY'] : 0,
                os.environ['YEAR_SICK_DAY_KEY'] : 0
            }
                        
            del data[os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']]
                        
            for month in data:
                resume[os.environ['YEAR_OVERTIME_KEY']] += data[month][os.environ['YEAR_OVERTIME_KEY']]
                resume[os.environ['YEAR_TIME_OFF_KEY']] += data[month][os.environ['YEAR_TIME_OFF_KEY']]
                resume[os.environ['YEAR_VACATION_KEY']] += data[month][os.environ['YEAR_VACATION_KEY']]
                resume[os.environ['YEAR_SICK_DAY_KEY']] += data[month][os.environ['YEAR_SICK_DAY_KEY']]

            for k in resume.keys():
                print(f"{k}: {resume[k]}")
            print("===\nVuoi effettuare il check di un mese in particolare?\n1 - Sì\n2 - No")
            
            input = sanitize_input([0,1])
            
            if input == 1:
                TerminalUtils.clear()
                print("Grazie, a presto!")
                exit()
            else:
                print(f"Di quale mese del {input} vuoi effettuare un check?")
                months_list = list(range(0,12))
                for x in months_list:
                    print(f"{x + 1} - {capitalize_string(interactions[os.environ['TERMINAL_ITALIAN_MONTHS_KEY']][x])}")
                
                input = sanitize_input(months_list)
                
                print(data[list(data.keys())[input]])
                        
    @staticmethod
    def print_month_report(interactions, data, input):
        TerminalUtils.clear()
        print(interactions[os.environ['YEAR_BLUEPRINT_REPORT_MONTH_NODE_OBJ_NAME']][3])
        today = datetime.datetime.today()
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
                TerminalUtils.print_old_year_report(input=input, data=data, interactions=interactions)
        
            

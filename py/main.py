import os
import json
from datetime import datetime

from utils.date import DateUtils
from utils.string import sanitize_input
from utils.fs import CreateFileUtils, PathUtils
from utils.terminal import TerminalUtils
from utils.request import RequestUtils
from dotenv import load_dotenv

load_dotenv()

CreateFileUtils.initialize.year(datetime.today().strftime("%Y"))
CreateFileUtils.initialize.month()
    
def main():    
    interactions = TerminalUtils.get_interactions()    
    data = None
    
    TerminalUtils.clear()
    TerminalUtils.print_choices(interactions=interactions)
    
    print(datetime.date().isoformat())
    exit()
    
    
    RequestUtils.check_national_holiday(datetime.date().isoformat())

    try:  
        input = sanitize_input(list(range(len(interactions) - 3)))  
        with open(PathUtils.year(datetime.today().strftime("%Y")), "r") as f:
            data = json.load(f)
            if not data:
                raise FileNotFoundError("File non trovato")
                    
        TerminalUtils.menu(data=data, month=data[f'{DateUtils.today().strftime("%B")}'], input=input, interactions=interactions)
                
    except Exception as te:
        print(te)
            
main()

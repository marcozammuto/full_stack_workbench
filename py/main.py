import os
import json
import datetime
import datetime

from create_files.create_file_utils import CreateFileUtils
from utils.string import sanitize_input
from utils.io import IoUtils, PathUtils
from utils.terminal import TerminalUtils

from dotenv import load_dotenv
load_dotenv()

    
def main():   
     
    #routine operations (add new month files, add a new default working day, ecc..)
    CreateFileUtils.daily_update()
    
    #gets all strings needed for the terminal interactions
    interactions = TerminalUtils.get_interactions()[os.environ['TERMINAL_MENU_KEY']]
    
    #choices for the first menu
    main_choices = TerminalUtils.print_choices(interactions['main'])
   
    try:  
        input = sanitize_input(main_choices)
        
        match input:
            case 0:
                log = TerminalUtils.create_log()
                CreateFileUtils.daily_update(log)
            case 1:
                with open(PathUtils.year(datetime.today().strftime("%Y")), "r") as f:
                    data = json.load(f)
                    TerminalUtils.menu(data=data, month=data[f'{datetime.today().strftime("%B")}'], input=input, interactions=TerminalUtils.get_interactions())
            case _:
                print(f"Thank you for using {os.environ['APP_NAME']}")
                exit()
         
        
    except ValueError as te:
        print(os.environ["INVALID_INPUT"])
        print(te)
    except TypeError as te:
        print(os.environ["INVALID_INPUT"])
        print(te)
     
while True:       
    main()

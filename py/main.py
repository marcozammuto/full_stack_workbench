
import datetime

from dotenv import load_dotenv
from utils.date import DateUtils
from utils.string import sanitize_input
from utils.fs import CreateFileUtils, PathUtils
from utils.terminal import TerminalUtils

import os
import json

load_dotenv()

CreateFileUtils.initialize.year()
CreateFileUtils.initialize.month()
    
def main():     
    TerminalUtils.clear()
    interactions = TerminalUtils.get_interactions()    
    TerminalUtils.print_choices(interactions=interactions[os.environ['TERMINAL_MENU_KEY']])
    input = sanitize_input(indexable=False)
    if isinstance(input, int) and input <= len(interactions):
          if input == 4:
              os.system("cls" if os.name == "nt" else "clear")
              print(interactions[os.environ['TERMINAL_OUTRO_KEY']])
          else:
              
            with open(PathUtils.year(), "r") as f:
                 data = json.load(f)      
                 TerminalUtils.print_answer(data=data, month=data[f'{DateUtils.today().strftime("%B")}'], available=data[os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']], used=None, answers=interactions[os.environ['TERMINAL_REPORT_ANSWERS_LIST_KEY']], input=input, interactions=interactions)
                                  
main()
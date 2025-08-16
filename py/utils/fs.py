import os
import json
import csv
import datetime
from utils.date import DateUtils
from utils.csv import CsvUtils


class PathUtils:
    @staticmethod
    def _get_base_path():
        cwd = os.path.dirname(os.path.abspath(__file__))
        return os.path.dirname(os.path.dirname(cwd))
    
    @staticmethod
    def _get_data_path(): 
        path = os.path.join(PathUtils._get_base_path(), os.environ.get('MAIN_FOLDER_NAME'))
        os.makedirs(path, exist_ok=True)
        return path
   
    @staticmethod
    def get_blueprint_folder_path():
        path = os.path.join(PathUtils._get_base_path(), os.environ.get('BLUEPRINT_FOLDER_NAME'))
        os.makedirs(path, exist_ok=True)
        return path
    

    @staticmethod
    def year(year):
        year_folder = os.path.join(PathUtils._get_data_path(), year)
        os.makedirs(year_folder, exist_ok=True)
        year_file_path = os.path.join(year_folder, f"{os.environ['YEAR_RESUME_FILENAME']}.json")
        if not os.path.exists(year_file_path):
            with open (year_file_path, "w+") as f:
                json.dump({}, f, indent=4)
        return year_file_path

    @staticmethod
    def month(short_month_name):
        month_file = os.path.join(PathUtils._get_data_path(), DateUtils.today().strftime("%Y"), f"{short_month_name}.csv")
        return month_file

class CreateFileUtils:
    class Blueprint:
         def __init__(self, path, nodes):
            self.path = path
            self.nodes = nodes

    class initialize:
        @staticmethod
        def year(year):
            blueprint = CreateFileUtils.Blueprint(
                path = os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['YEAR_BLUEPRINT_FILENAME']}.json"),
                nodes = None
                )
            
            with open(blueprint.path, "r") as f:
                blueprint.nodes = json.load(f)
                f.close()
            json_filepath = PathUtils.year(year)
            
                   
            with open(json_filepath, "r") as f:
                data = json.load(f)
                if not data:
                    f.close()
                    with open(json_filepath, "w") as f:
                        shared_node = os.environ['YEAR_BLUEPRINT_RESUME_NODE_OBJ_NAME']
                        obj = {
                                f'{os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']}': blueprint.nodes[shared_node]
                            }
                        for x in range(1, 13):
                            date = datetime.datetime(year=int(datetime.datetime.now().strftime("%Y")), month=int(x), day=1)
                            new_month = date.strftime("%B")
                            merged = {**blueprint.nodes[shared_node],  "sick_days": 0}
                            obj[new_month] = merged
                        json.dump(obj, f, indent=4)
                    
        def month():
            class Csv:
             def __init__(self, path, columns):
                self.path = path
                self.columns = columns
            
            blueprint = CreateFileUtils.Blueprint(
                path =  os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['MONTH_BLUEPRINT_FILENAME']}.json"),
                nodes = None
            )
            
            with open(blueprint.path, "r") as f:
                blueprint.nodes = json.load(f)
                f.close()
                
            file_path = f"{PathUtils.month(DateUtils.today().strftime("%B"))}"
        
            csv_obj = Csv(file_path,blueprint.nodes[os.environ['MONTH_CSV_COLUMNS']])
                        
            if not os.path.exists(file_path):
                CsvUtils.header.add(csv_obj.path, csv_obj.columns)
            
            with open(file_path, newline='') as f:
                spamreader = csv.reader(f, delimiter=',', quotechar='|')
                last_row_date = list(spamreader)[-1][0]
                if last_row_date != datetime.date.today().isoformat():
                    CsvUtils.row.add(csv_obj.path, csv_obj.columns)            
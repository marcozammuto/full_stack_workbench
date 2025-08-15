import os
import json
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
    def year():
        year_folder = os.path.join(PathUtils._get_data_path(), DateUtils.today().strftime("%Y"))
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
        def year():
            blueprint = CreateFileUtils.Blueprint(
                path = os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['YEAR_BLUEPRINT_FILENAME']}.json"),
                nodes = None
            )
            
            with open(blueprint.path, "r") as f:
                blueprint.nodes = json.load(f)
                f.close()
            json_file_path = PathUtils.year()
            with open(json_file_path, "w") as json_resume_file:
                shared_node = os.environ['YEAR_BLUEPRINT_RESUME_NODE_OBJ_NAME']
                obj = {
                        f'{os.environ['YEAR_BLUEPRINT_AVAILABLE_NODE_OBJ_NAME']}': blueprint.nodes[shared_node],
                        f'{os.environ['YEAR_BLUEPRINT_USED_NODE_OBJ_NAME']}': blueprint.nodes[shared_node]
                    }
                for x in range(1, 13):
                    date = datetime.datetime(year=int(datetime.datetime.now().strftime("%Y")), month=int(x), day=1)
                    new_month = date.strftime("%B")
                    merged = {**blueprint.nodes[shared_node], **blueprint.nodes[os.environ['YEAR_BLUEPRINT_RESUME_MONTH_NODE_OBJ_NAME']]}
                    obj[new_month] = merged
                json.dump(obj, json_resume_file, indent=4)
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
                                
            csv = Csv(f"{PathUtils.month(DateUtils.today().strftime("%B"))}",blueprint.nodes[os.environ['MONTH_CSV_COLUMNS']])
                        
            CsvUtils.header.add(csv.path, csv.columns)
            CsvUtils.row.add(csv.path, csv.columns)
            
            

import os
import json
import csv
import datetime

class PathUtils:
    @staticmethod
    def _get_base_path():
        cwd = os.path.dirname(os.path.abspath(__file__))
        return os.path.dirname(os.path.dirname(cwd))
    
    @staticmethod
    def get_data_path(): 
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
        year_folder = os.path.join(PathUtils.get_data_path(), year)
        os.makedirs(year_folder, exist_ok=True)
        year_file_path = os.path.join(year_folder, f"{os.environ['YEAR_RESUME_FILENAME']}.json")
        if not os.path.exists(year_file_path):
            with open (year_file_path, "w+") as f:
                json.dump({}, f, indent=4)
        return year_file_path

    @staticmethod
    def month(short_month_name):
        month_file = os.path.join(PathUtils.get_data_path(), datetime.datetime.today().strftime("%Y"), f"{short_month_name}.csv")
        return month_file

class IoUtils:
    class Blueprint:
         def __init__(self, path, nodes):
            self.path = path
            self.nodes = nodes

    class initialize:
        #initializes a new year JSON file
        @staticmethod
        def year():
            # getting the blueprint file in order to get the right fields
            blueprint = IoUtils.Blueprint(
                path = os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['YEAR_BLUEPRINT_FILENAME']}.json"),
                nodes = None
                )
            # opening the file
            with open(blueprint.path, "r") as f:
                blueprint.nodes = json.load(f)
                f.close()
            json_filepath = PathUtils.year(datetime.datetime.today().strftime("%Y"))
                  
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
                    
        def day():
            class Csv:
             def __init__(self, path, columns):
                self.path = path
                self.columns = columns
            
            blueprint = IoUtils.Blueprint(
                 path =  os.path.join(PathUtils.get_blueprint_folder_path(), f"{os.environ['MONTH_BLUEPRINT_FILENAME']}.json"),
                 nodes = None
             )
            
                        
            with open(blueprint.path, "r") as f:
                 blueprint.nodes = json.load(f)
                 f.close()
                
            file_path = f"{PathUtils.month(datetime.datetime.today().strftime("%B"))}"
        
            csv_obj = Csv(file_path,blueprint.nodes[os.environ['MONTH_CSV_COLUMNS']])
            
            csv_columns = os.environ['CSV_COLUMNS'].split(',')
            
            if not os.path.exists(file_path):
                CsvUtils.header.add(file_path, csv_columns)
            
            with open(file_path, newline='') as f:
                 last_row = list(csv.reader(f, delimiter=',', quotechar='|'))[-1]
                 if last_row[0] != datetime.date.today().isoformat() and os.environ['ONLINE_MODE'] == "1":
                    CsvUtils.row.add_default(file_path)
                    print("New row")
                               
 
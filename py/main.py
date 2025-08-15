import os
import datetime
import csv
import json
import shutil
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv

load_dotenv()

from utils.boolean import is_first_month_day, is_week_day
from utils.string import sanitize_input
from utils.fs import initialize_json_resume_file, add_csv_header,add_csv_row, move_file, create_new_month_file
from utils.terminal import write_log,clear_interactions

# vars
today = datetime.datetime.now()
tomorrow = today + relativedelta(days=1)
yesterday = today - relativedelta(days=1)

# lately, must be set by users


# files, folders, csv headers and paths
year_folder_path = f"{os.environ["YEAR_FOLDER_NAME"]}/{today.strftime("%Y")}"

if is_first_month_day(today=today,yesterday=yesterday) or 1 == 1:
    move_file(filename=f"{yesterday.strftime("%B")}.csv", path=year_folder_path)
    new_month_filename = f"{today.strftime("%B")}.csv"
    create_new_month_file(new_month_filename)
    add_csv_header(new_month_filename)
    add_csv_row(new_month_filename)

initialize_json_resume_file(path=f"{today.strftime("%Y")}.json")
    
# if is_week_day() == True:
#     with open(today.strftime("%B"), "w") as file:
#         file = csv.reader(file, dialect="excel", delimiter=",")
#         next(file)
#         workdays = 0
#         total_worked_hours = 0
#         total_extra_hours = 0
#         total_hours_off = 0
#         for row in file:
#             if int(row[0]) <= int(today.strftime("%d")):
#                 workdays += 1
#                 type = row[3]
#                 total_hours_off += 1 if type == "-" else 0
#                 extra_hours = int(row[2])
#                 today_worked_hours = (
#                     eval(f"{type}{extra_hours}") if type in ["+", "-"] else 8
#                 )
#                 total_worked_hours += int(today_worked_hours)
#                 total_extra_hours += today_worked_hours if type == "+" else 0
#                 interval = row[4]
# else:
#     print("Ciao")
                
exit()
    
    # with open(f"{year_folder_path}/{year}.json", "r") as file:
    #      data = json.load(file)
    #      data[month]["workdays"] = workdays
    #      data[month]["hours"] = total_worked_hours
    #      if type == "-":
    #         data[month]["time_off"] = total_hours_off
    #         data["available"]["time_off"] -= total_hours_off
    #      elif type == "+":
    #         data[month]["overtime"] = total_extra_hours
    #      elif type == "!":
    #         data[month]["vacations"] -= 1

    #      with open(f"{year_folder_path}/{year}.json", "w") as file:
    #         json.dump(data, file, indent=4)


def main():
    clear_interactions()
    actions = [
        {"label": "straordinari", "object": "overtime"},
        {"label": "permessi", "object": "time_off"},
        {"label": "ferie", "object": "vacations"},
        {"label": "check di un mese", "object": "vacations"},
        {"label": "esci", "object": None},
    ]

    print("Come posso aiutarti oggi?")

    for idx, action in enumerate(actions):
        print(
            f"{idx + 1} - {action['label'][0].capitalize()}{action['label'][1 : len(action['label'])]}"
        )
    answer = sanitize_input(indexable=False)
    if isinstance(answer, int) and answer <= len(actions):
        if answer == 4:
            os.system("cls" if os.name == "nt" else "clear")
            exit()
        else:
            with open(f"{folder}/{year}/{year}.json", "r") as file:
                data = json.load(file)
                quantity = data["available"][actions[answer]["object"]]
                os.system("cls" if os.name == "nt" else "clear")
                match answer:
                    case 0:
                        print(
                            f"Questo mese hai effettuato {data[f'{today.strftime("%B")}']['overtime']} ore di straordinario.\n"
                        )
                    case 1:
                        print(
                            f"Hai a disposizione {quantity} {'ora' if quantity == 1 else 'ore'} di permessi.\n"
                        )
                    case 2:
                        print(
                            f"Hai accumulato {quantity} {'giorno' if quantity == 1 else 'giorni'} di ferie.\n"
                        )
                    case 3:
                        italian_months = [
                            "gennaio",
                            "febbraio",
                            "marzo",
                            "aprile",
                            "maggio",
                            "giugno",
                            "luglio",
                            "agosto",
                            "settembre",
                            "ottobre",
                            "novembre",
                            "dicembre",
                        ]
                        print(
                            "Di quale mese vuoi fare il report? Digita il numero accanto al mese desiderato.\n"
                        )
                        for idx, month in enumerate(italian_months):
                            if month_nr > idx:
                                print(
                                    f"{idx + 1} - {month[0].capitalize()}{month[1 : len(month)]}"
                                )
                                print("13 - Anni precedenti")
                                answer = sanitize_input(True)
                                if (
                                    not answer
                                    and isinstance(answer, int)
                                    and (answer in range(1, month_nr) or answer == 13)
                                ):
                                    if answer == 13:
                                        print("\nYears logic..")
                                        exit()
                                    else:
                                        date = datetime.datetime(int(year), answer, 1)
                                        selected_month = data[f"{date.strftime('%B')}"]
                                        print(
                                            f"\nRiepilogo {italian_months[answer - 1]} {year}\n"
                                        )
                                        print(
                                            f"- {selected_month['workdays']} giorni lavorativi;"
                                        )
                                        print(
                                            f"- {selected_month['hours']} ore totali;"
                                        )
                                        print(
                                            f"- Maturato {selected_month['overtime']} ore di straordinario;"
                                        )
                                        print(
                                            f"- Effettuato {selected_month['time_off']} ore di permesso."
                                        )
                                        print(
                                            f"- Richiesto {selected_month['vacations']} giorni di ferie.\n"
                                        )
                                else:
                                    clear_interactions()
            main()
    else:
        clear_interactions()


main()

import os

def write_log(text, today):
    with open("logs.txt", "a") as file:
        file.write(f"{today.strftime('%Y-%m-%d, %H:%M:%S')} - {text}\n")

def clear_interactions():
        os.system("cls" if os.name == "nt" else "clear")
        print("Scelta non valida, riprova.\n")
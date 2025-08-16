def sanitize_input(allowed_inputs):
    x = input()
    try:
        x = int(x) - 1 
    except ValueError:
        raise ("Inserisci un numero") 
    if x in allowed_inputs:
        return x
    else:
        raise IndexError("Opzione non valida")


def capitalize_string(string):
    return f"{string[0].capitalize()}{string[1 : len(string)]}"

def render_string(string, value):
    return string.replace("{{placeholder}}", str(value))
def sanitize_input(node):
    x = input()
    x = int(x) - 1
    max_length = len(node) - 1
    if x > max_length:
        raise ValueError("Questo numero è troppo grande")
    else:

        return x

def capitalize_string(string):
    return f"{string[0].capitalize()}{string[1 : len(string)]}"

def render_string(string, value):
    return string.replace("{{placeholder}}", str(value))
def sanitize_input(indexable=True):
    try:
        x = input()
        input_to_test = int(x)
        return input_to_test - 1 if not indexable else input_to_test
    except ValueError:
        return False

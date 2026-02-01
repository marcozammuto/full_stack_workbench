export type Operation = '+' | '-' | '*' | '/' | '^' | '%';
export type ScientificFunction = 'sin' | 'cos' | 'tan' | 'sqrt' | 'ln' | 'log' | 'exp' | 'factorial';

export const isOperator = (char: string): char is Operation => {
  return ['+', '-', '*', '/', '^', '%'].includes(char);
};

export const performCalculation = (num1: number, num2: number, operator: Operation): number => {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) throw new Error('Division by zero');
      return num1 / num2;
    case '^':
      return Math.pow(num1, num2);
    case '%':
      return num1 % num2;
    default:
      return num2;
  }
};

export const applyScientificFunction = (value: number, func: ScientificFunction, isDegrees: boolean = false): number => {
  const angle = isDegrees ? (value * Math.PI) / 180 : value;

  switch (func) {
    case 'sin':
      return Math.sin(angle);
    case 'cos':
      return Math.cos(angle);
    case 'tan':
      return Math.tan(angle);
    case 'sqrt':
      if (value < 0) throw new Error('Invalid input');
      return Math.sqrt(value);
    case 'ln':
      if (value <= 0) throw new Error('Invalid input');
      return Math.log(value);
    case 'log':
      if (value <= 0) throw new Error('Invalid input');
      return Math.log10(value);
    case 'exp':
      return Math.exp(value);
    case 'factorial':
      if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid input');
      if (value > 170) throw new Error('Number too large');
      let result = 1;
      for (let i = 2; i <= value; i++) {
        result *= i;
      }
      return result;
    default:
      return value;
  }
};

export const formatNumber = (num: number, maxLength: number = 12): string => {
  if (!isFinite(num)) return 'Error';

  const str = num.toString();
  if (str.length <= maxLength) return str;

  if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999999999) {
    return num.toExponential(6);
  }

  return parseFloat(num.toPrecision(maxLength)).toString();
};

export const safeEvaluate = (expression: string): number => {
  const tokens = tokenize(expression);
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
};

const tokenize = (expression: string): string[] => {
  const tokens: string[] = [];
  let current = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === ' ') continue;

    if (isOperator(char) || char === '(' || char === ')') {
      if (current) {
        tokens.push(current);
        current = '';
      }
      tokens.push(char);
    } else if (char >= '0' && char <= '9' || char === '.') {
      current += char;
    }
  }

  if (current) tokens.push(current);
  return tokens;
};

const infixToPostfix = (tokens: string[]): string[] => {
  const output: string[] = [];
  const operators: string[] = [];
  const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
    '^': 3
  };

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      output.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      operators.pop();
    } else if (isOperator(token)) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    output.push(operators.pop()!);
  }

  return output;
};

const evaluatePostfix = (tokens: string[]): number => {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (isOperator(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(performCalculation(a, b, token as Operation));
    }
  }

  return stack[0] || 0;
};

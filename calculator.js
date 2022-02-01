function calc() {
    let calculatorDivElement = document.getElementById('calculator');
    let resultElement = document.getElementById('user-input');
    let equationElement = document.getElementById('equation');
    let preview = false;

    calculatorDivElement.addEventListener('click', (e) => {
        if (e.target.tagName != 'INPUT') return;

        let buttonElement = e.target;
        let currentValue = buttonElement.value;

        if (
            !isNaN(currentValue) ||
            (currentValue == '.' && !resultElement.textContent.includes('.'))
        ) {
            if (preview) {
                resultElement.textContent = '';
                preview = false;
            }

            if (resultElement.textContent.length < 22) {
                resultElement.textContent += currentValue;
            }
        } else if (buttonElement.id == 'clear') {
            clear();
        } else if (resultElement.textContent.length) {
            if (
                equationElement.textContent.length &&
                buttonElement.id != 'del' &&
                buttonElement.id != 'clear'
            ) {
                equal();
            }

            eval(`${buttonElement.id}()`);
            if (buttonElement.id != 'del' && buttonElement.id != 'equal') {
                resultElement.textContent = '';
            }
        }
    });

    function clear() {
        equationElement.textContent = '';
        resultElement.textContent = '';
    }

    function del() {
        if (preview) {
            resultElement.textContent = '';
            preview = false;
        }

        let text = resultElement.textContent;
        resultElement.textContent = text.slice(0, text.length - 1);
    }

    function multiply() {
        equationElement.textContent += resultElement.textContent + '*';
    }

    function divide() {
        equationElement.textContent += resultElement.textContent + '÷';
    }

    function sum() {
        equationElement.textContent += resultElement.textContent + '+';
    }

    function subtract() {
        equationElement.textContent += resultElement.textContent + '-';
    }

    function equal() {
        if (equationElement.textContent.length) {
            let equation =
                equationElement.textContent + resultElement.textContent;
            while (equation.includes('÷'))
                equation = equation.replace('÷', '/');
            let result = Number(eval(equation));

            if (isNaN(result)) {
                resultElement.textContent = '0';
            } else {
                if (result % 1 != 0) {
                    resultElement.textContent = result.toFixed(2);
                } else {
                    resultElement.textContent = result;
                }
            }
            equationElement.textContent = '';
            preview = true;
        }
    }
}

'use strict';

const incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    startBtn = document.getElementById('start'),   // Это кнопка рассчитать
    cancelBtn = document.getElementById('cancel'); // Кнопка "сбросить"
let incomeItems = document.querySelectorAll('.income-items');
const depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPersent = document.querySelector('.deposit-percent');



function blockInputText() {
    const inputText = document.querySelectorAll('input[type="text"]');
    inputText.forEach(element => {
        element.disabled = true;
    });
    const buttonS = document.querySelectorAll('.btn_plus');
    buttonS.forEach(element => {
        element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}
function patternInputs () {
    let inputName = document.querySelectorAll('[placeholder="Наименование"]');
    const inputSum = document.querySelectorAll('[placeholder="Сумма"]');
    inputName.forEach(e => {
        e.addEventListener('input', () =>{
            e.value = e.value.replace(/[\^a-zA-Z/\d]/,'');
        });
    });
    inputSum.forEach(e => {
        e.addEventListener('input',()=> {
          e.value = e.value.replace(/[^0-9]/,'');
        });
      });
}
patternInputs ();
class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    check() {
        if (salaryAmount.value.trim() !== '') {
            startBtn.removeAttribute('disabled');
        }
    }

    start() {
        const _this = this;
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcPeriod();
        });
        if (salaryAmount.value === '') {
            startBtn.disabled = true;
            return;
        }
        if (Number(depositPersent.value) < 0 || Number(depositPersent.value) > 100) {
            alert('Введите корректное значение в поле проценты');
            depositPersent.value = '';
            return;
        }
        if (isNaN(depositPersent.value || depositAmount.value)) {
            alert('Введи число');
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.range();

        this.showResult();
        blockInputText();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.value = '';
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
        patternInputs ();
    }
    addExpensesBlock() {

        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
        patternInputs ();
    }
    getExpenses() {
        const _this = this;
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {
        const _this = this;
        incomeItems.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            if (item !== '') {
                item = item.trim();
                _this.addExpenses.push(item);
            }
        });
        this.addExpenses = this.addExpenses.map(
            item =>
                item.trim().charAt(0).toUpperCase() + item.trim().substr(1).toLowerCase()
        );
    }
    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPersent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    range() {
        const rangeLine = document.querySelector('.period-select').value;
        const number = document.querySelector('.period-amount');
        number.textContent = rangeLine;
    }
    reset() {  // Метод reset, задание 12
        const inputAll = document.querySelectorAll('input[type="text"');
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        inputAll.forEach(element => {
            element.disabled = false;
            element.value = '';
        });
        const buttonS = document.querySelectorAll('.btn_plus');
        buttonS.forEach(element => {
            element.disabled = false;
            element.value = '';
        });
        startBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems.forEach((element, i) => {
            if (i !== 0) {
                element.remove();
            }
        });
        expensesItems.forEach((element, i) => {
            if (i !== 0) {
                element.remove();
            }
        });
        expensesPlus.style.display = 'block';
        incomePlus.style.display = 'block';
        depositPersent.style.display = 'none';

        depositCheck.checked = false;
        this.depositHandler();
    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPersent.style.display = 'inline-block';
        } else {
            depositPersent.value = valueSelect;
            depositPersent.style.display = 'none';
        }
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPersent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPersent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.range.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '') {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        });
    }
}
const appData = new AppData();
appData.eventListeners();


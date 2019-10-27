var budgetController =(function() {

    var Expense = function(id, descrition, value) {
        this.id = id;
        this.descrition = descrition;
        this.value = value;
    };

    var Income = function(id, descrition, value) {
        this.id = id;
        this.descrition = descrition;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach((cur) => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };


    return {
        addItem: function(type, des, val) {
            var newItem;

            // ID = last ID + 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            


            //create new item
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        calculateBudget: function() {
            // caluclate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income -expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }  ;
        },

        testing: function() {
            console.log(data);
        }
    };
  
})();



var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                descrition: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },


        addListItem: function(obj, type) {

            var html, newHtml, element;

            // create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>' ;
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.descrition);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },


        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach((current, index, array) => {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        getDOMstrings: function() {
            return DOMstrings;            
        }
    };
})();



var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function() {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. return the budget
        var budget = budgetCtrl.getBudget();
        console.log(budget);

        //3. Diplay the budget on the UI


    };

    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the fiels input date
        input = UIController.getinput();

        if (input.descrition !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.descrition, input.value);
            budgetController.testing();
            //3. Add the item to UI
            UIController.addListItem(newItem, input.type);
            //4. clear fiels
            UIController.clearFields();
            //5. calculate and update budget
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();


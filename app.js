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


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        inputBtn: '.add__btn'
    }

    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                descrition: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
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


    var ctrlAddItem = function() {

        var input, newItem;

        //1. Get the fiels input date
        input = UIController.getinput();
        //2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.descrition, input.value);
        budgetController.testing();
        //3. Add the item to UI

        //4. Calcudate the budget

        //5. Diplay the budget on the UI

    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();


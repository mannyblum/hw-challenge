new Vue({
  el: '#app',
  data: {
    orders: [
      {
        name: '70001 FRZ PREM WHITE',
        date: '1/31',
        qty: '15',
        itemOrder: [
          {
            date: 'Thu 1/31',
            promo: 'A',
            past: true,
            fixedAmount: 50,
            orderAmount: 15
          },
          {
            date: 'Fri 2/1',
            promo: null,
            past: true,
            fixedAmount: 50,
            orderAmount: 40
          },
          {
            date: 'Sat 2/2',
            promo: 'A',
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
          {
            date: 'Mon 2/3',
            promo: null,
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
          {
            date: 'Tue 2/4',
            promo: null,
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
          {
            date: 'Wed 2/5',
            promo: null,
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
          {
            date: 'Thu 2/6',
            promo: null,
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
          {
            date: 'Fri 2/7',
            promo: null,
            past: false,
            fixedAmount: 50,
            orderAmount: 50
          },
        ]
      },
      {
        name: '70003 FRZ 100 RD TP',
        date: '1/31',
        qty: '100'
      },
      {
        name: '70004 FRZ CR WHT RDT',
        date: '1/31',
        qty: '100'
      },
      {
        name: '70005 FRZ WH GR RD T',
        date: '1/31',
        qty: '100'
      },
      {
        name: '70026 FRZ 45 CAL 9GR',
        date: '1/31',
        qty: '100'
      },
      {
        name: '70026 FRZ 45 CAL 9GR',
        date: '1/31',
        qty: '100'
      },
      {
        name: '70026 FRZ 45 CAL 9GR',
        date: '1/31',
        qty: '100'
      },
    ],
    singleOrder: false,
    currentOrderIndex: 0,
    currentOrderAmount: 0,
    isEditingOrder: false,
    showCalculator: false
  },
  methods: {
    selectOrder(index) {
      this.singleOrder = true;
    },
    returnToStoreOrder(){
      this.singleOrder = false;
      this.showCalculator = false;
    },
    changeOrderAmount(index) {
      this.showCalculator = !this.showCalculator;
      this.isEditingOrder = !this.isEditingOrder;

      // set timeout cause we need half a second to move the offset after the
      // keyboard pops up
      setTimeout(function() {
        window.scrollTo(0, document.getElementById('order-' + index).offsetTop);
      }, 500);

      this.currentOrderIndex = index;
      // We are always using the first order (0) since we don't have a true
      // data source and we are using mock data
      this.currentOrderAmount = this.orders[0].itemOrder[index].orderAmount;
    },
    // Ideally, this calcBut function would be part of a calculator component
    // instead of having the calculator be in the app component
    calcBtn(button) {
      // There's a lot of repetition happening, let's DRY it up
      if (button == 'sub') {
        // substract 1 from order amount
        this.currentOrderAmount -= 1;
        this.orders[0].itemOrder[this.currentOrderIndex].orderAmount -= 1;

        var index = this.currentOrderIndex;

        document.getElementById('order-input-' + index).focus();
      } else if (button == 'add') {
        // add 1 from order amount
        this.currentOrderAmount += 1;
        this.orders[0].itemOrder[this.currentOrderIndex].orderAmount += 1;

        var index = this.currentOrderIndex;

        document.getElementById('order-input-' + index).focus();
      } else if (button == 'done') {
        // change states - reset current order amount and keyboard
        this.currentOrderAmount = 0;
        this.isEditingOrder = false;
        this.showCalculator = false;
      } else if (button =='up') {
        // check if value is greater than 2
        // if greater than 2 , change index and move focus, get orderAmount
        // if less than 2, remain in place
        var index = this.currentOrderIndex;

        if (index > 2) {
          document.getElementById('order-input-' + (index - 1)).focus();
          window.scrollTo(0, document.getElementById('order-' + (index - 1)).offsetTop);

          this.currentOrderAmount = this.orders[0].itemOrder[index - 1].orderAmount;
          this.currentOrderIndex -= 1;
        } else {
          document.getElementById('order-input-' + index).focus();
        }
      } else if (button =='down') {
        var index = this.currentOrderIndex + 1;

        if (index < this.orders[0].itemOrder.length) {
          document.getElementById('order-input-' + index).focus();
          window.scrollTo(0, document.getElementById('order-' + index).offsetTop);

          this.currentOrderAmount = this.orders[0].itemOrder[index].orderAmount;
          this.currentOrderIndex += 1;
        } else {
          document.getElementById('order-input-' + (index - 1)).focus();
        }
      } else if (button == 'backspace') {
        // change the integer value into a string to remove the last digit
        // and simulate how backspace works on a keyboard. Turn it back
        // to an integer
        var tmp_str = this.currentOrderAmount.toString();
        var index = this.currentOrderIndex;

        tmp_str = parseInt(tmp_str.slice(0, -1));

        this.currentOrderAmount = tmp_str;
        this.orders[0].itemOrder[this.currentOrderIndex].orderAmount = tmp_str;

        document.getElementById('order-input-' + index).focus();
      } else if (button >= 1 || button <= 9) {
        // change the integer value into a string to concat the value of
        // the button being pressed, then change back to an integer
        var tmp_str = this.currentOrderAmount.toString();
        var index = this.currentOrderIndex;

        tmp_str = parseInt(tmp_str + button);

        this.currentOrderAmount = tmp_str;
        this.orders[0].itemOrder[this.currentOrderIndex].orderAmount = tmp_str;

        document.getElementById('order-input-' + index).focus();
      }
    }
  }
})

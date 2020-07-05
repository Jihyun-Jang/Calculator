const buttons = document.querySelectorAll('button');
const curDisplay = document.querySelector('#current-display');
const clacDisplay = document.querySelector('#calculation-display');

buttons.forEach(el => el.addEventListener('click', calculate));

let calculatingArr = [];
let result;
let isCalculating = false;


function calculate() {

   if(this.classList[0] === 'number') clickNumber(event);

   if(this.classList[0] === 'operator') clickOperator(event);

   if(this.id === 'all-clear') clickAllClear();

   if(this.id === 'clear') clickClear();

   if(this.id === 'equals') clickEquals();
   
}


function clickNumber(event) {
   if(isCalculating === false) {
      curDisplay.innerText = '';
      clacDisplay.innerText = '';
      calculatingArr = [];
      isCalculating = true;
   }

   if(event.target.id === 'decimal' && curDisplay.innerText.includes('.')) return;

   curDisplay.innerText += event.target.innerText;
}


function clickOperator(event) {
   if(isCalculating === false) {
      if(event.target.id === 'subtract') {
         if(calculatingArr.length !== 0) {
            empty();
            update(event);

         } else { // isCalculating === false && this.id === 'subtract' && calculatingArr === []
            curDisplay.innerText = event.target.innerText;
            isCalculating = true;
         }

      } else { // isCalculating === false && this.id !== 'subtract'
         if(curDisplay.innerText === '') return;
         else {
            empty();
            update(event);
         }
      }

   } else { // isCalculating === true
      if(event.target.id === 'subtract') {
         if(curDisplay.innerText === '-') return;
         else if(curDisplay.innerText === '') {
            curDisplay.innerText = event.target.innerText;
         } else update(event);         

      } else { // isCalculating === true && this.id !== 'subtract'
         if(curDisplay.innerText === '-') return;
         else if(curDisplay.innerText === '') {
            if(clacDisplay.innerText.slice(-1) === '+' || clacDisplay.innerText.slice(-1) === 'x' || clacDisplay.innerText.slice(-1) === '÷') {
               clacDisplay.innerText = clacDisplay.innerText.slice(0, clacDisplay.innerText.length-1) + event.target.innerText;
               calculatingArr.pop();
               calculatingArr.push(event.target.value);
            }
         } else update(event);         
      }
   } 
}


// delete everything
function clickAllClear() {
   curDisplay.innerText = '';
   clacDisplay.innerText = '';
   calculatingArr = [];
   isCalculating = false;
}


// delete one last digit
function clickClear() {
   if(isCalculating === false) return;
   curDisplay.innerText = curDisplay.innerText.slice(0, -1);
}


// calculate the result
function clickEquals() {
   if(isCalculating === false) return;
   if(curDisplay.innerText === ''|| curDisplay.innerText === '-') return;
   calculatingArr.push(curDisplay.innerText);
   clacDisplay.innerText += ' ' + Number(curDisplay.innerText);
   result = eval(calculatingArr.join(' '));
   curDisplay.innerText = result;      
   isCalculating = false;
}


function empty() {
   calculatingArr = [];
   clacDisplay.innerText = '';
   isCalculating = true;
}


function update(event) {
   calculatingArr.push(curDisplay.innerText);
   calculatingArr.push(event.target.value);
   clacDisplay.innerText += ' ' + Number(curDisplay.innerText) + ' ' + event.target.innerText;
   curDisplay.innerText = '';
} 
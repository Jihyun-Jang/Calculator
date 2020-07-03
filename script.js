const buttons = document.querySelectorAll('button');
const curDisplay = document.querySelector('#current-display');
const clacDisplay = document.querySelector('#calculation-display');

buttons.forEach(el => el.addEventListener('click', calculate));

let calculatingArr = [];
let result;
let isCalculating = false;


function calculate() {

   if(this.classList[0] === 'number') {
      if(isCalculating === false) {
         curDisplay.innerText = '';
         clacDisplay.innerText = '';
         calculatingArr = [];
         isCalculating = true;
      }

      if(this.id === 'decimal' && curDisplay.innerText.includes('.')) return;

      curDisplay.innerText += this.innerText;
      
   }


   if(this.classList[0] === 'operator') {
      if(curDisplay.innerText === '' && calculatingArr.length % 2 === 0 && calculatingArr.length !== 0) {
         calculatingArr.pop();
         clacDisplay.innerText = clacDisplay.innerText.slice(0, -1) + this.innerText;
         calculatingArr.push(this.value);
         return;
      } else if(curDisplay.innerText === '') return;
      else if(isCalculating === false) {
         calculatingArr = [];
         clacDisplay.innerText = '';
         isCalculating = true;       
      }
      
      calculatingArr.push(curDisplay.innerText);
      calculatingArr.push(this.value);
      clacDisplay.innerText += Number(curDisplay.innerText) + this.innerText;
      curDisplay.innerText = '';      
   }


   if(this.id === 'all-clear') {
      curDisplay.innerText = '';
      clacDisplay.innerText = '';
      calculatingArr = [];
   }


   if(this.id === 'clear') {
      if(isCalculating === false) return;
      curDisplay.innerText = curDisplay.innerText.slice(0, -1);
   }


   if(this.id === 'equals') {
      if(isCalculating === false) return;
      if(curDisplay.innerText === '') return;
      calculatingArr.push(curDisplay.innerText);
      clacDisplay.innerText += Number(curDisplay.innerText);
      result = eval(calculatingArr.join(' '));
      curDisplay.innerText = result;      
      isCalculating = false;
   }
   
}
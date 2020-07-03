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
      if(isCalculating === false) {
         if(this.id === 'subtract') {
            if(calculatingArr.length !== 0) {
               calculatingArr = [];
               clacDisplay.innerText = '';
               isCalculating = true;
               calculatingArr.push(curDisplay.innerText);
               calculatingArr.push(this.value);
               clacDisplay.innerText += ' ' + Number(curDisplay.innerText) + ' ' + this.innerText;
               curDisplay.innerText = '';
            } else { // 맨첨 시작
               curDisplay.innerText = this.innerText;
               isCalculating = true;
            }

         } else { //isCalculating === false && this.id !== 'subtract'
            if(curDisplay.innerText === '') return;
            else {
               calculatingArr = [];
               clacDisplay.innerText = '';
               isCalculating = true;
               calculatingArr.push(curDisplay.innerText);
               calculatingArr.push(this.value);
               clacDisplay.innerText += ' ' + Number(curDisplay.innerText) + ' ' + this.innerText;
               curDisplay.innerText = '';
            }
         }

      } else { // isCalculating === true
         if(this.id === 'subtract') {
            if(curDisplay.innerText === '-') return;
            else if(curDisplay.innerText === '') {
               curDisplay.innerText = this.innerText;
            } else {
               calculatingArr.push(curDisplay.innerText);
               calculatingArr.push(this.value);
               clacDisplay.innerText += ' ' + Number(curDisplay.innerText) + ' ' + this.innerText;
               curDisplay.innerText = '';
            }

         } else { // true고 && subtract 아님
            if(curDisplay.innerText === '-') return;
            else if(curDisplay.innerText === '') return;
            else {
               calculatingArr.push(curDisplay.innerText);
               calculatingArr.push(this.value);
               clacDisplay.innerText += ' ' + Number(curDisplay.innerText) + ' ' + this.innerText;
               curDisplay.innerText = '';
            }
         }
      }




      
      // if(curDisplay.innerText === '') return;
      // else if(isCalculating === false) {
      //    calculatingArr = [];
      //    clacDisplay.innerText = '';
      //    isCalculating = true;       
      // }
      
      // calculatingArr.push(curDisplay.innerText);
      // calculatingArr.push(this.value);
      // clacDisplay.innerText += Number(curDisplay.innerText) + this.innerText;
      // curDisplay.innerText = '';        
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
      if(curDisplay.innerText === '' || curDisplay.innerText === '-') return;
      calculatingArr.push(curDisplay.innerText);
      clacDisplay.innerText += ' ' + Number(curDisplay.innerText);
      result = eval(calculatingArr.join(' '));
      curDisplay.innerText = result;      
      isCalculating = false;
   }
   
}
const buttons = document.querySelectorAll('button');
const curDisplay = document.querySelector('#current-display');
const clacDisplay = document.querySelector('#calculation-display');

buttons.forEach(el => el.addEventListener('click', calculation));

let calculatingArr = [];
let result;


function calculation() {

   if(this.classList[0] === 'number') {
      curDisplay.innerText += this.innerText;
      
   }


   if(this.classList[0] === 'operator') {
      if(curDisplay.innerText === '') return
      else {
         calculatingArr.push(curDisplay.innerText);
         calculatingArr.push(this.value);
         clacDisplay.innerText += curDisplay.innerText + this.innerText;
         curDisplay.innerText = '';
         
      }
   }


   if(this.id === 'all-clear') {
      curDisplay.innerText = '';
      clacDisplay.innerText = '';
   }

   if(this.id === 'clear') {
      console.log(this.innerText);
   }

   if(this.id === 'equals') {
      calculatingArr.push(curDisplay.innerText);
      clacDisplay.innerText += curDisplay.innerText;
      result = eval(calculatingArr.join(' '));
      curDisplay.innerText = result;
      calculatingArr = [];
   }   
   
}
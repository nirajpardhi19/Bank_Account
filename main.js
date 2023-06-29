//Data
// 
const account1 = {
    owner : "Niraj Pardhi",
    movements : [200,-400,400,3000,-650,-130,70,1300],
    intrestRate : 1.2,
    pin : 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2023-04-29T23:36:17.929Z',
        '2023-05-01T10:51:36.790Z',
     ],
      currency: 'EUR',
      locale: 'en-US', // de-DE
    };

const account2 = { 
    owner : "Vaibhav Patle",
    movements : [2000,400,-600,3000,-750,-130,700,1200],
    intrestRate : 1.5,
    pin : 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
};

const account3 = {
    owner : "Rohit Bisen",
    movements : [2500,-700,600,3000,-850,-130,750,1100],
    intrestRate : 1,
    pin : 3333

   
};

const account4 = {
    owner : "Abhijeet Pardhi",
    movements : [260,-400,400,1000,-650,-130,-870,900],
    intrestRate : 1.9,
    pin : 4444

   
};

const accounts = [account1,account2,account3,account4];

//Elements Selectors

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movement');


const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////Function///////////////////////////

const formatCurrency = function(value,locale,currency){
    return new Intl.NumberFormat(locale,{
        style:"currency",
        currency:currency
    }).format(value)
}

const formatMovementDate = function (date) {
    const calcDaysPassed = ( date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);
    
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else{

        const day = `${date.getDate()}`.padStart(2,0);
        const month = `${date.getMonth() + 1}`.padStart(2,0);
        const year = date.getFullYear();

        return  `${day}/ ${month}/ ${year}`;
    }
};


const displayMovements = function (acc) {
    // console.log(containerMovements.innerHTML)
    containerMovements.innerHTML = '';

    const movs = acc.movements;

    movs.forEach(function(mov,i){
        const type = mov > 0 ? 'deposit':'withdrawl';

      
const date = new Date(acc.movementsDates[i]);




const dateLabel = formatMovementDate(date);


        const html = `
        <div class="movement__row">
                <div class="movement__type movement__type--${type}">${i+1} ${type}</div>

                <div class="movement__date">${dateLabel}</div>

                <div class="movement__value"> ${new Intl.NumberFormat(acc.locale,{
                    style:"currency",
                    currency:acc.currency
                }).format(mov)}</div>
            </div>`

            containerMovements.insertAdjacentHTML('afterbegin',html)
    })
}




const calcDisplayBalance = function(acc){
 acc.balance = acc.movements.reduce((acc,mov) => acc + mov ,0);
    

    // console.log("The final balance is :" , balance);
    labelBalance.textContent = formatCurrency(acc.balance,acc.locale,acc.currency);
    // `${acc.balance} EUR`
};




const calcDisplaySummary = function (acc){
    const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov,0);
    labelSumIn.textContent = formatCurrency(income.toFixed(2),acc.locale,acc.currency);
    // `${income} EUR`;

    const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc,mov) => acc + mov,0);
    labelSumOut.textContent = formatCurrency(Math.abs(out).toFixed(2),acc.locale,acc.currency);
    // `${Math.abs(out)} EUR`;


    const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.intrestRate)/100)
    .filter((int,i,arr)=> {
        //console.log(arr)
        return int > 1
    })
    .reduce((acc,int)=> acc + int,0);
    labelSumInterest.textContent = formatCurrency(interest.toFixed(2),acc.locale,acc.currency);
    // `${interest.toFixed(2)} EUR`

}



const createUsername = function(accs){
        accs.forEach(function(acc){
            acc.username = acc.owner
            .toLowerCase().split(' ').
            map(name => name[0]).join('')
    
        })
    }
    createUsername(accounts);


    const startLogoutTimer = function(){
        const tick = function(){
            const min = String(Math.trunc(time/60)).padStart(2,0);
            const seconds = String(time%60).padStart(2,0);

            labelTimer.textContent = `${min}:${seconds}`;
            time--

            if(time === 0){
                clearInterval(timer)
                labelWelcome.textContent = "Login to get started";
                containerApp.style.opacity = 0;
            }
        
        

        }
// Update the time On Ui aftedr every second 

        // Stop the time on UI after every second

        // decrese 1s

        //call the tmer after every 1 s.
        let time = 120;
        tick()
        const timer = setInterval(tick,1000)
    }

    const updateUI = function(acc){

    //Dispalay movements
        displayMovements(acc);
        
    //Display balance
     calcDisplayBalance(acc);

    //Display summary
    calcDisplaySummary(acc)
    };

//Event handlers 
let currentAccount;

// Fake Login for development
currentAccount = account1;
containerApp.style.opacity = 100;
updateUI(currentAccount);

const dateNow = new Date();
console.log(dateNow);
const day = `${dateNow.getDate()}`.padStart(2,0);
const month = `${dateNow.getMonth() +1 }`.padStart(2,0);
const year = dateNow.getFullYear();
const hours = `${dateNow.getHours()}`.padStart(2,0);
const minutes = `${dateNow.getMinutes()}`.padStart(2,0);

labelDate.textContent = `${day} / ${month} / ${year} , ${hours}: ${minutes}`;

btnLogin.addEventListener('click',function(e){
    e.preventDefault(); // To stop the page refresh
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    console.log(currentAccount)

    if(currentAccount.pin === Number(inputLoginPin.value))
    // console.log("Login Success")
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;


    //clear Inputs for Login Form 
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    startLogoutTimer()
    // Update UI

    updateUI(currentAccount)    
})

btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    console.log('transfer BTN Clicked');
    const amount = Number(inputTransferAmount.value);
    const recieverAccount = 
    accounts.find(acc => acc.username === inputTransferTo.value)
    //console.log(recieverAccount)

    inputTransferTo.value = inputTransferAmount.value = "";

    if(amount > 0 &&
        recieverAccount && 
        currentAccount.balance > amount && 
        recieverAccount.username !== currentAccount.username){
            
        //  Doing Transfer

            currentAccount.movements.push(-amount)
            recieverAccount.movements.push(amount)
            currentAccount.movementsDates.push(new Date().toISOString());
            recieverAccount.movementsDates.push(new Date().toISOString());
                console.log("current Ac",currentAccount);
                console.log("Reciver Acc",recieverAccount)
                
              // update UI

                updateUI(currentAccount)
        }
});

btnClose.addEventListener("click",function (e){
    e.preventDefault();
    console.log("Account Close Requested");

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
         const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
         )

    accounts.splice(index,1);
    containerApp.style.opacity = 0;
 
    labelWelcome.textContent = "Log in to get stareted"
   }

   inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click",function(e){
    e.preventDefault();
    // console.log("Loan Requested");

    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount *0.1)){

        // add movement
        setTimeout(()=>{
            currentAccount.movements.push(amount)
            currentAccount.movementsDates.push(new Date().toISOString());
   
            updateUI(currentAccount)
           
        },5000)
        }
        inputLoanAmount.value = "";
})

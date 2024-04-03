const checkboxList= document.querySelectorAll('.custom-checkbox')
const inputFields= document.querySelectorAll('.goal-input')
const progressBar= document.querySelector('.progress-container')
const progressValue= document.querySelector('.progress-value')
const errorLabel= document.querySelector('.error-message')
const progressLabel= document.querySelector('.progress-label')


const allQuotes= [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away. Keep Going',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals= JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false
    },
    second: {
        name: '',
        completed: false
    },
    third: {
        name: '',
        completed: false
    }
}


let completedGoals= Object.values(allGoals).filter((goal)=> goal.completed).length
progressValue.style.width= `${completedGoals/3*100}%`
progressValue.firstElementChild.innerText= `${completedGoals}/3 completed`
progressLabel.innerText= allQuotes[completedGoals]

checkboxList.forEach((checkbox)=>{
    checkbox.addEventListener('click', (e)=>{
        let allGoalsAdded=[...inputFields].every((input)=>{
            return input.value
        })

        if(allGoalsAdded)
        {
        checkbox.parentElement.classList.toggle('completed')
        const inputID = checkbox.nextElementSibling.id
        allGoals[inputID].completed= !allGoals[inputID].completed
        completedGoals= Object.values(allGoals).filter((goal)=> goal.completed).length
        progressLabel.innerText= allQuotes[completedGoals]
        progressValue.style.width= `${completedGoals/3*100}%`
        progressValue.firstElementChild.innerText= `${completedGoals}/3 Completed`
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }

        else{
          progressBar.classList.add('show-error')  
        }
    })
})


inputFields.forEach((input)=>{

    input.value=allGoals[input.id].name

    if(allGoals[input.id].completed)
    {
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus', ()=>{
        progressBar.classList.remove('show-error')     
    })

    input.addEventListener('input', (e)=>{
        if(allGoals[input.id].completed) {
            input.value= allGoals[input.id].name
            return
        }   
        
       allGoals[e.target.id]=
       {
        name: e.target.value,
        completed: false
       }
       localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })

})


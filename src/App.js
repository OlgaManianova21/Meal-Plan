import { useEffect, useState } from 'react';
import './App.css';
import MyList from './MyList';
import MyMealAndIngredients from './MyMealAndIngredients';
import { v4 as uuid } from 'uuid';

function App() {
  const [mealPlans, setMealPlans] = useState(
localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []);
  /*Состояние которое отвечает за то, выбран у нас день или нет */
const [selectedDay, setSelectedDay] = useState(false);

useEffect(()=> {
  localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
}, [mealPlans])

const addMeal = () => {
 const newMeal = {
  title: "Today is...",
  id: uuid(),
  mealForADay: "",
  ingredients:""
 }
 setMealPlans([newMeal, ...mealPlans])

}
const deleteDay = (mealId) => {
  setMealPlans(mealPlans.filter(({id}) => id !== mealId))
}
/* Предусматриваем возможность изменять наполнение в выбранном input */
const updateDay = (myUpdateMeal) => {
  const updatedMeals = mealPlans.map((mealPlan) => {
    if(mealPlan.id ===myUpdateMeal.id) {
      return myUpdateMeal;
    }
    return mealPlan;
  })
  setMealPlans(updatedMeals);
}
/* функция, которая позволит проверить id заметки и того дня, который выбран */
const getActiveMeal = () => {
  return mealPlans.find(({id})=> id === selectedDay)
}

  return (
    <div className='App'>
     <MyList mealPlans={mealPlans} 
     addMeal={addMeal} 
     deleteDay={deleteDay}
     selectedDay={selectedDay}
     setSelectedDay={setSelectedDay}/>
     <MyMealAndIngredients selectedDay={getActiveMeal()} updateDay={updateDay}/>
    </div>
  );
}

export default App;

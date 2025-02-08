import { createContext, useContext, useState } from 'react';

const MealContext = createContext();

export function MealProvider({ children }) {
  const [weeklyPlan, setWeeklyPlan] = useState([
    {
      day: 'Monday',
      meals: [
        { id: 1, name: 'Oatmeal with Berries', calories: 350, type: 'Breakfast' },
        { id: 2, name: 'Grilled Chicken Salad', calories: 450, type: 'Lunch' },
        { id: 3, name: 'Salmon with Vegetables', calories: 550, type: 'Dinner' }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { id: 4, name: 'Greek Yogurt with Honey', calories: 300, type: 'Breakfast' },
        { id: 5, name: 'Quinoa Bowl', calories: 400, type: 'Lunch' },
        { id: 6, name: 'Steak with Sweet Potato', calories: 600, type: 'Dinner' }
      ]
    },
    {
      day: 'Wednesday',
      meals: []
    },
    {
      day: 'Thursday',
      meals: []
    },
    {
      day: 'Friday',
      meals: []
    },
    {
      day: 'Saturday',
      meals: []
    },
    {
      day: 'Sunday',
      meals: []
    }
  ]);

  const addMeal = (dayIndex, newMeal) => {
    setWeeklyPlan(prevPlan => {
      const newPlan = [...prevPlan];
      newMeal.id = Date.now(); // Simple way to generate unique id
      newPlan[dayIndex].meals.push(newMeal);
      return newPlan;
    });
  };

  const deleteMeal = (dayIndex, mealId) => {
    setWeeklyPlan(prevPlan => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meals = newPlan[dayIndex].meals.filter(meal => meal.id !== mealId);
      return newPlan;
    });
  };

  const getDailyCalories = (day) => {
    return day.meals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  return (
    <MealContext.Provider value={{ weeklyPlan, addMeal, deleteMeal, getDailyCalories }}>
      {children}
    </MealContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealContext);
} 
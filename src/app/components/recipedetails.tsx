import { useRouter } from 'next/navigation'; // Updated import for Next.js 13
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Heading, Text } from '@nextui-org/card';

export default function RecipeDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Destructure id from query

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Check if id exists and is not undefined
    if (id) {
      fetchRecipe(id); // Fetch recipe details if id is defined
    }
  }, [id]); // Trigger effect when id changes

  const fetchRecipe = async (recipeId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      if (!response.ok) {
        throw new Error('Recipe not found');
      }
      const data = await response.json();
      const recipeData = data.meals[0]; // Assuming the first element is the recipe
      setRecipe(recipeData); // Set recipe data in state
    } catch (error) {
      console.error('Error fetching recipe:', error);
      // Handle error state or redirect to an error page

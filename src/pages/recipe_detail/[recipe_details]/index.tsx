
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
};

export default function RecipeDetail() {
  const recipe_details = usePathname(); // Extract current pathname
  const [recipe, setRecipe] = useState<Recipe | null>(null); // State to store recipe details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!recipe_details) return; // Exit early if recipe_details is null or undefined

    // Extract recipe ID from pathname
    const segments = recipe_details.split('/');
    const recipeId = segments.pop(); // Extracts the last segment, which should be the recipe ID

    if (!recipeId) {
      setError('Recipe ID not found in URL');
      setLoading(false);
      return;
    }

    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dpwwvo4rd5yu5.cloudfront.net/api/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          const fetchedRecipe: Recipe = {
            idMeal: data.meals[0].idMeal,
            strMeal: data.meals[0].strMeal,
            strInstructions: data.meals[0].strInstructions,
          };
          setRecipe(fetchedRecipe);
        } else {
          throw new Error('Recipe not found');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipe_details]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
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
        const response = await fetch(`https://dpwwvo4rd5yu5.cloudfront.net/api/recipes/${recipeId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        console.log('Received data:', data); // Logging API response

        // Directly using the response object
        if (data) {
          const fetchedRecipe: Recipe = {
            idMeal: data.idMeal,
            strMeal: data.strMeal,
            strInstructions: data.strInstructions,
            strMealThumb: data.strMealThumb,
            strYoutube: data.strYoutube,
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
    <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
    <img
      src={recipe.strMealThumb}
      alt={recipe.strMeal}
      className="w-8/12 max-w-base mb-4 rounded-lg shadow-md"
    />
    <p className="text-lg mb-4 text-center">{recipe.strInstructions}</p>
    <a
      href={recipe.strYoutube}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      Watch on YouTube
    </a>
  </div>
  );
}

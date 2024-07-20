'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, CSSProperties } from 'react';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
};

export default function RecipeDetail() {
  const recipe_details = usePathname();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipe_details) return;

    const segments = recipe_details.split('/');
    const recipeId = segments.pop();

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

  // Inline styles with CSSProperties type
  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    
  };

  const cardStyle: CSSProperties = {
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    margin: '10px',
    maxWidth: '600px',

  };

  const imageStyle: CSSProperties = {
    width: '66.67%', // w-8/12
    maxWidth: '400px', // Adjusted value for max-width
    marginBottom: '16px', // mb-4
    borderRadius: '8px', // rounded-lg
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // shadow-md
  };

  const headingStyle: CSSProperties = {
    fontSize: '1.875rem', // text-3xl
    fontWeight: 'bold',
    marginBottom: '16px' // mb-4
  };

  const textStyle: CSSProperties = {
    fontSize: '1.125rem', // text-lg
    marginBottom: '16px', // mb-4
    textAlign: 'center' as CSSProperties['textAlign']
  };

  const linkStyle: CSSProperties = {
    color: '#3b82f6', // text-blue-500
    textDecoration: 'underline'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={imageStyle}
          />
        </div>
        <h1 style={headingStyle}>{recipe.strMeal}</h1>
        <p style={textStyle}>{recipe.strInstructions}</p>
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}

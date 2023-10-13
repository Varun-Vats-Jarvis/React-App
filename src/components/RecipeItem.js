import React from 'react'

const RecipeItem = (props) => {
    let { title, description, imageUrl, newsUrl } = props;
    return (
        <div className="my-3">
            <div className="card">
                <img src={!imageUrl?"https://spoonacular.com/recipeImages/648279-312x231.jpg":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} className="btn btn-small btn-primary">Recipe Revealed: Steps & Ingredients</a>
                </div>
            </div>
        </div>
    )
}
export default RecipeItem

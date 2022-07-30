import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetAllSnacks } from "../../store/snacks";
import CategoriesPage from "../Categories";
import { thunkGetCart } from "../../store/cart";
import "./allSnacks.css"


const AllSnacks = () => {
    const allSnacks = useSelector(state => Object.values(state.allSnacks));

    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id)

    const snacks = allSnacks.reverse()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
        if (userId) {
            dispatch(thunkGetCart(userId))
        }
    }, [dispatch]);

    if (!snacks) return null
    // if (!userId) return null

    return (
        <>
            <div id='background-color'>
                <p className="home-page-title">Discover tasty snacks from sellers nationwide</p>
            </div>
            <div className="categories-container" >
                <ul className="categories">
                    <li className="category-list">
                        <Link to="/categories/Chips" className="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/631e55/3928665791/il_340x270.3928665791_d0b5.jpg" />
                            <p id='category-bttn-name'>Chips</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Candy" className="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/90f371/3963233212/il_794xN.3963233212_ib58.jpg" />
                            <p id='category-bttn-name'>Candy</p>
                        </Link>
                    </li>
                    <li className="category-list" >
                        <Link to="/categories/Baked Goods" className="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/2062b1/3532352007/il_1140xN.3532352007_4a7r.jpg" />
                            <p id='category-bttn-name'>Baked Goods</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Protein" className="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/aa3aa6/3963194926/il_794xN.3963194926_2a0t.jpg" />
                            <p id='category-bttn-name'>Protein</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Beverage" className="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/6007c8/3808870767/il_1140xN.3808870767_29ot.jpg" />
                            <p id='category-bttn-name'>Beverages</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="snacksy-bio">
                <p className="why-snacksy">Why Snacksy?</p>
                <div className="bio-content">
                    <div className="bio-section">
                        <p className="bio-header">A community snacking good</p>
                        <p className="bio-text">
                            Snacksy is a nationwide online marketplace, where snackers are able to make, sell and buy any snack to their desire. Snacksy is an awesome resource because it allows our users to fulfill snack wants and desires while making a positive push for small independent snack sellers.

                        </p>
                    </div>
                    <div className="bio-section">
                        <p className="bio-header">Support independent snackers</p>
                        <p className="bio-text">
                            As of now... there is no Snacksy warehouse - just thousands of people selling the snacks that they love. If you haven't already, sign up now to join the movement on supporting your local snack sellers.
                        </p>
                    </div>
                </div>
            </div>
            <div className="snacks-home-container">
            <h3 id="snackcard-header">Recently added snacks </h3>
                <div className="container">
                {snacks && snacks.map(snack => (
                    <div key={snack.id} className='snack-card'>
                        <Link className="home-page-snack-card"to={`/snacks/${snack.id}`}>
                            <img id="snack-image"src={snack.cover_pic} alt="snackImg"></img>
                            {/* <p id='snack-title'>{snack.title}</p> */}
                            <div className="snack-card-price">
                                <p id='snack-price'><i className="fa-solid fa-truck-fast"></i>  $ {snack.price.toFixed(2)}</p>
                            </div>

                        </Link>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}


export default AllSnacks;

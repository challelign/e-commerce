import React, {useEffect,useState, Fragment} from "react";
import MetaData from "./layout/MetaData";
import {useDispatch, useSelector} from "react-redux";

import Loader from "../components/layout/Loader"

import Product from "./product/product";
import {getProducts} from "../actions/productActions";
import  {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
const Home = () => {
    // src={product.image[0].url}

    const [currentPage,setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, products, error, productsCount, resPerPage} = useSelector(state => state.products)
    useEffect(() => {
        if(error){
            return alert.error(error)
        }

        dispatch(getProducts(currentPage))

    }, [dispatch,alert, error, currentPage])


    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>

            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'}></MetaData>

                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">

                            {products && products.map(product => (
                                <Product key={product._id} product={product}/>
                            ))}
                        </div>
                    </section>
                    {resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )}
        </Fragment>
    );
}

export default Home



























































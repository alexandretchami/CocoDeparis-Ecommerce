import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios for API calls

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [product_list, setProductList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            if (quantity > 0) {
                const itemInfo = product_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    total += itemInfo.price * quantity;
                }
            }
            return total;
        }, 0);
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            setProductList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch product list:", error);
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers: {token}});
        setCartItems(response.data.cartData);
    }

    // Consolidated useEffect for initial data loading
    useEffect(() => {
        async function loadData() {
            try {
                await fetchProductList();
                const savedToken = localStorage.getItem("token");
                if (savedToken) {
                    setToken(savedToken);
                    await loadCartData(localStorage.getItem("token"));
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        }
        loadData();
    }, []);


    const contextValue = {
        product_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        fetchProductList,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

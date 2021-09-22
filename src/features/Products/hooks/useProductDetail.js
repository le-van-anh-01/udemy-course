import productApi from "api/productApi";
import { useEffect, useState } from "react";


const useProductDetail = (productId) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    const getProduct = async (productId) => {
        try {
            setLoading(true);
            const result = await productApi.get(productId);
            setProduct(result);

        } catch (error) {
            console.log("Failed to fetch product", error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getProduct(productId);
        return;
    }, [productId])

    return { product, loading };
}

export default useProductDetail;
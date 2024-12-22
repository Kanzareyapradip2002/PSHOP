import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.CategoryWiseProduct.url, {
            method: SummaryApi.CategoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;

    } catch (error) {
        console.error("Error fetching category-wise products:", error);
        throw error; 
    }
};

export default fetchCategoryWiseProduct

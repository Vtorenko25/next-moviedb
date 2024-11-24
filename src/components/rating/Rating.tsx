export const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars

    return (
        <>
            {"★".repeat(fullStars)}
    {"☆".repeat(emptyStars)}
    </>
);
};
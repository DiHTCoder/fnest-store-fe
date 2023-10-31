export const formatPrice = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
};

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
};

export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;
        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        );
    });
};

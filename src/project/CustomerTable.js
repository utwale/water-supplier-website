import React, { useState, useEffect } from 'react';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState({});

    const generateFormattedDates = () => {
        const days = ['Today', 'Yesterday'];
        const dateOptions = { month: 'short', day: 'numeric' };

        for (let i = 2; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(new Intl.DateTimeFormat('en-US', dateOptions).format(date));
        }

        return days;
    };

    const dates = generateFormattedDates();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getCustomerInfo');
                const data = await response.json();
                setCustomers(data);
                data.forEach(customer => {
                    fetchDeliveryInfo(customer.id);
                });
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        const fetchDeliveryInfo = async (customerId) => {
            try {
                const response = await fetch(`https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getDeliveryInfo/${customerId}`);
                const data = await response.json();
                setDeliveryInfo(prev => ({
                    ...prev,
                    [customerId]: organizeDeliveryData(data)
                }));
            } catch (error) {
                console.error(`Error fetching delivery info for customer ${customerId}:`, error);
            }
        };

        const generateDates = () => {
            return Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toISOString().split('T')[0];
            });
        };

        const organizeDeliveryData = (deliveries) => {
            const deliveriesByDay = {};
            const reverseDays = [...generateDates()].reverse(); // Get dates in ISO format for filtering

            reverseDays.forEach((day, index) => {
                deliveriesByDay[dates[index]] = deliveries.filter(delivery => {
                    const deliveryDate = new Date(delivery.date * 1000).toISOString().split('T')[0];
                    return deliveryDate === day;
                }).reduce((acc, curr) => acc + parseInt(curr.quantity, 10), 0);
            });

            return deliveriesByDay;
        };

        fetchCustomers();
    }, [dates]);

    const renderDeliveryStatus = (customerId) => {
        return dates.map((date, index) => {
            const quantity = deliveryInfo[customerId]?.[date] || 0;
            return (
                <td
                    key={index}
                    title={`Customer ID: ${customerId} \nDelivery Quantity: ${quantity}`}
                >
                    {quantity > 0 ? '✅' : '❌'}
                </td>
            );
        });
    };

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Customer</th>
                    {dates.map((date, index) => (
                        <th key={index}>{date}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.customerName}</td>
                        {renderDeliveryStatus(customer.id)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;


// return dates.map((date, index) => {
        //     const quantity = deliveryInfo[customerId]?.[date] || 0;
        //     return <td key={index}>{quantity}</td>;
        // });
        

// // Helper function to generate ISO format dates for data filtering
// function generateDates() {
//     return Array.from({ length: 7 }, (_, i) => {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         return date.toISOString().split('T')[0];
//     });
// }     
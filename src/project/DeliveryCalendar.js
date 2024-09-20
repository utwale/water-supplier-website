import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase (make sure to add your Firebase config here)
const firebaseConfig = {
  // Your Firebase config here
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const localizer = momentLocalizer(moment);

const DeliveryCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const customersSnapshot = await db.collection('customers').get();
        let deliveries = [];

        for (const customerDoc of customersSnapshot.docs) {
          const customerId = customerDoc.id;
          const deliveriesSnapshot = await db
            .collection('customers')
            .doc(customerId)
            .collection('deliveries')
            .get();

          deliveriesSnapshot.forEach((doc) => {
            const delivery = doc.data();
            const deliveryDate = delivery.date.toDate(); // Convert Firestore Timestamp to Date

            deliveries.push({
              title: `${delivery.customerName} - ${delivery.quantity} liters`,
              start: deliveryDate,
              end: deliveryDate,
              allDay: true,
            });
          });
        }

        setEvents(deliveries);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default DeliveryCalendar;
